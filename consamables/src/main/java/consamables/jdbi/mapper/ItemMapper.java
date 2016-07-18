package consamables.jdbi.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.jdbi.models.Item;

public class ItemMapper implements ResultSetMapper<Item>
{
	public Item map(int index, ResultSet r, StatementContext ctx) throws SQLException
	{
		return new Item(r.getInt("item_id"), r.getInt("restaurant_id"),
						r.getString("name"), r.getString("description"),
						r.getBigDecimal("price"));
	}
}
