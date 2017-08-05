package consamables.resources;

import java.math.BigDecimal;
import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonProcessingException;

import consamables.api.Group;
import consamables.api.NewGroup;
import consamables.api.Order;
import consamables.api.OrderItem;
import consamables.api.Suggestion;
import consamables.api.User;
import consamables.api.Vote;
import consamables.jdbi.GroupDAO;
import consamables.jdbi.OrderDAO;
import consamables.jdbi.OrderItemDAO;
import consamables.jdbi.VoteDAO;
import consamables.payment.PaymentManager;
import io.dropwizard.auth.Auth;

import javax.annotation.security.PermitAll;

@Path("/groups")
@Produces(MediaType.APPLICATION_JSON)
public class GroupResource {
    private GroupDAO groupDAO;
    private VoteDAO voteDAO;
    private OrderDAO orderDAO;
    private OrderItemDAO orderItemDAO;
    private PaymentManager paymentManager;

    public GroupResource(GroupDAO groupDAO, VoteDAO voteDAO,
                         OrderDAO orderDAO, OrderItemDAO orderItemDAO,
                         PaymentManager paymentManager) {
        this.groupDAO = groupDAO;
        this.voteDAO = voteDAO;
        this.orderDAO = orderDAO;
        this.orderItemDAO = orderItemDAO;
        this.paymentManager = paymentManager;
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

    @Path("/{id}/count-orders")
    @GET
    public int getNumOrders(@PathParam("id") String id) {
        return orderDAO.countOrdersInGroup(Long.parseLong(id));
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
    @Path("/join")
    @POST
    public Response placeOrder(@Auth User user, @Valid Order order) throws JsonProcessingException {
        if (!user.getUserId().equals(order.getUserId())) {
            throw new NotAuthorizedException("You can only join orders on behalf of yourself.", Response.status(401).build());
        }
        long payerId = order.getUserId();
        long payeeId = groupDAO.getOrganizerId(order.getGroupId());
        BigDecimal amount = paymentManager.calculateOrderCost(
                order.getOrderItems(),
                groupDAO.getOverheadPercentage(order.getGroupId()));
        String description = groupDAO.getRestaurantName(order.getGroupId());
        paymentManager.createCharge(payerId, payeeId, amount, description);

        long orderId = orderDAO.addOrder(order);
        for (OrderItem orderItem : order.getOrderItems()) {
            orderItem.setOrderId(orderId);
            orderItemDAO.addOrderItem(orderItem);
        }
        return Response.ok().build();
    }

    @PermitAll
    @Path("/activate")
    @POST
    public Response activatePendingGroup(@Auth User user, @Valid NewGroup newGroup) {
        if (!user.getUserId().equals(newGroup.getOrder().getUserId())) {
            throw new NotAuthorizedException("You can only start orders on behalf of yourself.", Response.status(401).build());
        }
        groupDAO.activatePendingGroup(newGroup.getActiveGroup());
        long orderId = orderDAO.addOrder(newGroup.getOrder());
        for (OrderItem orderItem : newGroup.getOrder().getOrderItems()) {
            orderItem.setOrderId(orderId);
            orderItemDAO.addOrderItem(orderItem);
        }
        return Response.ok().build();
    }

    @PermitAll
    @Path("/vote")
    @POST
    public Response voteForPendingGroup(@Auth User user, @Valid Vote vote) {
        if (!user.getUserId().equals(vote.getUserId())) {
            throw new NotAuthorizedException("You can only vote on behalf of yourself.", Response.status(401).build());
        }
        if (voteDAO.hasVoted(vote.getUserId(), vote.getGroupId())) {
            throw new WebApplicationException("You've already voted for this order.", Response.status(409).build());
        }
        voteDAO.addVote(vote);
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

    @PermitAll
    @Path("/joined")
    @GET
    public List<Group> getJoinedGroups(@Auth User user) {
        List<Group> groups = groupDAO.getGroupsByMember(user.getUserId());
        for (Group group : groups) {
            group.loadOrdersForUser(orderDAO, orderItemDAO, user.getUserId());
        }
        return groups;
    }

    @Path("/{id}/has-voted-for")
    @GET
    public Boolean checkVotedFor(@Auth User user, @PathParam("id") String id) {
        return voteDAO.hasVoted(user.getUserId(), Long.parseLong(id));
    }
    
    @Path("/{id}/mark-ordered")
    @POST
    public Response markOrdered(@Auth User user, @PathParam("id") String id) {
        Long groupId = Long.parseLong(id);
        if (!user.getUserId().equals(groupDAO.getOrganizerId(groupId))) {
            throw new NotAuthorizedException("You're not the organizer for this group.", Response.status(401).build());
        }
        groupDAO.markGroupOrdered(groupId);
        return Response.ok().build();
    }
    
    @Path("/{id}/mark-complete")
    @POST
    public Response markComplete(@Auth User user, @PathParam("id") String id) {
        Long groupId = Long.parseLong(id);
        if (!user.getUserId().equals(groupDAO.getOrganizerId(groupId))) {
            throw new NotAuthorizedException("You're not the organizer for this group.", Response.status(401).build());
        }
        groupDAO.markGroupComplete(groupId);
        return Response.ok().build();
    }
}
