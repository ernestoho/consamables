package consamables.api;

import java.security.Principal;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User implements Principal {
    @JsonProperty
    private Long userId;
    
    @NotNull
    @JsonProperty
    private String email;
    
    public User() { }
    
    public User(Long userId, String email) {
        this.userId = userId;
        this.email = email;
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

    @Override
    public String getName() {
        return email;
    }
}
