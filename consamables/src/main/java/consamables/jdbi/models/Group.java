package consamables.jdbi.models;

import java.sql.Timestamp;

public class Group 
{

	private int groupId;
	private int restaurantId;
	private Timestamp startTime;
	private int duration;
	private int minPeople;
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

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public int getMinPeople() {
		return minPeople;
	}

	public void setMinPeople(int minPeople) {
		this.minPeople = minPeople;
	}

	public String getPhase() {
		return phase;
	}

	public void setPhase(String phase) {
		this.phase = phase;
	}
}
