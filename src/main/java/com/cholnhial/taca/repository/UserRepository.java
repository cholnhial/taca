package com.cholnhial.taca.repository;

import com.cholnhial.taca.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
        Boolean existsByUsername(String username);


        @Query("select u from User u where u.isChatting=false and u.username <> :username")
        Page<User> findNotChatting(Pageable pageable, @Param("username") String excludeUsername);

        Optional<User> findByUsername(String username);
}
