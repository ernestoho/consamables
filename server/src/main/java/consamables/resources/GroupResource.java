package consamables.resources;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import consamables.api.Group;
import consamables.api.Suggestion;
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
    
    @Path("/{id}/count-votes")
    @GET
    public int getNumPeople(@PathParam("id") String id) {
        return voteDAO.countVotesForGroup(Integer.parseInt(id));
    }
    
    @Path("/suggest")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addSuggestion(@Valid Suggestion suggestion) {
        int groupId = groupDAO.addPendingGroup(suggestion.getPendingGroup());
        suggestion.getVote().setGroupId(groupId);
        voteDAO.addVote(suggestion.getVote());
        return Response.ok().build();
    }
    
    @Path("/start")
    @POST
    public void startNewGroup(@Valid Group newGroup) {
        groupDAO.addActiveGroup(newGroup);
    }
}
