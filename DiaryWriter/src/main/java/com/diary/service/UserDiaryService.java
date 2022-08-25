package com.diary.service;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

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
import com.diary.entity.UserDiary;
import com.diary.entity.UserEntity;
import com.diary.repository.UserDiaryRepository;
import com.diary.repository.UserRepository;
import com.diary.request.DiaryRequest;
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
public class UserDiaryService {

	@Autowired
	UserDiaryRepository diaryRepository;
	
	@Autowired
	private ModelMapper mapper;

	public String insertDiary(@Valid DiaryRequest diaryRequest) {
		UserDiary diary = new UserDiary();
		mapper.map(diaryRequest, diary);
		diary.setDate(LocalDateTime.now());
		diary.setDiaryId(null);
		diary.setDiaryContent(Base64.getEncoder().encodeToString(diary.getDiaryContent().getBytes()));
		diary=diaryRepository.save(diary);
		return diary.getDiaryId().toString();
	}

	public List<UserDiary> getDiaryByUser(String userId) {
		List<UserDiary> response=diaryRepository.findByUserId(userId);
		response=response.stream().map(x->{x.setDiaryContent(null);
		return x;}).collect(Collectors.toList());
		return response;
	}

	public UserDiary getDiaryById(String diaryId) {
		UserDiary diary=diaryRepository.findById(diaryId).get();
		diary.setDiaryContent(new String(Base64.getDecoder().decode(diary.getDiaryContent()),StandardCharsets.UTF_8));
		return diary;
	}

}
