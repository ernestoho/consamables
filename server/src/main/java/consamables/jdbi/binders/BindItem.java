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

import consamables.api.Item;

@BindingAnnotation(BindItem.ItemBinderFactory.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
public @interface BindItem {

    public static class ItemBinderFactory implements BinderFactory<BindItem> {
        
        public Binder<BindItem, Item> build(BindItem annotation) {
            return new Binder<BindItem, Item>() {

                public void bind(SQLStatement<?> q, BindItem bind, Item arg) {
                    ObjectMapper mapper = new ObjectMapper();
                    String data;
                    
                    try {
                        data = mapper.writeValueAsString(arg.getData());
                    } catch (JsonProcessingException e) {
                        data = "";
                    }
                    q.bind("menuSectionId", arg.getMenuSectionId());
                    q.bind("name", arg.getName());
                    q.bind("description", arg.getDescription());
                    q.bind("price", arg.getPrice());
                    q.bind("data", data);
                }
            };
        }
    }
}
