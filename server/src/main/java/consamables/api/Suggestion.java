package consamables.api;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Suggestion {
    @NotNull
    @JsonProperty
    private Group pendingGroup;

    @NotNull
    @JsonProperty
    private Vote vote;

    public Suggestion() { }

    public Group getPendingGroup() {
        return pendingGroup;
    }

    public void setPendingGroup(Group pendingGroup) {
        this.pendingGroup = pendingGroup;
    }

    public Vote getVote() {
        return vote;
    }

    public void setVote(Vote vote) {
        this.vote = vote;
    }
}
