package consamables.api;

import java.sql.Timestamp;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AccessToken {

    @JsonProperty
    private UUID accessTokenId;

    @JsonProperty
    private Long userId;

    @JsonProperty
    private Timestamp lastAccessTime;

    public AccessToken(UUID accessTokenId, Long userId) {
        this.accessTokenId = accessTokenId;
        this.userId = userId;
    }

    public AccessToken(UUID accessTokenId, Long userId, Timestamp lastAccessTime) {
        this.accessTokenId = accessTokenId;
        this.userId = userId;
        this.lastAccessTime = lastAccessTime;
    }

    public UUID getAccessTokenId() {
        return accessTokenId;
    }

    public Long getUserId() {
        return userId;
    }

    public Timestamp getLastAccessTime() {
        return lastAccessTime;
    }
}
