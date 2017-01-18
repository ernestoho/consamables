package consamables.payment;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth1AccessToken;
import com.github.scribejava.core.model.OAuth1RequestToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth10aService;

import consamables.api.OrderItem;
import consamables.jdbi.ItemDAO;
import consamables.jdbi.SplitwiseTokenDAO;
import consamables.jdbi.SplitwiseUserDAO;

public class PaymentManager {
    private static final String BASE_URL = "https://secure.splitwise.com/api/v3.0/";
    private static final String GET_USER = BASE_URL + "get_current_user";
    private static final String ADD_USER = BASE_URL + "add_user_to_group";
    private static final String CREATE_EXPENSE = BASE_URL + "create_expense";

    private OAuth10aService service;
    private long splitwiseGroupId;
    private BigDecimal localMealTax;
    private SplitwiseTokenDAO tokenDAO;
    private SplitwiseUserDAO userDAO;
    private ItemDAO itemDAO;
    private ObjectMapper objectMapper;

    public PaymentManager(String consumerKey, String consumerSecret,
                           long splitwiseGroupId, BigDecimal localMealTax,
                           SplitwiseTokenDAO tokenDAO, SplitwiseUserDAO userDAO,
                           ItemDAO itemDAO) {
        this.service = new ServiceBuilder()
                .apiKey(consumerKey)
                .apiSecret(consumerSecret)
                .build(SplitwiseApi.instance());
        this.splitwiseGroupId = splitwiseGroupId;
        this.localMealTax = localMealTax;
        this.tokenDAO = tokenDAO;
        this.userDAO = userDAO;
        this.itemDAO = itemDAO;
        this.objectMapper = new ObjectMapper();
    }

    public String getAuthUrl(long userId) throws IOException {
        final OAuth1RequestToken requestToken = service.getRequestToken();
        tokenDAO.setRequestTokenSecret(requestToken.getTokenSecret(), userId);
        return service.getAuthorizationUrl(requestToken);
    }

    public void authenticateUser(SplitwiseVerifier verifier) throws IOException {
        final OAuth1AccessToken accessToken = service.getAccessToken(
                new OAuth1RequestToken(verifier.getRequestToken(), tokenDAO.getRequestTokenSecret(verifier.getUserId())),
                verifier.getVerifier());
        tokenDAO.updateToken(accessToken, verifier.getUserId());

        SplitwiseUser splitwiseUser = getSplitwiseUserInfo(verifier.getUserId());
        userDAO.updateUserInfo(splitwiseUser, verifier.getUserId());
        addUserToGroup(verifier.getUserId(), splitwiseGroupId);
    }

    public SplitwiseUser getSplitwiseUserInfo(long userId) throws JsonProcessingException, IOException {
        final OAuth1AccessToken accessToken = tokenDAO.getToken(userId);
        final OAuthRequest request = createGetRequest(GET_USER, accessToken);
        final Response response = request.send();

        JsonNode userData = objectMapper.readTree(response.getBody()).get("user");
        return objectMapper.treeToValue(userData, SplitwiseUser.class);
    }

    public void addUserToGroup(long userId, long groupId) throws JsonProcessingException, IOException {
        Long permittedUserId = userDAO.getUserIdInGroup(groupId);
        if (permittedUserId == null) {
            // If no one's in the group in the database, this must be the first person.
            permittedUserId = userId;
        }
        final OAuth1AccessToken accessToken = tokenDAO.getToken(permittedUserId);
        final SplitwiseUser user = userDAO.getUserInfo(userId);
        final AddUserBody body = new AddUserBody(user, groupId);
        final OAuthRequest request = createPostRequest(ADD_USER, body, accessToken);
        Response response = request.send();
        if (response.isSuccessful()) {
            userDAO.setGroupForUser(groupId, userId);
        }
    }

    public void createCharge(long payerId, long payeeId, BigDecimal amount, String description) throws JsonProcessingException {
        long splitwisePayerId = userDAO.getSplitwiseUserId(payerId);
        long splitwisePayeeId = userDAO.getSplitwiseUserId(payeeId);
        final OAuth1AccessToken accessToken = tokenDAO.getToken(payerId);
        final CreateChargeBody body = new CreateChargeBody(
                splitwisePayerId, splitwisePayeeId, splitwiseGroupId,
                amount, description);
        final OAuthRequest request = createPostRequest(CREATE_EXPENSE, body, accessToken);
        request.send();
    }

    public BigDecimal calculateOrderCost(List<OrderItem> orderItems, BigDecimal overhead) {
        BigDecimal total = new BigDecimal("0");
        for (OrderItem orderItem : orderItems) {
            BigDecimal price = itemDAO.getItemPrice(orderItem.getItemId());
            total = total.add(price.multiply(new BigDecimal(orderItem.getQuantity())));
        }
        BigDecimal newTotal = total.multiply(localMealTax.add(BigDecimal.ONE))
                .multiply(overhead.add(BigDecimal.ONE));
        BigDecimal roundedTotal = newTotal.multiply(new BigDecimal("2"))
                .setScale(0, RoundingMode.CEILING)
                .multiply(new BigDecimal("0.5"));
        return roundedTotal;
    }

    private OAuthRequest createGetRequest(String url, OAuth1AccessToken accessToken) {
        final OAuthRequest request = new OAuthRequest(Verb.GET, url, service);
        service.signRequest(accessToken, request);
        return request;
    }

    private OAuthRequest createPostRequest(String url, Object body, OAuth1AccessToken accessToken) throws JsonProcessingException {
        final OAuthRequest request = new OAuthRequest(Verb.POST, url, service);
        request.addHeader("Content-Type", "application/json;charset=UTF-8");
        request.addPayload(objectMapper.writeValueAsString(body));
        service.signRequest(accessToken, request);
        return request;
    }
}
