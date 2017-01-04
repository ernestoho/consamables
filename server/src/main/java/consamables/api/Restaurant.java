package consamables.api;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

public class Restaurant {

    @JsonProperty
    private Long restaurantId;

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
    
    @NotNull
    @JsonProperty
    private boolean hasDelivery;
    
    @JsonProperty
    private JsonNode data;

    public Restaurant() { }

    public Restaurant(Long restaurantId, String name, JsonNode location, JsonNode hours,
                      String url, boolean hasDelivery, JsonNode data) {
        this(name, location, hours, url, hasDelivery, data);
        this.restaurantId = restaurantId;
    }

    public Restaurant(String name, JsonNode location, JsonNode hours,
                      String url, boolean hasDelivery, JsonNode data) {
        this.name = name;
        this.location = location;
        this.hours = hours;
        this.url = url;
        this.hasDelivery = hasDelivery;
        this.data = data;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
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

    public boolean getHasDelivery() {
        return hasDelivery;
    }

    public void setHasDelivery(boolean delivery) {
        this.hasDelivery = delivery;
    }

    public JsonNode getData() {
        return data;
    }

    public void setData(JsonNode data) {
        this.data = data;
    }
}
