package consamables.resources;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import consamables.api.Group;
import consamables.api.NewGroup;
import consamables.api.OrderItem;
import consamables.api.Suggestion;
import consamables.api.User;
import consamables.jdbi.GroupDAO;
import consamables.jdbi.OrderDAO;
import consamables.jdbi.OrderItemDAO;
import consamables.jdbi.VoteDAO;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;

@Path("/groups")
@Produces(MediaType.APPLICATION_JSON)
public class GroupResource {
    private GroupDAO groupDAO;
    private VoteDAO voteDAO;
    private OrderDAO orderDAO;
    private OrderItemDAO orderItemDAO;

    public GroupResource(GroupDAO groupDAO, VoteDAO voteDAO,
                         OrderDAO orderDAO, OrderItemDAO orderItemDAO) {
        this.groupDAO = groupDAO;
        this.voteDAO = voteDAO;
        this.orderDAO = orderDAO;
        this.orderItemDAO = orderItemDAO;
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
        return voteDAO.countVotesForGroup(Long.parseLong(id));
    }

    @PermitAll
    @Path("/suggest")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addSuggestion(@Auth User user, @Valid Suggestion suggestion) {
        if (!user.getUserId().equals(suggestion.getVote().getUserId())) {
            throw new NotAuthorizedException("You can only suggest orders on behalf of yourself.", Response.status(401).build());
        }
        long groupId = groupDAO.addPendingGroup(suggestion.getPendingGroup());
        suggestion.getVote().setGroupId(groupId);
        voteDAO.addVote(suggestion.getVote());
        return Response.ok().build();
    }

    @PermitAll
    @Path("/start")
    @POST
    public Response startNewGroup(@Auth User user, @Valid NewGroup newGroup) {
        if (!user.getUserId().equals(newGroup.getOrder().getUserId())) {
            throw new NotAuthorizedException("You can only start orders on behalf of yourself.", Response.status(401).build());
        }
        long groupId = groupDAO.addActiveGroup(newGroup.getActiveGroup());
        newGroup.getOrder().setGroupId(groupId);
        long orderId = orderDAO.addOrder(newGroup.getOrder());
        for (OrderItem orderItem : newGroup.getOrder().getOrderItems()) {
            orderItem.setOrderId(orderId);
            orderItemDAO.addOrderItem(orderItem);
        }
        return Response.ok().build();
    }

    @PermitAll
    @Path("/organized")
    @GET
    public List<Group> getOrganizedGroups(@Auth User user) {
        List<Group> groups = groupDAO.getGroupsByOrganizer(user.getUserId());
        for (Group group : groups) {
            group.loadOrders(orderDAO, orderItemDAO);
        }
        return groups;
    }
}
