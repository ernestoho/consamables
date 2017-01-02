package consamables.api;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import consamables.jdbi.OrderItemDAO;

public class Order {
    @JsonProperty
    private Long orderId;

    @NotNull
    @JsonProperty
    private Long groupId;

    @NotNull
    @JsonProperty
    private Long userId;

    @JsonProperty
    private JsonNode data;

    @JsonProperty
    private Timestamp timePlaced;

    @NotNull
    @JsonProperty
    List<OrderItem> orderItems;

    public Order() { }

    public Order(Long orderId, Long groupId, Long userId, JsonNode data, Timestamp timePlaced) {
        this.orderId = orderId;
        this.groupId = groupId;
        this.userId = userId;
        this.data = data;
        this.timePlaced = timePlaced;
        this.orderItems = new ArrayList<OrderItem>();
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public JsonNode getData() {
        return data;
    }

    public void setData(JsonNode data) {
        this.data = data;
    }

    public Timestamp getTimePlaced() {
        return timePlaced;
    }

    public void setTimePlaced(Timestamp timePlaced) {
        this.timePlaced = timePlaced;
    }
        
    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Order loadOrderItems(OrderItemDAO dao) {
        setOrderItems(dao.getOrderItems(orderId));
        return this;
    }
}
