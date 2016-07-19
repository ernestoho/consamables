package consamables.jdbi;

import java.util.List;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.BindBean;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import consamables.jdbi.models.Vote;

public interface VoteDAO
{
    @SqlQuery("SELECT * FROM vote")
    List<Vote> getAll();

    @SqlQuery("SELECT user_id FROM vote WHERE group_id = :groupId")
    List<Integer> getVotingUsersByGroup(@Bind("groupId") int groupId);

    @SqlQuery("SELECT count(*) FROM votes WHERE group_id = :groupId")
    int countVotesForGroup(@Bind("groupId") int groupId);

    @SqlUpdate("INSERT INTO \"order\" " +
               "(user_id, group_id) " +
               "VALUES " +
               "(:userId, :groupId)")
    void addVote(@BindBean Vote vote);

    @SqlUpdate("DELETE FROM vote WHERE user_id = :userId AND group_id = :groupId")
    void deleteVote(@Bind("userId") int userId, @Bind("groupId") int groupId);
}
