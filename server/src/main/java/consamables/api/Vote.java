package consamables.api;

import java.sql.Timestamp;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Vote {
    @NotNull
    @JsonProperty
    private Long userId;

    @NotNull
    @JsonProperty
    private Long groupId;

    @NotNull
    @JsonProperty
    private Integer minutesInterested;

    @NotNull
    @JsonProperty
    private Boolean canDrive;

    @JsonProperty
    private Timestamp timePlaced;

    public Vote() { }

    public Vote(Long userId, Long groupId, Integer minutesInterested, Boolean canDrive, Timestamp timePlaced) {
        this.userId = userId;
        this.groupId = groupId;
        this.minutesInterested = minutesInterested;
        this.canDrive = canDrive;
        this.timePlaced = timePlaced;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
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