package consamables.jdbi.mappers;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import consamables.api.Restaurant;

public class RestaurantMapper implements ResultSetMapper<Restaurant> {

    public Restaurant map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        ObjectMapper mapper = new ObjectMapper();
        String dataString = r.getString("data");
        JsonNode data = null;
        try {
            if (dataString != null) {
                data = mapper.readTree(dataString);
            }
            return new Restaurant(r.getLong("restaurant_id"), r.getString("name"),
                                  mapper.readTree(r.getString("location")),
                                  mapper.readTree(r.getString("hours")),
                                  r.getString("url"), r.getBoolean("has_delivery"),
                                  data);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
}
