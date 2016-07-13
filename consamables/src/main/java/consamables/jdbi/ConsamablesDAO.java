package consamables.jdbi;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;

public interface ConsamablesDAO
{
	@SqlQuery("SELECT * FROM food_order WHERE food_group_id = :group_id")
	String[] getOrders(@Bind("group_id") int group_id);
}
