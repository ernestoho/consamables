package consamables.payment;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateChargeBody {
    private long payerId;
    private long payeeId;
    private long groupId;

    @JsonProperty
    private String cost;

    @JsonProperty
    private String description;

    public CreateChargeBody(long payerId, long payeeId, long groupId, BigDecimal cost, String description) {
        this.payerId = payerId;
        this.payeeId = payeeId;
        this.groupId = groupId;
        this.cost = cost.toString();
        this.description = description;
    }

    @JsonProperty("group_id")
    long getGroupId() {
        return groupId;
    }

    @JsonProperty("users__0__user_id")
    long getPayerId() {
        return payerId;
    }

    @JsonProperty("users__0__owed_share")
    String getPayerOwed() {
        return cost;
    }

    @JsonProperty("users__0__paid_share")
    String getPayerPaid() {
        return "0";
    }

    @JsonProperty("users__1__user_id")
    long getPayeeId() {
        return payeeId;
    }

    @JsonProperty("users__1__owed_share")
    String getPayeeOwed() {
        return "0";
    }

    @JsonProperty("users__1__paid_share")
    String getPayeePaid() {
        return cost;
    }
}
