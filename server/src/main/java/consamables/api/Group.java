package consamables.api;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import consamables.jdbi.OrderDAO;
import consamables.jdbi.OrderItemDAO;

public class Group {
    @JsonProperty
    private Long groupId;

    @JsonProperty
    private Long restaurantId;

    @JsonProperty
    private String type;

    @JsonProperty
    private String phase;

    @JsonProperty
    private Integer minPeople;

    @JsonProperty
    private Integer durationMinutes;

    @JsonProperty
    private Long organizerId;

    @JsonProperty
    private BigDecimal overheadPercentage;

    @JsonProperty
    private Timestamp timeCreated;

    @JsonProperty
    private Timestamp timeStarted;

    @JsonProperty
    private Timestamp timeOrdered;
    
    @JsonProperty
    private List<Order> orders;

    public Group() { }

    public Group(Long groupId, Long restaurantId, String type,
                 String phase, Integer minPeople, Integer durationMinutes,
                 Long organizerId, BigDecimal overheadPercentage,
                 Timestamp timeCreated, Timestamp timeStarted, Timestamp timeOrdered) {
        this.groupId = groupId;
        this.restaurantId = restaurantId;
        this.type = type;
        this.phase = phase;
        this.minPeople = minPeople;
        this.durationMinutes = durationMinutes;
        this.organizerId = organizerId;
        this.overheadPercentage = overheadPercentage;
        this.timeCreated = timeCreated;
        this.timeStarted = timeStarted;
        this.timeOrdered = timeOrdered;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Long getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(Long organizerId) {
        this.organizerId = organizerId;
    }

    public BigDecimal getOverheadPercentage() {
        return overheadPercentage;
    }

    public void setOverheadPercentage(BigDecimal overheadPercentage) {
        this.overheadPercentage = overheadPercentage;
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

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public Group loadOrders(OrderDAO orderDAO, OrderItemDAO orderItemDAO) {
        setOrders(orderDAO.getOrdersForGroup(groupId));
        for (Order order : orders) {
            order.loadOrderItems(orderItemDAO);
        }
        return this;
    }

    public Group loadOrdersForUser(OrderDAO orderDAO, OrderItemDAO orderItemDAO, Long userId) {
        setOrders(orderDAO.getOrdersForUserInGroup(userId, groupId));
        for (Order order : orders) {
            order.loadOrderItems(orderItemDAO);
        }
        return this;
    }
}
