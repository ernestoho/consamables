package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;
import consamables.jdbi.mapper.RestaurantMapper;
import consamables.api.Restaurant;

@RegisterMapper(RestaurantMapper.class)
public interface RestaurantDAO
{
    @SqlQuery("SELECT * FROM restaurant")
    List<Restaurant> getAll();
    
    @SqlQuery("SELECT * FROM restaurant WHERE restaurant_id = :restaurantId")
    Restaurant getRestaurant(@Bind("restaurantId") int restaurantId);
    
    @SqlUpdate("INSERT INTO restaurant " +
               "(name, location, hours, url) " +
               "VALUES " +
               "(:name, :location, :hours, :url)")
    void addRestaurant(@BindBean Restaurant restaurant);
    
    @SqlUpdate("UPDATE restaurant SET " +
               "(name, location, hours, url) = " +
               "(:name, :location, :hours, :url) " +
               "WHERE restaurantId = :restaurantId")
    void updateRestaurant(@BindBean Restaurant restaurant);
    
    @SqlUpdate("DELETE FROM restaurant WHERE restaurantId = :restaurantId")
    void deleteRestaurant(@Bind("restaurantId") int restaurantId);
}
