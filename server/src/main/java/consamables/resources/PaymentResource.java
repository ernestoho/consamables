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

import consamables.api.User;
import consamables.payment.PaymentManager;
import consamables.payment.SplitwiseVerifier;
import io.dropwizard.auth.Auth;

@Path("/payment")
@Produces(MediaType.APPLICATION_JSON)
public class PaymentResource {
    private PaymentManager paymentManager;

    public PaymentResource(PaymentManager paymentManager) {
        this.paymentManager = paymentManager;
    }

    @Path("/authorize-url")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getAuthorizationUrl(@Auth User user) throws IOException {
        return paymentManager.getAuthUrl(user.getUserId());
    }
    
    @Path("/authenticate-user")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authenticateSplitwiseUser(@Auth User user, @Valid SplitwiseVerifier verifier) throws IOException {
        if (!user.getUserId().equals(verifier.getUserId())) {
            throw new NotAuthorizedException("You don't have permission to do this.", Response.status(401).build());
        }
        paymentManager.authenticateUser(verifier);

        return Response.ok().build();
    }
}
