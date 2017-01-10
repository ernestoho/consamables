package consamables.api;

import java.security.Principal;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User implements Principal {
    @JsonProperty
    private Long userId;

    @NotNull
    @JsonProperty
    private String email;

    @NotNull
    @JsonProperty
    private boolean splitwiseAuthenticated;

    public User() { }

    public User(Long userId, String email, boolean splitwiseAuthenticated) {
        this.userId = userId;
        this.email = email;
        this.splitwiseAuthenticated = splitwiseAuthenticated;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isSplitwiseAuthenticated() {
        return splitwiseAuthenticated;
    }

    public void setSplitwiseAuthenticated(boolean splitwiseAuthenticated) {
        this.splitwiseAuthenticated = splitwiseAuthenticated;
    }

    @JsonIgnore
    @Override
    public String getName() {
        return email;
    }
}
