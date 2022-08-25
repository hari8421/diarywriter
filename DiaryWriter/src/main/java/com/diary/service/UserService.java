package com.diary.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.diary.config.JwtTokenUtil;
import com.diary.entity.UserEntity;
import com.diary.repository.UserRepository;
import com.diary.request.LoginRequest;
import com.diary.response.LoginResponse;
import com.diary.response.UserResponse;

import lombok.extern.slf4j.Slf4j;

@Service
/**
 * 
 * @author 212017
 *
 */
@Slf4j
public class UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService jwtUserService;

	/**
	 * 
	 * @return
	 */

	public <T> List<UserEntity> getUserInfo() {

		return userRepository.findAll();
	}

	/**
	 * 
	 * @return
	 */
	public List<UserEntity> deleteUsers() {
		userRepository.deleteAll();
		return userRepository.findAll();
	}

	/**
	 * 
	 * @param userRequest
	 * @return userResponse
	 */
	public UserEntity insertUserInfo(UserEntity userRequest) throws NullPointerException {

		String encodedPassWord = passwordEncoder.encode(userRequest.getPassWord());
		userRequest.setPassWord(encodedPassWord);
		return userRepository.save(userRequest);

	}

	/**
	 * 
	 * @param loginRequest
	 * @return response
	 */
	public LoginResponse getUserByEmailIdAndPassWord(LoginRequest loginRequest) throws Exception {

		LoginResponse loginResponse = new LoginResponse();
		UserResponse response = new UserResponse();

		// authentication
		authenticate(loginRequest.getEmailId(), loginRequest.getPassWord());
		final UserDetails userDetails = jwtUserService.loadUserByUsername(loginRequest.getEmailId());
		final String token = jwtTokenUtil.generateToken(userDetails);

		Optional<UserEntity> userinfo = userRepository.findByEmailId(loginRequest.getEmailId());

		UserEntity userData = userinfo.get();
		mapper.map(userData, response);
		loginResponse.setToken(token);
		loginResponse.setData(response);
		return loginResponse;
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
