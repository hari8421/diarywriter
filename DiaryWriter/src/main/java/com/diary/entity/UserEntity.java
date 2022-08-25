package com.diary.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.validation.annotation.Validated;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@Validated
@AllArgsConstructor
@NoArgsConstructor
@Document
public class UserEntity {

	@Id
	private String emailId;
	private String firstName;
	private String lastName;
	private String displayName;
	private String userStatus;
	private String created_on;
	public String passWord;
	private Long accountId;

}
