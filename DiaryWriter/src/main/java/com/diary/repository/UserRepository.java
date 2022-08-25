package com.diary.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.diary.entity.UserEntity;

public interface UserRepository extends MongoRepository<UserEntity, String> {

	public Optional<UserEntity> findByEmailIdAndPassWord(String emailId, String passWord);

	Optional<UserEntity> findByEmailId(String username);
}
