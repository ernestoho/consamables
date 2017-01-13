package consamables.payment;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AddUserBody {
    private long groupId;
    private String firstName;
    private String lastName;
    
    @JsonProperty
    private String email;

    public AddUserBody(SplitwiseUser user, long groupId) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.groupId = groupId;
    }

    @JsonProperty("first_name")
    public String getFirstName() {
        return firstName;
    }

    @JsonProperty("first_name")
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @JsonProperty("last_name")
    public String getLastName() {
        return lastName;
    }

    @JsonProperty("last_name")
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonProperty("group_id")
    public long getGroupId() {
        return groupId;
    }

    @JsonProperty("group_id")
    public void setGroupId(long groupId) {
        this.groupId = groupId;
    }
}
