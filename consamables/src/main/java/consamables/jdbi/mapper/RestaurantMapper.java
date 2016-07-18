package consamables.jdbi.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.jdbi.models.Restaurant;

public class RestaurantMapper implements ResultSetMapper<Restaurant>
{
	public Restaurant map(int index, ResultSet r, StatementContext ctx) throws SQLException
	{
		return new Restaurant(r.getInt("restaurant_id"), r.getString("name"),
							  r.getString("location"), r.getString("hours"),
							  r.getString("url"));
	}
}
