package consamables.jdbi.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;
import consamables.api.Item;

public class ItemMapper implements ResultSetMapper<Item> {
    public Item map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new Item(r.getInt("item_id"), r.getInt("menu_section_id"),
                        r.getString("name"), r.getString("description"),
                        r.getBigDecimal("price"));
    }
}
