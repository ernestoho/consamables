package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;
import consamables.jdbi.mapper.ItemMapper;
import consamables.jdbi.models.Item;

@RegisterMapper(ItemMapper.class)
public interface ItemDAO
{
    @SqlQuery("SELECT * FROM item")
    List<Item> getAll();
    
    @SqlQuery("SELECT * FROM item WHERE restaurant_id = :restaurantId")
    List<Item> getItemsByRestaurant(@Bind("restaurantId") int restaurantId);
    
    @SqlQuery("SELECT * FROM item WHERE item_id = :itemId")
    Item getItem(@Bind("itemId") int itemId);
    
    @SqlUpdate("INSERT INTO item " +
               "(restaurant_id, name, description, price) " +
               "VALUES " +
               "(:restaurantId, :name, :description, :price)")
    void addItem(@BindBean Item item);
    
    @SqlUpdate("UPDATE item SET " +
               "(restaurant_id, name, description, price) = " +
               "(:restaurantId, :name, :description, :price) " +
               "WHERE item_id = :itemId")
    void updateItem(@BindBean Item item);
    
    @SqlUpdate("DELETE FROM item WHERE item_id = :itemId")
    void deleteItem(@Bind("itemId") int itemId);
}
