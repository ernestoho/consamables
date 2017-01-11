package consamables.resources;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import consamables.api.Order;
import consamables.api.User;
import consamables.jdbi.OrderDAO;
import consamables.jdbi.OrderItemDAO;
import io.dropwizard.auth.Auth;

@PermitAll
@Path("/orders")
@Produces(MediaType.APPLICATION_JSON)
public class OrderResource {
    private OrderDAO orderDAO;
    private OrderItemDAO orderItemDAO;

    public OrderResource(OrderDAO orderDAO, OrderItemDAO orderItemDAO) {
        this.orderDAO = orderDAO;
        this.orderItemDAO = orderItemDAO;
    }

    @Path("/my-orders")
    @GET
    public List<Order> getMyOrders(@Auth User user) {
        List<Order> orders = orderDAO.getOrdersForUser(user.getUserId());
        for (Order order : orders) {
            order.loadOrderItems(orderItemDAO);
        }
        return orders;
    }
}
