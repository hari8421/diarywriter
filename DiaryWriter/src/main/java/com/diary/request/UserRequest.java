package com.diary.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserRequest {
	@NotNull(message = "Email is mandatory to fill !!")
	@Email
	private String emailId;
	@NotNull(message = "firstName is mandatory to fill !!")
	@Size(min = 2, max = 30)
	private String firstName;
	@NotNull(message = "lastName is mandatory to fill !!")
	private String lastName;
	@NotNull(message = "displayName is mandatory to fill !!")
	private String displayName;
	@NotNull(message = "userStatus is mandatory to fill !!")
	private String userStatus;
	private String created_on;
	private String userGroups;
	private String passWord;

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public String getCreated_on() {
		return created_on;
	}

	public void setCreated_on(String created_on) {
		this.created_on = created_on;
	}

	public String getUserGroups() {
		return userGroups;
	}

	public void setUserGroups(String userGroups) {
		this.userGroups = userGroups;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

}