package consamables.jdbi.models;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Order
{
	@NotNull
	@JsonProperty
	private int orderId;
	
	@NotNull
	@JsonProperty
	private int groupId;
	
	@NotNull
	@JsonProperty
	private int userId;
	
	@NotNull
	@JsonProperty
	private int itemId;
	
	public Order() { }
	
	public Order(int orderId, int groupId, int userId, int itemId)
	{
		this.orderId = orderId;
		this.groupId = groupId;
		this.userId = userId;
		this.itemId = itemId;
	}

	public int getOrderId()
	{
		return orderId;
	}

	public void setOrderId(int orderId)
	{
		this.orderId = orderId;
	}

	public int getGroupId()
	{
		return groupId;
	}

	public void setGroupId(int groupId)
	{
		this.groupId = groupId;
	}

	public int getUserId()
	{
		return userId;
	}

	public void setUserId(int userId)
	{
		this.userId = userId;
	}

	public int getItemId()
	{
		return itemId;
	}

	public void setItemId(int itemId)
	{
		this.itemId = itemId;
	}
}
