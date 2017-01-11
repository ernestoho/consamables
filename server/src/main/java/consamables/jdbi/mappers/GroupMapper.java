package consamables.jdbi.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.api.Group;

public class GroupMapper implements ResultSetMapper<Group> {

    public Group map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new Group(r.getLong("group_id"), r.getLong("restaurant_id"), r.getString("type"),
                         r.getString("phase"), r.getInt("min_people"), r.getInt("duration_minutes"),
                         r.getLong("organizer_id"), r.getBigDecimal("overhead_percentage"),
                         r.getTimestamp("time_created"), r.getTimestamp("time_started"), r.getTimestamp("time_ordered"));
    }
}
