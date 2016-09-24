package consamables.api;

import java.io.IOException;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

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

    public Restaurant(Integer restaurantId, String name, String location, String hours, String url)
    		throws JsonProcessingException, IOException {
        this.restaurantId = restaurantId;
        this.name = name;
        ObjectMapper mapper = new ObjectMapper();
        this.location = mapper.readTree(location);
        this.hours = mapper.readTree(hours);
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

    public void setLocation(String location) throws JsonProcessingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        this.location = mapper.readTree(location);
    }

    public JsonNode getHours() {
        return hours;
    }

    public void setHours(String hours) throws JsonProcessingException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        this.hours = mapper.readTree(hours);
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
