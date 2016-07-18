package consamables.jdbi.models;

import java.sql.Timestamp;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Group 
{
	@NotNull
	@JsonProperty
	private Integer groupId;

	@NotNull
	@JsonProperty
	private Integer restaurantId;

	@NotNull
	@JsonProperty
	private Timestamp startTime;

	@NotNull
	@JsonProperty
	private Integer duration;

	@NotNull
	@JsonProperty
	private Integer minPeople;

	@NotNull
	@JsonProperty
	private String phase;
	
	public Group() { }
	
	public Group(Integer groupId, Integer restaurantId,
					 Timestamp startTime, Integer duration,
					 Integer minPeople, String phase)
	{
		this.groupId = groupId;
		this.restaurantId = restaurantId;
		this.startTime = startTime;
		this.duration = duration;
		this.minPeople = minPeople;
		this.phase = phase;
	}
	
	public Integer getgroupId()
	{
		return groupId;
	}
	
	public void setgroupId(Integer groupId)
	{
		this.groupId = groupId;
	}

	public Integer getRestaurantId()
	{
		return restaurantId;
	}

	public void setRestaurantId(Integer restaurantId)
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

	public Integer getDuration()
	{
		return duration;
	}

	public void setDuration(Integer duration)
	{
		this.duration = duration;
	}

	public Integer getMinPeople()
	{
		return minPeople;
	}

	public void setMinPeople(Integer minPeople)
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
