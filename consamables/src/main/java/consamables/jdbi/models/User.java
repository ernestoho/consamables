package consamables.jdbi.models;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User
{
    @NotNull
    @JsonProperty
    private Integer userId;
    
    @NotNull
    @JsonProperty
    private String email;
    
    @NotNull
    @JsonProperty
    private String passwordHash;
    
    @NotNull
    @JsonProperty
    private String passwordSalt;
    
    public User() { }
    
    public User(Integer userId, String email, String passwordHash, String passwordSalt)
    {
        this.userId = userId;
        this.email = email;
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getPasswordSalt() {
        return passwordSalt;
    }

    public void setPasswordSalt(String passwordSalt) {
        this.passwordSalt = passwordSalt;
    }
}
