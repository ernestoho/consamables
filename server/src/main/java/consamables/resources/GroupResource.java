package consamables.resources;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import consamables.api.Group;
import consamables.jdbi.GroupDAO;
import consamables.jdbi.VoteDAO;

@Path("/groups")
@Produces(MediaType.APPLICATION_JSON)
public class GroupResource {
    private GroupDAO groupDAO;
    private VoteDAO voteDAO;
    
    public GroupResource(GroupDAO groupDAO, VoteDAO voteDAO) {
        this.groupDAO = groupDAO;
        this.voteDAO = voteDAO;
    }
    
    @Path("/active")
    @GET
    public List<Group> getActiveGroups() {
        return groupDAO.getActive();
    }
    
    @Path("/pending")
    @GET
    public List<Group> getPendingGroups() {
        return groupDAO.getPending();
    }
    
    @Path("/count-votes/{id}")
    @GET
    public int getNumPeople(@PathParam("id") String id) {
        return voteDAO.countVotesForGroup(Integer.parseInt(id));
    }
    
    @Path("/pending/add")
    @POST
    public int addPendingGroup(@Valid Group newGroup) {
        return groupDAO.addPendingGroup(newGroup);
    }
    
    @Path("/active/add")
    @POST
    public int addActiveGroup(@Valid Group newGroup) {
        return groupDAO.addActiveGroup(newGroup);
    }
}
