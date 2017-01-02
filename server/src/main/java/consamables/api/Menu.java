package consamables.api;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import consamables.jdbi.ItemDAO;
import consamables.jdbi.MenuSectionDAO;

public class Menu {
    @NotNull
    @JsonProperty
    private long restaurantId;

    @NotNull
    @JsonProperty
    private List<MenuSection> sections;

    public Menu(long restaurantId) {
        this.restaurantId = restaurantId;
        this.sections = new ArrayList<MenuSection>();
    }

    public long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public List<MenuSection> getSections() {
        return sections;
    }

    public void setSections(List<MenuSection> sections) {
        this.sections = sections;
    }

    public Menu loadSections(MenuSectionDAO menuSectionDAO, ItemDAO itemDAO) {
        setSections(menuSectionDAO.getMenuSections(restaurantId));
        for (MenuSection menuSection : sections) {
            menuSection.loadItems(itemDAO);
        }
        return this;
    }
}
