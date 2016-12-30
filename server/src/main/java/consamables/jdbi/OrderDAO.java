package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import consamables.jdbi.binders.BindOrder;
import consamables.jdbi.mappers.OrderMapper;
import consamables.api.Order;

@RegisterMapper(OrderMapper.class)
public interface OrderDAO {        
    @SqlQuery("SELECT * FROM \"order\"")
    List<Order> getAll();
    
    @SqlQuery("SELECT * FROM \"order\" WHERE group_id = :groupId")
    List<Order> getOrdersByGroup(@Bind("groupId") int groupId);
    
    @SqlQuery("SELECT * FROM \"order\" WHERE order_id = :orderId")
    Order getOrder(@Bind("order_id") int orderId);
    
    @SqlUpdate("INSERT INTO \"order\" " +
               "(group_id, user_id, data) " +
               "VALUES " +
               "(:groupId, :userId, CAST(:data AS json))")
    @GetGeneratedKeys
    int addOrder(@BindOrder Order order);
    
    @SqlUpdate("DELETE FROM \"order\" WHERE order_id = :orderId")
    void deleteOrder(@Bind("orderId") int orderId);
}