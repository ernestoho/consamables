package consamables.resources;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import consamables.api.Menu;
import consamables.api.Restaurant;
import consamables.jdbi.ItemDAO;
import consamables.jdbi.MenuSectionDAO;
import consamables.jdbi.RestaurantDAO;

@Path("/restaurants")
@Produces(MediaType.APPLICATION_JSON)
public class RestaurantResource {
    RestaurantDAO restaurantDAO;
    MenuSectionDAO menuSectionDAO;
    ItemDAO itemDAO;

    public RestaurantResource(RestaurantDAO restaurantDAO, 
                              MenuSectionDAO menuSectionDAO,
                              ItemDAO itemDAO) {
        this.restaurantDAO = restaurantDAO;
        this.menuSectionDAO = menuSectionDAO;
        this.itemDAO = itemDAO;
    }

    @GET
    public List<Restaurant> getRestaurants() {
        return restaurantDAO.getAll();
    }

    @Path("/{id}")
    @GET
    public Restaurant getRestaurant(@PathParam("id") String id) {
        return restaurantDAO.getRestaurant(Integer.parseInt(id));
    }

    @PermitAll
    @Path("/add")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public long addRestaurant(@Valid Restaurant newRestaurant) {
        return restaurantDAO.addRestaurant(newRestaurant);
    }

    @Path("/{id}/menu")
    @GET
    public Menu getMenu(@PathParam("id") String id) {
        return new Menu(Long.parseLong(id)).loadSections(menuSectionDAO, itemDAO);
    }
}
