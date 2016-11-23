package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import consamables.jdbi.binder.BindRestaurant;
import consamables.jdbi.mapper.RestaurantMapper;
import consamables.api.Restaurant;

@RegisterMapper(RestaurantMapper.class)
public interface RestaurantDAO {
    @SqlQuery("SELECT * FROM restaurant")
    List<Restaurant> getAll();
    
    @SqlQuery("SELECT * FROM restaurant WHERE restaurant_id = :restaurantId")
    Restaurant getRestaurant(@Bind("restaurantId") int restaurantId);
    
    @SqlUpdate("INSERT INTO restaurant " +
               "(name, location, hours, url) " +
               "VALUES " +
               "(:name, CAST(:location AS json), CAST(:hours AS json), :url) ")
    @GetGeneratedKeys
    int addRestaurant(@BindRestaurant Restaurant restaurant);
    
    @SqlUpdate("DELETE FROM restaurant WHERE restaurantId = :restaurantId")
    void deleteRestaurant(@Bind("restaurantId") int restaurantId);
}
