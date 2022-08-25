package com.diary.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class LoginRequest {
	@NotNull(message = "Email is mandatory to fill !!")
	@NotEmpty
	private String emailId;
	@NotNull(message = "password is mandatory to fill !!")
	@Pattern(regexp = "^[a-zA-Z0-9]{6}", message = "length must be 6")
	private String passWord;

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

}
