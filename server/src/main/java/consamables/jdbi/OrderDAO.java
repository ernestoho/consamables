package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;
import consamables.jdbi.mapper.OrderMapper;
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
               "(group_id, user_id, item_id) " +
               "VALUES " +
               "(:groupId, :userId, :itemId)")
    void addOrder(@BindBean Order order);
    
    @SqlUpdate("UPDATE \"order\" SET " +
               "(group_id, user_id, item_id) = " +
               "(:groupId, :userId, :itemId) " +
               "WHERE order_id = :orderId")
    void updateOrder(@BindBean Order order);
    
    @SqlUpdate("DELETE FROM \"order\" WHERE order_id = :orderId")
    void deleteGroup(@Bind("groupId") int groupId);
}
