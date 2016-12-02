package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;
import consamables.jdbi.mapper.GroupMapper;
import consamables.api.Group;

@RegisterMapper(GroupMapper.class)
public interface GroupDAO {
    @SqlQuery("SELECT * FROM \"group\"")
    List<Group> getAll();
    
    @SqlQuery("SELECT * FROM \"group\" WHERE phase = 'active' " +
    		  "AND time_started + (duration || 'minutes')::interval > now()")
    List<Group> getActive();
    
    @SqlQuery("SELECT * FROM \"group\" WHERE phase = 'pending'")
    List<Group> getPending();

    @SqlQuery("SELECT * FROM \"group\" WHERE group_id = :groupId")
    Group getGroup(@Bind("groupId") int groupId);

    @SqlUpdate("INSERT INTO \"group\" " +
               "(restaurant_id, phase, min_people) " +
               "VALUES " +
               "(:restaurantId, 'pending', :minPeople)")
    @GetGeneratedKeys
    int addPendingGroup(@BindBean Group group);
    
    @SqlUpdate("INSERT INTO \"group\" " +
    		   "(restaurant_id, phase, duration, time_started) " +
    		   "VALUES " +
    		   "(:restaurantId, 'active', :duration, now())")
    @GetGeneratedKeys
    int addActiveGroup(@BindBean Group group);

    @SqlUpdate("UPDATE \"group\" SET " +
               "(phase, duration, time_started) = " +
               "('active', :duration, now()) " +
               "WHERE group_id = :groupId")
    void activatePendingGroup(@BindBean Group group);
    
    @SqlUpdate("UPDATE \"group\" SET " +
            "(phase, time_ordered) = " +
            "('ordered', now()) " +
            "WHERE group_id = :groupId")
    void closeActiveGroup(@BindBean Group group);

    @SqlUpdate("DELETE FROM \"group\" WHERE group_id = :groupId")
    void deleteGroup(@Bind("groupId") int groupId);
}
