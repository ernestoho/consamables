package consamables.resources;

import javax.validation.Valid;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import consamables.api.Order;
import consamables.api.OrderItem;
import consamables.jdbi.OrderDAO;
import consamables.jdbi.OrderItemDAO;

@Path("/order")
@Produces(MediaType.APPLICATION_JSON)
public class OrderResource {
    private OrderDAO orderDAO;
    private OrderItemDAO orderItemDAO;

    public OrderResource(OrderDAO orderDAO, OrderItemDAO orderItemDAO) {
        this.orderDAO = orderDAO;
        this.orderItemDAO = orderItemDAO;
    }
    
    @Path("/place")
    @POST
    public void placeOrder(@Valid Order order) {
        int orderId = orderDAO.addOrder(order);
        for (OrderItem orderItem : order.getOrderItems()) {
            orderItem.setOrderId(orderId);
            orderItemDAO.addOrderItem(orderItem);
        }
    }
}
