package consamables.jdbi;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import com.github.scribejava.core.model.OAuth1AccessToken;

import consamables.jdbi.mappers.SplitwiseTokenMapper;

@RegisterMapper(SplitwiseTokenMapper.class)
public interface SplitwiseTokenDAO {
    @SqlQuery("SELECT splitwise_request_token_secret FROM \"user\" " +
              "WHERE user_id = :userId")
    String getRequestTokenSecret(@Bind("userId") long userId);

    @SqlUpdate("UPDATE \"user\" SET (splitwise_request_token_secret) = " +
               "(:secret) WHERE user_id = :userId")
    void setRequestTokenSecret(@Bind("secret") String secret, @Bind("userId") long userId);

    @SqlQuery("SELECT splitwise_token, splitwise_token_secret FROM \"user\" " +
              "WHERE user_id = :userId")
    OAuth1AccessToken getToken(@Bind("userId") long userId);
    
    @SqlUpdate("UPDATE \"user\" SET (splitwise_token, splitwise_token_secret) = " +
               "(:token, :tokenSecret) WHERE user_id = :userId")
    void updateToken(@BindBean OAuth1AccessToken token, @Bind("userId") long userId);
}
