package consamables.jdbi;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import consamables.jdbi.mappers.SplitwiseUserMapper;
import consamables.payment.SplitwiseUser;

@RegisterMapper(SplitwiseUserMapper.class)
public interface SplitwiseUserDAO {
    @SqlQuery("SELECT splitwise_first_name, splitwise_last_name, splitwise_email " +
              "FROM \"user\" WHERE user_id = :userId")
    SplitwiseUser getUserInfo(@Bind("userId") long userId);

    @SqlUpdate("UPDATE \"user\" SET (splitwise_user_id, splitwise_first_name, splitwise_last_name, splitwise_email) = " +
               "(:id, :firstName, :lastName, :email) WHERE user_id = :userId")
    void updateUserInfo(@BindBean SplitwiseUser user, @Bind("userId") long userId);

    @SqlQuery("SELECT splitwise_user_id FROM \"user\" WHERE user_id = :userId")
    long getSplitwiseUserId(@Bind("userId") long userId);

    @SqlUpdate("UPDATE \"user\" SET (splitwise_group_id) = (:groupId) " +
               "WHERE user_id = :userId")
    void setGroupForUser(@Bind("groupId") long groupId, @Bind("userId") long userId);

    @SqlQuery("SELECT user_id FROM \"user\" WHERE splitwise_group_id = :groupId LIMIT 1")
    Long getUserIdInGroup(@Bind("groupId") long groupId);
}
