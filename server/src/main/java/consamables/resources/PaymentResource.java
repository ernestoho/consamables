package consamables.resources;

import java.io.IOException;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth10aService;

import consamables.api.SplitwiseVerifier;
import consamables.api.User;
import consamables.auth.SplitwiseApi;
import consamables.jdbi.SplitwiseDAO;
import io.dropwizard.auth.Auth;

@Path("/payment")
@Produces(MediaType.APPLICATION_JSON)
public class PaymentResource {
    private static final String GET_USER = "https://secure.splitwise.com/api/v3.0/get_current_user";

    private OAuth10aService service;
    private SplitwiseDAO dao;
    private ObjectMapper objectMapper;

    public PaymentResource(String consumerKey, String consumerSecret, SplitwiseDAO dao) {
        this.service = new ServiceBuilder()
                .apiKey(consumerKey)
                .apiSecret(consumerSecret)
                .build(SplitwiseApi.instance());
        this.dao = dao;
        this.objectMapper = new ObjectMapper();
    }

    @Path("/authorize-url")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getAuthorizationUrl(@Auth User user) throws IOException {
        final OAuth1RequestToken requestToken = service.getRequestToken();
        dao.setRequestTokenSecret(requestToken.getTokenSecret(), user.getUserId());
        return service.getAuthorizationUrl(requestToken);
    }
    
    @Path("/authenticate-user")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticateSplitwiseUser(@Auth User user, @Valid SplitwiseVerifier verifier) throws IOException {
        if (!user.getUserId().equals(verifier.getUserId())) {
            throw new NotAuthorizedException("You don't have permission to do this.", Response.status(401).build());
        }
        final OAuth1AccessToken accessToken = service.getAccessToken(
                new OAuth1RequestToken(verifier.getRequestToken(), dao.getRequestTokenSecret(verifier.getUserId())),
                verifier.getVerifier());
        dao.updateToken(accessToken, verifier.getUserId());

        final OAuthRequest request = new OAuthRequest(Verb.GET, GET_USER, service);
        service.signRequest(accessToken, request);
        final com.github.scribejava.core.model.Response response = request.send();
        JsonNode userData = objectMapper.readTree(response.getBody());
        Long splitwiseUserId = userData.get("user").get("id").asLong();
        dao.setSplitwiseUserId(splitwiseUserId, verifier.getUserId());

        return Response.ok().build();
    }
}
