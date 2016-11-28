package consamables.resources;

import java.util.List;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import consamables.api.Restaurant;
import consamables.jdbi.RestaurantDAO;

@Path("/restaurants")
@Produces(MediaType.APPLICATION_JSON)
public class RestaurantResource {
    RestaurantDAO dao;
    
    public RestaurantResource(RestaurantDAO dao) {
        this.dao = dao;
    }
    
    @GET
    public List<Restaurant> getRestaurants() {
        return dao.getAll();
    }
    
    @Path("/{id}")
    @GET
    public Restaurant getRestaurant(@PathParam("id") String id) {
    	return dao.getRestaurant(Integer.parseInt(id));
    }

    @Path("/add")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public int addRestaurant(@Valid Restaurant newRestaurant) {
        return dao.addRestaurant(newRestaurant);
    }
}
