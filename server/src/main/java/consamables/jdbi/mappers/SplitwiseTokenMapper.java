package consamables.jdbi.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.github.scribejava.core.model.OAuth1AccessToken;

public class SplitwiseTokenMapper implements ResultSetMapper<OAuth1AccessToken> {

    public OAuth1AccessToken map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new OAuth1AccessToken(r.getString("splitwise_token"), r.getString("splitwise_token_secret"));
    }
}
