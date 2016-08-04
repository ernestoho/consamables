package consamables.jdbi.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.api.Group;

public class GroupMapper implements ResultSetMapper<Group>
{
    public Group map(int index, ResultSet r, StatementContext ctx) throws SQLException
    {
        return new Group(r.getInt("group_id"), r.getInt("restaurant_id"),
                         r.getTimestamp("start_time"), r.getInt("duration"),
                         r.getInt("min_people"), r.getString("phase"));
    }
}
