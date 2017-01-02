package consamables.jdbi;

import java.util.List;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import consamables.api.User;
import consamables.jdbi.mappers.UserMapper;

@RegisterMapper(UserMapper.class)
public interface UserDAO {
    @SqlQuery("SELECT user_id, email FROM \"user\"")
    List<User> getAll();

    @SqlQuery("SELECT user_id, email FROM \"user\" WHERE user_id = :userId")
    User getUser(@Bind("userId") long userId);

    @SqlQuery("SELECT email FROM \"user\" WHERE user_id = :userId")
    String getEmailById(@Bind("userId") long userId);
    
    @SqlQuery("SELECT password_hash FROM \"user\" WHERE email = :username")
    String getPasswordHash(@Bind("username") String username);

    @SqlUpdate("INSERT INTO \"user\" " +
               "(email, password_hash, password_salt) " +
               "VALUES " +
               "(:email, :passwordHash, :passwordSalt)")
    void addUser(@BindBean User user);
}
