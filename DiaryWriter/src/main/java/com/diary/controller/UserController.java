package com.diary.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.diary.entity.UserEntity;
import com.diary.request.LoginRequest;
import com.diary.response.LoginResponse;
import com.diary.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;

/**
 * Apps HTTP Request Handler
 *
 * @author : Anto Baby
 * @version :1.0
 * @since :02-07-2022
 */
@RestController
@Slf4j
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;

	@Operation(summary = "Inserting user data ", description = "Inserting user data in to the database", tags = "CreateAPI")
	@PostMapping("/insertuser")
	public ResponseEntity<?> insertUser(@Valid @RequestBody UserEntity userRequest) {
		log.info("inserting user:{}", userRequest.getEmailId());
		UserEntity userResponse = userService.insertUserInfo(userRequest);
		return new ResponseEntity<UserEntity>(userResponse, HttpStatus.CREATED);
	}

	@Operation(summary = "login the users by emailID and password ", description = "Login the user by emailId and passWord and getting the user data as response ", tags = "LoginAPI")
	@PostMapping("/login")
	public ResponseEntity<?> getUserByEmailAndPassWord(@Valid @RequestBody LoginRequest loginRequest) throws Exception {
		log.info("login by user:{}", loginRequest.getEmailId());
		LoginResponse loginResponse = userService.getUserByEmailIdAndPassWord(loginRequest);
		return new ResponseEntity<LoginResponse>(loginResponse, HttpStatus.OK);

	}

	@GetMapping("/test")
	public ResponseEntity<?> test() throws Exception {

		return new ResponseEntity("OK", HttpStatus.OK);

	}

}
