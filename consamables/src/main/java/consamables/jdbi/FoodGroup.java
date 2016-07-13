package consamables.jdbi;

import java.sql.Timestamp;

public class FoodGroup 
{

	private int foodGroupId;
	private int restaurantId;
	private Timestamp startTime;
	private int duration;
	private int minPeople;
	private String phase;
	
	public FoodGroup() { }
	
	public FoodGroup(int foodGroupId, int restaurantId,
					 Timestamp startTime, int duration,
					 int minPeople, String phase)
	{
		this.foodGroupId = foodGroupId;
		this.restaurantId = restaurantId;
		this.startTime = startTime;
		this.duration = duration;
		this.minPeople = minPeople;
		this.phase = phase;
	}
	
	public int getfoodGroupId()
	{
		return foodGroupId;
	}
	
	public void setfoodGroupId(int foodGroupId)
	{
		this.foodGroupId = foodGroupId;
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
