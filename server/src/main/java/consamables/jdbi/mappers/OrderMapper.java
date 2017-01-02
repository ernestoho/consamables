package consamables.jdbi.mappers;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.fasterxml.jackson.databind.ObjectMapper;

import consamables.api.Order;

public class OrderMapper implements ResultSetMapper<Order> {

    public Order map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return new Order(r.getLong("order_id"), r.getLong("group_id"), r.getLong("user_id"),
                             mapper.readTree(r.getString("data")),
                             r.getTimestamp("time_placed"));
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
}
