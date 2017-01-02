package consamables.jdbi.mappers;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.fasterxml.jackson.databind.ObjectMapper;

import consamables.api.OrderItem;

public class OrderItemMapper implements ResultSetMapper<OrderItem> {

    public OrderItem map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return new OrderItem(r.getLong("order_item_id"), r.getLong("order_id"), r.getLong("item_id"),
                                 r.getInt("quantity"), mapper.readTree(r.getString("data")));
        } catch (IOException e) {
            //TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
}
