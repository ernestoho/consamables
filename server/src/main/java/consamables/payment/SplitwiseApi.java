package consamables.payment;

import com.github.scribejava.core.builder.api.DefaultApi10a;
import com.github.scribejava.core.model.OAuth1RequestToken;

public class SplitwiseApi extends DefaultApi10a {
    private static final String AUTHORIZE_URL = "https://secure.splitwise.com/authorize?oauth_token=%s";
    
    protected SplitwiseApi() { }
    
    private static class InstanceHolder {
        private static final SplitwiseApi INSTANCE = new SplitwiseApi();
    }
    
    public static SplitwiseApi instance() {
        return InstanceHolder.INSTANCE;
    }
    
    @Override
    public String getRequestTokenEndpoint() {
        return "https://secure.splitwise.com/api/v3.0/get_request_token";
    }
    
    @Override
    public String getAccessTokenEndpoint() {
        return "https://secure.splitwise.com/api/v3.0/get_access_token";
    }
    
    @Override
    public String getAuthorizationUrl(OAuth1RequestToken requestToken) {
        return String.format(AUTHORIZE_URL, requestToken.getToken());
    }
}
