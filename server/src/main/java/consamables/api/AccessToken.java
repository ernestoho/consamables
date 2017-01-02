package consamables.api;

import java.sql.Timestamp;
import java.util.UUID;

public class AccessToken {
    private UUID accessTokenId;
    private Long userId;
    private Timestamp lastAccessTime;

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
