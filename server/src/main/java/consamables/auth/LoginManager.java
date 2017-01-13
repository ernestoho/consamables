package consamables.auth;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;
import java.util.Random;
import java.util.UUID;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import consamables.api.User;
import consamables.jdbi.AccessTokenDAO;
import consamables.jdbi.UserDAO;

public class LoginManager {
    private static final int NUM_ITERATIONS = 2;
    private static final int KEY_LENGTH = 128;

    private UserDAO userDAO;
    private AccessTokenDAO accessTokenDAO;

    public LoginManager(UserDAO userDAO, AccessTokenDAO accessTokenDAO) {
        this.userDAO = userDAO;
        this.accessTokenDAO = accessTokenDAO;
    }

    public AccessToken verifyCredentials(LoginCredentials credentials) {
        String username = credentials.getUsername().toLowerCase();
        String password = credentials.getPassword();

        if (checkPassword(username, password)) {
            AccessToken token = generateNewAccessToken(userDAO.getUser(username));
            boolean splitwiseAuthenticated = userDAO.isSplitwiseAuthenticated(token.getUserId());
            return token.setUsername(username).setSplitwiseAuthenticated(splitwiseAuthenticated);
        } else {
            return null;
        }
    }

    public AccessToken registerNewUser(LoginCredentials credentials) {
        final String username = credentials.getUsername().toLowerCase();
        if (userDAO.doesUserExist(username)) {
            return null;
        }
        final String password = credentials.getPassword();
        final Random r = new SecureRandom();
        final byte[] salt = new byte[32];
        r.nextBytes(salt);
        final byte[] passwordHash = hashPassword(password.toCharArray(), salt, NUM_ITERATIONS, KEY_LENGTH);
        User newUser = userDAO.addUser(username, passwordHash, salt);
        AccessToken token = generateNewAccessToken(newUser);
        return token.setUsername(username).setSplitwiseAuthenticated(false);
    }
    
    private AccessToken generateNewAccessToken(User user) {
        AccessToken newToken = new AccessToken(UUID.randomUUID(), user.getUserId());
        return accessTokenDAO.addAccessToken(newToken);
    }

    private boolean checkPassword(String username, String password) {
        if (!userDAO.doesUserExist(username)) {
            return false;
        }
        byte[] salt = userDAO.getPasswordSalt(username);
        final byte[] passwordHash = hashPassword(password.toCharArray(), salt, NUM_ITERATIONS, KEY_LENGTH);
        return Arrays.equals(passwordHash, userDAO.getPasswordHash(username));
    }

    private static byte[] hashPassword(final char[] password, final byte[] salt,
                                       final int iterations, final int keyLength) {
        try {
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
            PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, keyLength);
            SecretKey key = skf.generateSecret(spec);
            byte[] result = key.getEncoded();
            return result;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
    }
}
