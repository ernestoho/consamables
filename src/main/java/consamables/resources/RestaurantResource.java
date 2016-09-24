package consamables.resources;

import java.util.List;
import javax.validation.Valid;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import consamables.api.Restaurant;
import consamables.jdbi.RestaurantDAO;

@Path("/restaurants")
@Produces({MediaType.APPLICATION_JSON})
public class RestaurantResource {
    RestaurantDAO dao;
    
    public RestaurantResource(RestaurantDAO dao) {
        this.dao = dao;
    }
    
    @GET
    public List<Restaurant> getRestaurants() {
        return dao.getAll();
    }

    @POST
    public void add(@Valid Restaurant restaurant) {
        dao.addRestaurant(restaurant);
    }
}
