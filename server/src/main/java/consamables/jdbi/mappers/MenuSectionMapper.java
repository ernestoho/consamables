package consamables.jdbi.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import consamables.api.MenuSection;

public class MenuSectionMapper implements ResultSetMapper<MenuSection> {

    public MenuSection map(int index, ResultSet r, StatementContext ctx) throws SQLException {
        return new MenuSection(r.getLong("menu_section_id"), r.getString("name"));
    }
}
