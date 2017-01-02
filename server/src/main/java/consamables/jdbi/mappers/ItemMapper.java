package consamables.jdbi.mappers;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import consamables.api.Item;

public class ItemMapper implements ResultSetMapper<Item> {

    public Item map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        ObjectMapper mapper = new ObjectMapper();
        String dataString = r.getString("data");
        JsonNode data = null;
        if (dataString != null) {
            try {
                data = mapper.readTree(dataString);
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return new Item(r.getLong("item_id"), r.getLong("menu_section_id"),
                r.getString("name"), r.getString("description"),
                r.getBigDecimal("price"), data);
    }
}
