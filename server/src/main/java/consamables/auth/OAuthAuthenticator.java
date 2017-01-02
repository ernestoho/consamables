package consamables.auth;

import java.util.Optional;
import java.util.UUID;

import org.joda.time.DateTime;
import org.joda.time.Period;

import consamables.api.AccessToken;
import consamables.api.User;
import consamables.jdbi.AccessTokenDAO;
import consamables.jdbi.UserDAO;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;

public class OAuthAuthenticator implements Authenticator<String, User> {
    public static final int ACCESS_TOKEN_EXPIRE_TIME_MIN = 60;
    private AccessTokenDAO accessTokenDAO;
    private UserDAO userDAO;
    
    public OAuthAuthenticator(AccessTokenDAO accessTokenDAO, UserDAO userDAO) {
        this.accessTokenDAO = accessTokenDAO;
        this.userDAO = userDAO;
    }

    @SuppressWarnings("unused")
    @Override
    public Optional<User> authenticate(String accessTokenId) throws AuthenticationException {
        try {
            UUID accessTokenUUID = UUID.fromString(accessTokenId);
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }

        AccessToken accessToken = accessTokenDAO.findById(accessTokenId);
        if (accessToken == null) {
            return Optional.empty();
        }

        Period period = new Period(new DateTime(accessToken.getLastAccessTime()), new DateTime());
        if (period.getMinutes() > ACCESS_TOKEN_EXPIRE_TIME_MIN) {
            return Optional.empty();
        }

        accessTokenDAO.updateLastAccessTime(accessTokenId);
        return Optional.of(userDAO.getUser(accessToken.getUserId()));
    }

    private boolean verifyCredentials(BasicCredentials credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();

        return hashPassword(username, password) == getPasswordHash(username);
    }

    private String hashPassword(String username, String password) {
        return password;
    }

    private String getPasswordHash(String username) {
        return userDAO.getPasswordHash(username);
    }
}
