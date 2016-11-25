package consamables.api;

import java.io.IOException;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;

public class Restaurant {

    @JsonProperty
    private Integer restaurantId;
    
    @NotNull
    @JsonProperty
    private String name;
    
    @NotNull
    @JsonProperty
    private JsonNode location;
    
    @NotNull
    @JsonProperty
    private JsonNode hours;
    
    @NotNull
    @JsonProperty
    private String url;
    
    public Restaurant() { }

    public Restaurant(Integer restaurantId, String name, JsonNode location, JsonNode hours, String url)
    		throws JsonProcessingException, IOException {
    	this(name, location, hours, url);
        this.restaurantId = restaurantId;
    }

    public Restaurant(String name, JsonNode location, JsonNode hours, String url)
    		throws JsonProcessingException, IOException {
        this.name = name;
        this.location = location;
        this.hours = hours;
        this.url = url;
    }

    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public JsonNode getLocation() {
        return location;
    }
    
    public void setLocation(JsonNode location) {
    	this.location = location;
    }

    public JsonNode getHours() {
        return hours;
    }

    public void setHours(JsonNode hours) {
    	this.hours = hours;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
