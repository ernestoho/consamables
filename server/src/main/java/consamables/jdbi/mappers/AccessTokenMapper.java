package consamables.jdbi.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import consamables.auth.AccessToken;

public class AccessTokenMapper implements ResultSetMapper<AccessToken> {

    public AccessToken map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new AccessToken((UUID) r.getObject("access_token_id"), r.getLong("user_id"),
                               r.getTimestamp("last_access_time"));
    }
}
