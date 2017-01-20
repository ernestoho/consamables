package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import consamables.api.Vote;
import consamables.jdbi.mappers.VoteMapper;

@RegisterMapper(VoteMapper.class)
public interface VoteDAO {
    @SqlQuery("SELECT * FROM vote")
    List<Vote> getAll();

    @SqlQuery("SELECT user_id FROM vote WHERE group_id = :groupId")
    List<Integer> getVotingUsersByGroup(@Bind("groupId") long groupId);

    @SqlQuery("SELECT count(*) FROM vote JOIN \"group\" USING (group_id) " +
              "WHERE group_id = :groupId " +
              "AND time_placed + (minutes_interested || ' minutes')::interval > now()")
    int countVotesForGroup(@Bind("groupId") long groupId);

    @SqlQuery("SELECT EXISTS (SELECT 1 FROM vote " +
              "WHERE user_id = :userId AND group_id = :groupId)")
    boolean hasVoted(@Bind("userId") long userId, @Bind("groupId") long groupId);

    @SqlUpdate("INSERT INTO vote " +
               "(user_id, group_id, minutes_interested, can_drive) " +
               "VALUES " +
               "(:userId, :groupId, :minutesInterested, :canDrive)")
    void addVote(@BindBean Vote vote);

    @SqlUpdate("DELETE FROM vote WHERE user_id = :userId AND group_id = :groupId")
    void deleteVote(@Bind("userId") long userId, @Bind("groupId") long groupId);
}
