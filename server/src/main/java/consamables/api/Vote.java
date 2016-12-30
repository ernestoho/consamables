package consamables.api;

import java.sql.Timestamp;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Vote {
    @NotNull
    @JsonProperty
    private Integer userId;
    
    @NotNull
    @JsonProperty
    private Integer groupId;
    
    @NotNull
    @JsonProperty
    private Integer minutesInterested;
    
    @NotNull
    @JsonProperty
    private Boolean canDrive;
    
    @JsonProperty
    private Timestamp timePlaced;

    public Vote() { }

    public Vote(Integer userId, Integer groupId, Integer minutesInterested, Boolean canDrive, Timestamp timePlaced) {
        this.userId = userId;
        this.groupId = groupId;
        this.minutesInterested = minutesInterested;
        this.canDrive = canDrive;
        this.timePlaced = timePlaced;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getMinutesInterested() {
        return minutesInterested;
    }

    public void setMinutesInterested(Integer minutesInterested) {
        this.minutesInterested = minutesInterested;
    }

    public Boolean getCanDrive() {
        return canDrive;
    }

    public void setCanDrive(Boolean canDrive) {
        this.canDrive = canDrive;
    }

    public Timestamp getTimePlaced() {
        return timePlaced;
    }

    public void setTimePlaced(Timestamp timePlaced) {
        this.timePlaced = timePlaced;
    }
}