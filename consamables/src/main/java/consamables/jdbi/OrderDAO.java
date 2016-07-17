package consamables.jdbi;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;
import consamables.jdbi.mapper.OrderMapper;

import consamables.jdbi.models.Order;

@RegisterMapper(OrderMapper.class)
public interface OrderDAO
{		
	@SqlQuery("SELECT * FROM order")
	List<Order> getAll();
	
	@SqlQuery("SELECT * FROM order WHERE order_id = :orderId")
	Order getOrder(@Bind("order_id") int orderId);
	
	@SqlUpdate("INSERT INTO order (group_id, user_id, item_id) " +
			   "VALUES (:groupId, :userId, :itemId)")
	void addOrder(@BindBean Order order);
}
