package consamables.api;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NewGroup {

    @NotNull
    @JsonProperty
    private Group activeGroup;

    @NotNull
    @JsonProperty
    private Order order;

    public NewGroup() { }

    public Group getActiveGroup() {
        return activeGroup;
    }

    public void setActiveGroup(Group activeGroup) {
        this.activeGroup = activeGroup;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
