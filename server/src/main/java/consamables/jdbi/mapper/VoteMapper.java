package consamables.jdbi.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.api.Vote;

public class VoteMapper implements ResultSetMapper<Vote>
{
    public Vote map(int index, ResultSet r, StatementContext ctx) throws SQLException
    {
        return new Vote(r.getInt("user_id"), r.getInt("group_id"));
    }
}
