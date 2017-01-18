package consamables.jdbi.binders;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.skife.jdbi.v2.SQLStatement;
import org.skife.jdbi.v2.sqlobject.Binder;
import org.skife.jdbi.v2.sqlobject.BinderFactory;
import org.skife.jdbi.v2.sqlobject.BindingAnnotation;

import consamables.auth.AccessToken;

@BindingAnnotation(BindAccessToken.AccessTokenBinderFactory.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
public @interface BindAccessToken {

    public static class AccessTokenBinderFactory implements BinderFactory<BindAccessToken> {

        public Binder<BindAccessToken, AccessToken> build(BindAccessToken annotation) {
            return new Binder<BindAccessToken, AccessToken>() {

                public void bind(SQLStatement<?> q, BindAccessToken bind, AccessToken arg) {
                    q.bind("accessTokenId", arg.getAccessTokenId().toString());
                    q.bind("userId", arg.getUserId());
                    q.bind("lastAccessTime", arg.getLastAccessTime());
                }
            };
        }
    }
}
