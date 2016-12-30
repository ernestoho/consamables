package consamables.api;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

public class OrderItem {
    
    @JsonProperty
    private Integer orderItemId;
    
    @JsonProperty
    private Integer orderId;
    
    @NotNull
    @JsonProperty
    private Integer itemId;
    
    @NotNull
    @JsonProperty
    private Integer quantity;
    
    @JsonProperty
    private JsonNode data;
    
    public OrderItem() { }

    public OrderItem(Integer orderItemId, Integer orderId, Integer itemId, Integer quantity, JsonNode data) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.itemId = itemId;
        this.quantity = quantity;
        this.data = data;
    }

    public Integer getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Integer orderItemId) {
        this.orderItemId = orderItemId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public JsonNode getData() {
        return data;
    }

    public void setData(JsonNode data) {
        this.data = data;
    }
}
