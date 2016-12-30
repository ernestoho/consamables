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
    @SqlQuery("SELECT * FROM \"user\"")
    List<User> getAll();

    @SqlQuery("SELECT * FROM \"user\" WHERE user_id = :userId")
    User getUser(@Bind("userId") int userId);

    @SqlQuery("SELECT email FROM \"user\" WHERE user_id = :userId")
    String getEmailById(@Bind("userId") int userId);

    @SqlUpdate("INSERT INTO \"user\" " +
               "(email, password_hash, password_salt) " +
               "VALUES " +
               "(:email, :passwordHash, :passwordSalt)")
    void addUser(@BindBean User user);

    @SqlUpdate("UPDATE \"user\" SET " +
               "(email, password_hash, password_salt) = " +
               "(:email, :passwordHash, :passwordSalt) " +
               "WHERE user_id = :userId")
    void updateUser(@BindBean User user);

    @SqlUpdate("DELETE FROM \"user\" WHERE user_id = :userId")
    void deleteUser(@Bind("userId") int userId);
}
