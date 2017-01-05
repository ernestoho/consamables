package consamables.jdbi;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import consamables.api.OrderItem;
import consamables.jdbi.binders.BindOrderItem;
import consamables.jdbi.mappers.OrderItemMapper;

@RegisterMapper(OrderItemMapper.class)
public interface OrderItemDAO {
    @SqlQuery("SELECT * FROM order_item WHERE order_id = :orderId")
    List<OrderItem> getOrderItems(@Bind("orderId") long orderId);

    @SqlUpdate("INSERT INTO order_item " +
               "(order_id, item_id, quantity, data) " +
               "VALUES " +
               "(:orderId, :itemId, :quantity, CAST(:data AS json))")
    void addOrderItem(@BindOrderItem OrderItem orderItem);
}
