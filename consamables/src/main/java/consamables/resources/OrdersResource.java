package consamables.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import consamables.api.FoodOrder;
import consamables.jdbi.ConsamablesDAO;

@Path("/get_orders")
@Produces(MediaType.APPLICATION_JSON)
public class OrdersResource
{

	public OrdersResource(ConsamablesDAO dao)
	{
		
	}
	
	@GET
	public FoodOrder getOrders()
	{
		return new FoodOrder();
	}
}
