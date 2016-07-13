package consamables.jdbi;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.jdbi.FoodGroup;

public class FoodGroupMapper implements ResultSetMapper<FoodGroup>
{
	public FoodGroup map(int index, ResultSet r, StatementContext ctx) throws SQLException
	{
		return new FoodGroup(r.getInt("food_order_id"), r.getInt("restaurant_id"),
							 r.getTimestamp("start_time"), r.getInt("duration"),
							 r.getInt("min_people"), r.getString("phase"));
	}
}
