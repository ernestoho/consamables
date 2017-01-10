package consamables.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.Client;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.client.oauth1.ConsumerCredentials;
import org.glassfish.jersey.client.oauth1.OAuth1AuthorizationFlow;
import org.glassfish.jersey.client.oauth1.OAuth1ClientSupport;

@Path("/payment")
@Produces(MediaType.APPLICATION_JSON)
public class PaymentResource {
    private Client client;
    private ConsumerCredentials consumerCredentials;

    public PaymentResource(Client client, String consumerKey, String consumerSecret) {
        this.client = client;
        this.consumerCredentials = new ConsumerCredentials(consumerKey, consumerSecret);
    }
    
    @Path("/authorize-url")
    @GET
    public String getAuthorizationUrl() {
        OAuth1AuthorizationFlow authFlow = OAuth1ClientSupport.builder(consumerCredentials)
                .authorizationFlow(
                        "https://secure.splitwise.com/api/v3.0/get_request_token",
                        "https://secure.splitwise.com/api/v3.0/get_access_token",
                        "https://secure.splitwise.com/authorize")
                .build();
        return authFlow.start();
    }
}
