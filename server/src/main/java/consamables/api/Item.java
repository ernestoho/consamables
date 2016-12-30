package consamables.api;

import java.math.BigDecimal;
import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

public class Item {
    @JsonProperty
    private Integer itemId;
    
    @NotNull
    @JsonProperty
    private Integer menuSectionId;
    
    @NotNull
    @JsonProperty
    private String name;
    
    @JsonProperty
    private String description;
    
    @NotNull
    @JsonProperty
    private BigDecimal price;
    
    @JsonProperty
    private JsonNode data;
    
    public Item() { }

    public Item(Integer itemId, Integer menuSectionId, String name, String description, BigDecimal price, JsonNode data) {
        this.itemId = itemId;
        this.menuSectionId = menuSectionId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.data = data;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getMenuSectionId() {
        return menuSectionId;
    }

    public void setMenuSectionId(Integer menuSectionId) {
        this.menuSectionId = menuSectionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public JsonNode getData() {
        return data;
    }

    public void setData(JsonNode data) {
        this.data = data;
    }
}
