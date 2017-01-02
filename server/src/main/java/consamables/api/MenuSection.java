package consamables.api;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import consamables.jdbi.ItemDAO;

public class MenuSection {
    @NotNull
    @JsonProperty
    private long menuSectionId;

    @NotNull
    @JsonProperty
    private String name;

    @NotNull
    @JsonProperty
    private List<Item> items;

    public MenuSection(long menuSectionId, String name) {
        this.menuSectionId = menuSectionId;
        this.name = name;
        this.items = new ArrayList<Item>();
    }

    public long getMenuSectionId() {
        return menuSectionId;
    }

    public void setMenuSectionId(long menuSectionId) {
        this.menuSectionId = menuSectionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public void loadItems(ItemDAO dao) {
        setItems(dao.getItemsByMenuSection(menuSectionId));
    }
}
