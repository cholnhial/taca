package com.cholnhial.taca.repository;

import com.cholnhial.taca.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}
