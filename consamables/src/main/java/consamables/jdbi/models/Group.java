package consamables.jdbi.models;

import java.sql.Timestamp;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Group 
{
	@NotNull
	@JsonProperty
	private int groupId;

	@NotNull
	@JsonProperty
	private int restaurantId;

	@NotNull
	@JsonProperty
	private Timestamp startTime;

	@NotNull
	@JsonProperty
	private int duration;

	@NotNull
	@JsonProperty
	private int minPeople;

	@NotNull
	@JsonProperty
	private String phase;
	
	public Group() { }
	
	public Group(int groupId, int restaurantId,
					 Timestamp startTime, int duration,
					 int minPeople, String phase)
	{
		this.groupId = groupId;
		this.restaurantId = restaurantId;
		this.startTime = startTime;
		this.duration = duration;
		this.minPeople = minPeople;
		this.phase = phase;
	}
	
	public int getgroupId()
	{
		return groupId;
	}
	
	public void setgroupId(int groupId)
	{
		this.groupId = groupId;
	}

	public int getRestaurantId()
	{
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId)
	{
		this.restaurantId = restaurantId;
	}

	public Timestamp getStartTime()
	{
		return startTime;
	}

	public void setStartTime(Timestamp startTime)
	{
		this.startTime = startTime;
	}

	public int getDuration()
	{
		return duration;
	}

	public void setDuration(int duration)
	{
		this.duration = duration;
	}

	public int getMinPeople()
	{
		return minPeople;
	}

	public void setMinPeople(int minPeople)
	{
		this.minPeople = minPeople;
	}

	public String getPhase()
	{
		return phase;
	}

	public void setPhase(String phase)
	{
		this.phase = phase;
	}
}
