package consamables.api;

import java.sql.Timestamp;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Group {
    @JsonProperty
    private Integer groupId;

    @JsonProperty
    private Integer restaurantId;
    
    @JsonProperty
    private String phase;
    
    @JsonProperty
    private Integer minPeople;
    
    @JsonProperty
    private Integer duration;

    @JsonProperty
    private Timestamp timeCreated;
    
    @JsonProperty
    private Timestamp timeStarted;
    
    @JsonProperty
    private Timestamp timeOrdered;
    
    public Group() { }

    public Group(Integer groupId, Integer restaurantId,
                 String phase, Integer minPeople, Integer duration,
                 Timestamp timeCreated, Timestamp timeStarted, Timestamp timeOrdered) {
        this.groupId = groupId;
        this.restaurantId = restaurantId;
        this.phase = phase;
        this.minPeople = minPeople;
        this.duration = duration;
        this.timeCreated = timeCreated;
        this.timeStarted = timeStarted;
        this.timeOrdered = timeOrdered;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getPhase() {
        return phase;
    }

    public void setPhase(String phase) {
        this.phase = phase;
    }

    public Integer getMinPeople() {
        return minPeople;
    }

    public void setMinPeople(Integer minPeople) {
        this.minPeople = minPeople;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Timestamp getTimeCreated() {
        return timeCreated;
    }

    public void setTimeCreated(Timestamp timeCreated) {
        this.timeCreated = timeCreated;
    }

    public Timestamp getTimeStarted() {
        return timeStarted;
    }

    public void setTimeStarted(Timestamp timeStarted) {
        this.timeStarted = timeStarted;
    }

    public Timestamp getTimeOrdered() {
        return timeOrdered;
    }

    public void setTimeOrdered(Timestamp timeOrdered) {
        this.timeOrdered = timeOrdered;
    }
}
