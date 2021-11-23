package com.cholnhial.taca.repository;

import com.cholnhial.taca.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("select r from Room r where r.user1.username = :username or r.user2.username=:username")
    Room findUserRoom(@Param("username") String username);
}
