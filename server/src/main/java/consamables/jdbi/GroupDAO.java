package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import consamables.api.Group;
import consamables.jdbi.mappers.GroupMapper;

@RegisterMapper(GroupMapper.class)
public interface GroupDAO {
    @SqlQuery("SELECT * FROM \"group\"")
    List<Group> getAll();

    @SqlQuery("SELECT * FROM \"group\" WHERE phase = 'active' OR phase = 'ordered'")
    List<Group> getActive();

    @SqlQuery("SELECT * FROM \"group\" WHERE phase = 'pending'")
    List<Group> getPending();

    @SqlQuery("SELECT * FROM \"group\" WHERE group_id = :groupId")
    Group getGroup(@Bind("groupId") long groupId);
    
    @SqlQuery("SELECT organizer_id FROM \"group\" WHERE group_id = :groupId")
    long getOrganizerId(@Bind("groupId") long groupId);
    
    @SqlQuery("SELECT * FROM \"group\" WHERE organizer_id = :organizerId " +
              "AND (phase = 'active' OR phase = 'ordered')")
    List<Group> getGroupsByOrganizer(@Bind("organizerId") long organizerId);

    @SqlUpdate("INSERT INTO \"group\" " +
               "(restaurant_id, type, phase, min_people) " +
               "VALUES " +
               "(:restaurantId, CAST(:type AS group_type), 'pending', :minPeople)")
    @GetGeneratedKeys
    long addPendingGroup(@BindBean Group group);

    @SqlUpdate("INSERT INTO \"group\" " +
               "(restaurant_id, type, phase, duration_minutes, organizer_id, time_started) " +
               "VALUES " +
               "(:restaurantId, CAST(:type AS group_type), 'active', :durationMinutes, :organizerId, now())")
    @GetGeneratedKeys
    long addActiveGroup(@BindBean Group group);

    @SqlUpdate("UPDATE \"group\" SET " +
               "(phase, duration_minutes, organizer_id, time_started) = " +
               "('active', :durationMinutes, , :organizerId, now()) " +
               "WHERE group_id = :groupId")
    void activatePendingGroup(@BindBean Group group);
    
    @SqlUpdate("UPDATE \"group\" SET (phase, time_ordered) = " +
               "('ordered', now()) WHERE group_id = :groupId")
    void markGroupOrdered(@Bind("groupId") long groupId);
    
    @SqlUpdate("UPDATE \"group\" SET (phase) = ('complete') " +
               "WHERE group_id = :groupId")
    void markGroupComplete(@Bind("groupId") long groupId);

    @SqlUpdate("UPDATE \"group\" SET " +
            "(phase, time_ordered) = " +
            "('ordered', now()) " +
            "WHERE group_id = :groupId")
    void closeActiveGroup(@BindBean Group group);

    @SqlUpdate("DELETE FROM \"group\" WHERE group_id = :groupId")
    void deleteGroup(@Bind("groupId") long groupId);
}
