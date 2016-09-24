package consamables.api;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Order {
    @JsonProperty
    private Integer orderId;
    
    @NotNull
    @JsonProperty
    private Integer groupId;
    
    @NotNull
    @JsonProperty
    private Integer userId;
    
    @NotNull
    @JsonProperty
    private Integer itemId;
    
    public Order() { }
    
    public Order(Integer orderId, Integer groupId, Integer userId, Integer itemId) {
        this.orderId = orderId;
        this.groupId = groupId;
        this.userId = userId;
        this.itemId = itemId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }
}
