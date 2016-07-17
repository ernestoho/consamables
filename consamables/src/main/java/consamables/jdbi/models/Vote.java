package consamables.jdbi.models;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Vote
{
	@NotNull
	@JsonProperty
	private int voteId;
	
	@NotNull
	@JsonProperty
	private int userId;
	
	@NotNull
	@JsonProperty
	private int groupId;

	public Vote() { }
	
	public Vote(int voteId, int userId, int groupId)
	{
		this.voteId = voteId;
		this.userId = userId;
		this.groupId = groupId;
	}

	public int getVoteId()
	{
		return voteId;
	}

	public void setVoteId(int voteId)
	{
		this.voteId = voteId;
	}

	public int getUserId()
	{
		return userId;
	}

	public void setUserId(int userId)
	{
		this.userId = userId;
	}

	public int getGroupId()
	{
		return groupId;
	}

	public void setGroupId(int groupId)
	{
		this.groupId = groupId;
	}
}
