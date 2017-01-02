package consamables.jdbi.binders;

import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import org.skife.jdbi.v2.SQLStatement;
import org.skife.jdbi.v2.sqlobject.Binder;
import org.skife.jdbi.v2.sqlobject.BinderFactory;
import org.skife.jdbi.v2.sqlobject.BindingAnnotation;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import consamables.api.OrderItem;

@BindingAnnotation(BindOrderItem.OrderItemBinderFactory.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
public @interface BindOrderItem {

    public static class OrderItemBinderFactory implements BinderFactory<BindOrderItem> {
        
        public Binder<BindOrderItem, OrderItem> build(BindOrderItem annotation) {
            return new Binder<BindOrderItem, OrderItem>() {

                public void bind(SQLStatement<?> q, BindOrderItem bind, OrderItem arg) {
                    ObjectMapper mapper = new ObjectMapper();
                    String data;
                    
                    try {
                        data = mapper.writeValueAsString(arg.getData());
                    } catch (JsonProcessingException e) {
                        data = "";
                    }
                    q.bind("orderId", arg.getOrderId());
                    q.bind("itemId", arg.getItemId());
                    q.bind("quantity", arg.getQuantity());
                    q.bind("data", data);
                }
            };
        }
    }
}
