package consamables.resources;

import java.util.regex.Pattern;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import consamables.api.User;
import consamables.auth.AccessToken;
import consamables.auth.LoginCredentials;
import consamables.auth.LoginManager;
import consamables.jdbi.AccessTokenDAO;
import consamables.jdbi.UserDAO;
import io.dropwizard.auth.Auth;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    private LoginManager loginManager;
    private UserDAO dao;

    public UserResource(UserDAO userDAO, AccessTokenDAO accessTokenDAO) {
        this.loginManager = new LoginManager(userDAO, accessTokenDAO);
        this.dao = userDAO;
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
        if (!Pattern.matches("^[\\w-\\.]+@([a-zA-Z_]+?\\.)+[a-zA-Z]{2,3}$", credentials.getUsername())) {
            throw new WebApplicationException("Invalid username.", Response.status(400).build());
        }
        AccessToken token = loginManager.registerNewUser(credentials);
        if (token == null) {
            throw new WebApplicationException("That username is already taken.", Response.status(409).build());
        } else {
            return token;
        }
    }

    @Path("/get-info")
    @GET
    public User getInfo(@Auth User user) {
        return user;
    }

    @PermitAll
    @Path("/{id}/name")
    @GET
    public User getName(@PathParam("id") String id) {
        return dao.getUser(Long.parseLong(id));
    }
}
