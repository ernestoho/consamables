package consamables.resources;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import consamables.api.AccessToken;
import consamables.api.LoginCredentials;
import consamables.auth.LoginManager;
import consamables.jdbi.AccessTokenDAO;
import consamables.jdbi.UserDAO;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    private LoginManager loginManager;

    public UserResource(UserDAO userDAO, AccessTokenDAO accessTokenDAO) {
        this.loginManager = new LoginManager(userDAO, accessTokenDAO);
    }

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public AccessToken login(@Valid LoginCredentials credentials) {
        AccessToken token = loginManager.verifyCredentials(credentials);
        if (token == null) {
            throw new NotAuthorizedException("Wrong username or password.", Response.status(401).build());
        } else {
            return token;
        }
    }

    @Path("/new")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public AccessToken createUser(@Valid LoginCredentials credentials) {
        AccessToken token = loginManager.registerNewUser(credentials);
        if (token == null) {
            throw new WebApplicationException("That username is already taken.", Response.status(409).build());
        } else {
            return token;
        }
    }
}
