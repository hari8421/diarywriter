package com.diary.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.diary.entity.UserDiary;

public interface UserDiaryRepository extends MongoRepository<UserDiary, String> {
	
	List<UserDiary> findByUserId(String userId);

}
