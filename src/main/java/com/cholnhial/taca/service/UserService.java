package com.cholnhial.taca.service;

import com.cholnhial.taca.domain.User;
import com.cholnhial.taca.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    /**
     * Saves a new user to the database
     * @param username the unique username
     */
    public User saveNewUser(String username) {
        User user  = new User(null ,username, RandomStringUtils.randomAlphabetic(10), false);
       return this.userRepository.save(user);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * Checks if a username already exists
     * @param username the username to check
     * @return true if it exists false otherwise
     */
    public Boolean doesUserExist(String username) {
        return this.userRepository.existsByUsername(username);
    }


    /**
     *  Finds a user not in a chat, which is not the excludedUsername
     *
     * @return a user not chatting
     */
    public User getUserNotInChat(String excludeUsername) {
        var page = userRepository.findNotChatting(PageRequest.of(0,1), excludeUsername);
        if (!page.isEmpty()) {
            return page.getContent().get(0);
        }

        return null;
    }

    /**
     * Get user by username
     *
     * @return user
     */
    public User getUserByUsername(String username) {
        return this.userRepository.findByUsername(username).get();
    }

    public User getUserBySecret(String secret) {
        return this.userRepository.findBySecret(secret).get();
    }
}
