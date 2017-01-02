package consamables.jdbi.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.api.Vote;

public class VoteMapper implements ResultSetMapper<Vote> {

    public Vote map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new Vote(r.getLong("user_id"), r.getLong("group_id"),
                        r.getInt("minutes_interested"), r.getBoolean("can_drive"),
                        r.getTimestamp("time_placed"));
    }
}
