package com.diary.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.diary.entity.UserDiary;
import com.diary.repository.UserDiaryRepository;
import com.diary.request.DiaryRequest;
import com.diary.service.UserDiaryService;

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
public class DiaryController {

	@Autowired
	private UserDiaryService diaryService;

	@Operation(summary = "Inserting diary data ", description = "Inserting diary data in to the database", tags = "CreateAPI")
	@PostMapping("/createDiary")
	public ResponseEntity<?> createDiary(@Valid @RequestBody DiaryRequest diaryRequest) {
		log.info("inserting diary for user:{}", diaryRequest.getUserId());
		String diaryId = diaryService.insertDiary(diaryRequest);
		return new ResponseEntity<String>(diaryId, HttpStatus.CREATED);
	}
	
	@Operation(summary = "Fetch all diary for a user", description = "Fetch all diary for a user", tags = "GetDiaryAPI")
	@GetMapping("/getDiaryByUser/{userId}")
	public ResponseEntity<?> getDiaryByUser(@PathVariable(name="userId") String userId) {
		log.info("inserting diary for user:{}", userId);
		List<UserDiary> diaryData= diaryService.getDiaryByUser(userId);
		return new ResponseEntity<List<UserDiary>>(diaryData, HttpStatus.OK);
	}
	
	@Operation(summary = "Fetch diary by ID", description = "Fetch all diary for a user", tags = "GetDiaryAPI")
	@GetMapping("/getDiaryById/{diaryId}")
	public ResponseEntity<?> getDiaryById(@PathVariable(name="diaryId") String diaryId) {
		log.info("getting diary for id:{}", diaryId);
		UserDiary diaryData= diaryService.getDiaryById(diaryId);
		return new ResponseEntity<UserDiary>(diaryData, HttpStatus.OK);
	}

}
