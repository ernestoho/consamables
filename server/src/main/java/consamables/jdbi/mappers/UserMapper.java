package consamables.jdbi.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.api.User;

public class UserMapper implements ResultSetMapper<User> {

    public User map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new User(r.getLong("user_id"), r.getString("email"),
                        r.getBoolean("auth"));
    }
}
