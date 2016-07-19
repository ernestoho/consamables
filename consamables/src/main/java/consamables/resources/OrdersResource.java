package consamables.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import consamables.jdbi.models.Group;
import consamables.jdbi.GroupDAO;

@Path("/get_orders")
@Produces(MediaType.APPLICATION_JSON)
public class OrdersResource
{

    public OrdersResource(GroupDAO dao)
    {
        
    }
    
    @GET
    public Group getGroups()
    {
        return new Group();
    }
}
