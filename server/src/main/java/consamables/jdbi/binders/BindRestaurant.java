package consamables.jdbi.binders;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.skife.jdbi.v2.SQLStatement;
import org.skife.jdbi.v2.sqlobject.Binder;
import org.skife.jdbi.v2.sqlobject.BinderFactory;
import org.skife.jdbi.v2.sqlobject.BindingAnnotation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import consamables.api.Restaurant;

@BindingAnnotation(BindRestaurant.RestaurantBinderFactory.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
public @interface BindRestaurant {

    public static class RestaurantBinderFactory implements BinderFactory<BindRestaurant> {
        
        public Binder<BindRestaurant, Restaurant> build(BindRestaurant annotation) {
            return new Binder<BindRestaurant, Restaurant>() {

                public void bind(SQLStatement<?> q, BindRestaurant bind, Restaurant arg) {
                    ObjectMapper mapper = new ObjectMapper();
                    String location;
                    String hours;
                    String data;
                    
                    try {
                        location = mapper.writeValueAsString(arg.getLocation());
                        hours = mapper.writeValueAsString(arg.getHours());
                        data = mapper.writeValueAsString(arg.getData());
                    } catch (JsonProcessingException e) {
                        location = "";
                        hours = "";
                        data = "";
                    }
                    q.bind("name", arg.getName());
                    q.bind("location", location);
                    q.bind("hours", hours);
                    q.bind("url", arg.getUrl());
                    q.bind("hasDelivery", arg.getHasDelivery());
                    q.bind("data", data);
                }
            };
        }
    }
}
