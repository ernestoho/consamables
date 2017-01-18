package consamables.payment;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SplitwiseVerifier {

    @NotNull
    @JsonProperty
    private String requestToken;

    @NotNull
    @JsonProperty
    private String verifier;

    @NotNull
    @JsonProperty
    private long userId;

    public SplitwiseVerifier() { }

    public String getRequestToken() {
        return requestToken;
    }

    public void setRequestToken(String requestToken) {
        this.requestToken = requestToken;
    }

    public String getVerifier() {
        return verifier;
    }

    public void setVerifier(String verifier) {
        this.verifier = verifier;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
