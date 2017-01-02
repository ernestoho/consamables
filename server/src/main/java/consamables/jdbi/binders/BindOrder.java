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

import consamables.api.Order;

@BindingAnnotation(BindOrder.OrderBinderFactory.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
public @interface BindOrder {

    public static class OrderBinderFactory implements BinderFactory<BindOrder> {
        
        public Binder<BindOrder, Order> build(BindOrder annotation) {
            return new Binder<BindOrder, Order>() {

                public void bind(SQLStatement<?> q, BindOrder bind, Order arg) {
                    ObjectMapper mapper = new ObjectMapper();
                    String data;
                    
                    try {
                        data = mapper.writeValueAsString(arg.getData());
                    } catch (JsonProcessingException e) {
                        data = "";
                    }
                    q.bind("groupId", arg.getGroupId());
                    q.bind("userId", arg.getUserId());
                    q.bind("data", data);
                }
            };
        }
    }
}
