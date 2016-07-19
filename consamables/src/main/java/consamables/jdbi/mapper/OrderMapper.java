package consamables.jdbi.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.jdbi.models.Order;

public class OrderMapper implements ResultSetMapper<Order>
{
    public Order map(int index, ResultSet r, StatementContext ctx) throws SQLException
    {
        return new Order(r.getInt("order_id"), r.getInt("group_id"),
                         r.getInt("user_id"), r.getInt("item_id"));
    }
}
