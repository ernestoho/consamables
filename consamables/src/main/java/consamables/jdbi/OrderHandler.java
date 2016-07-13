package consamables.jdbi;

import org.skife.jdbi.v2.sqlobject.SqlQuery;;

public class OrderHandler {
	
	@SqlQuery("")
	public static String getOrder(int orderId) {
		return "";
	}
}
