package com.cholnhial.taca.service;

import com.cholnhial.taca.domain.User;
import com.cholnhial.taca.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    /**
     * Saves a new user to the database
     * @param username the unique username
     */
    public void saveUser(String username) {
        User user  = new User(null ,username, false);
        this.userRepository.save(user);
    }

    /**
     * Checks if a username already exists
     * @param username the username to check
     * @return true if it exists false otherwise
     */
    public Boolean doesUserExist(String username) {
        return this.userRepository.existsByUsername(username);
    }
}
