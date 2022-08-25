package com.diary.response;

import lombok.Data;

@Data
public class UserResponse {
	private String emailId;
	private String firstName;
	private String lastName;
	private String displayName;
	private String userStatus;
	private String created_on;

}