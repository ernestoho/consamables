package consamables.jdbi;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import consamables.auth.AccessToken;
import consamables.jdbi.binders.BindAccessToken;
import consamables.jdbi.mappers.AccessTokenMapper;

@RegisterMapper(AccessTokenMapper.class)
public interface AccessTokenDAO {
    @SqlQuery("INSERT INTO access_token (access_token_id, user_id) " +
               "VALUES (CAST(:accessTokenId AS uuid), :userId) " +
               "RETURNING *")
    AccessToken addAccessToken(@BindAccessToken AccessToken accessToken);

    @SqlQuery("SELECT * FROM access_token WHERE access_token_id = CAST(:accessTokenId AS uuid)")
    AccessToken findById(@Bind("accessTokenId") String accessTokenId);

    @SqlUpdate("UPDATE access_token SET (last_access_time) = (now()) " +
               "WHERE access_token_id = CAST(:accessTokenId AS uuid)")
    void updateLastAccessTime(@Bind("accessTokenId") String accessTokenId);
}
