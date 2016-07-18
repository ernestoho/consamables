package consamables.jdbi.models;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Restaurant
{
	@NotNull
	@JsonProperty
	private Integer restaurantId;
	
	@NotNull
	@JsonProperty
	private String name;
	
	@NotNull
	@JsonProperty
	private String location;
	
	@NotNull
	@JsonProperty
	private String hours;
	
	@NotNull
	@JsonProperty
	private String url;
	
	public Restaurant() { }

	public Restaurant(Integer restaurantId, String name, String location, String hours, String url)
	{
		this.restaurantId = restaurantId;
		this.name = name;
		this.location = location;
		this.hours = hours;
		this.url = url;
	}

	public Integer getRestaurantId()
	{
		return restaurantId;
	}

	public void setRestaurantId(Integer restaurantId)
	{
		this.restaurantId = restaurantId;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getLocation()
	{
		return location;
	}

	public void setLocation(String location)
	{
		this.location = location;
	}

	public String getHours()
	{
		return hours;
	}

	public void setHours(String hours)
	{
		this.hours = hours;
	}

	public String getUrl()
	{
		return url;
	}

	public void setUrl(String url)
	{
		this.url = url;
	}
}
