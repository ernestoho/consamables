package consamables.api;

import java.math.BigDecimal;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Item
{
    @JsonProperty
    private Integer itemId;
    
    @NotNull
    @JsonProperty
    private Integer restaurantId;
    
    @NotNull
    @JsonProperty
    private String name;
    
    @JsonProperty
    private String description;
    
    @NotNull
    @JsonProperty
    private BigDecimal price;
    
    public Item() { }

    public Item(Integer itemId, Integer restaurantId, String name, String description, BigDecimal price)
    {
        this.itemId = itemId;
        this.restaurantId = restaurantId;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Integer getItemId()
    {
        return itemId;
    }

    public void setItemId(Integer itemId)
    {
        this.itemId = itemId;
    }

    public Integer getRestaurantId()
    {
        return restaurantId;
    }

    public void setRestaurantId(Integer restaurantId)
    {
        this.restaurantId = restaurantId;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public BigDecimal getPrice()
    {
        return price;
    }

    public void setPrice(BigDecimal price)
    {
        this.price = price;
    }
}
