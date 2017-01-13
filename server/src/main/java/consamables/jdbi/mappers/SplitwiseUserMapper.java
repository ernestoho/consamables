package consamables.jdbi.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import consamables.payment.SplitwiseUser;

public class SplitwiseUserMapper implements ResultSetMapper<SplitwiseUser> {

    public SplitwiseUser map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new SplitwiseUser(r.getString("splitwise_first_name"), r.getString("splitwise_last_name"),
                                 r.getString("splitwise_email"));
    }
}
