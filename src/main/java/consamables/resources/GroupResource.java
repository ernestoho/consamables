package consamables.resources;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import consamables.api.Group;
import consamables.jdbi.GroupDAO;

@Path("/groups")
@Produces(MediaType.APPLICATION_JSON)
public class GroupResource {
	private GroupDAO dao;
	
	public GroupResource(GroupDAO dao) {
		this.dao = dao;
	}
	
	@Path("active")
	@GET
	public List<Group> getActiveGroups() {
		return dao.getActive();
	}
	
	@Path("pending")
	@GET
	public List<Group> getPendingGroups() {
		return dao.getPending();
	}
	
	@Path("add")
	@POST
	public int addGroup(@Valid Group newGroup) {
		return dao.addGroup(newGroup);
	}
}
