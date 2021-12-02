package com.cholnhial.taca.service;

import com.cholnhial.taca.domain.Message;
import com.cholnhial.taca.domain.Room;
import com.cholnhial.taca.domain.User;
import com.cholnhial.taca.repository.RoomRepository;
import com.cholnhial.taca.service.dto.UserMessageDTO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserService userService;

    /**
     *
     * Creates a websocket topic/room for the users
     *
     * @param users to create the topic/room for
     * @return a new saved room
     */
    public Room createRoomForUsers(Set<User> users) {
        var usersArr = users.toArray();
        Room room = new Room(null, Collections.emptySet(), RandomStringUtils.randomAlphabetic(10), (User) usersArr[0],
                (User) usersArr[1]);
        room.getUser1().setIsChatting(true);
        room.getUser2().setIsChatting(true);
        this.userService.save(room.getUser1());
        this.userService.save(room.getUser2());

        return this.roomRepository.save(room);
    }

    /**
     *  Finds the room a user belongs to
     * @param username the user to find the room of
     * @return the room
     */
    public Room findExistingRoom(String username) {
        return this.roomRepository.findUserRoom(username);
    }

    /**
     *  Saves a message for a room
     * @param roomId the roomId to save the message for
     * @param message the message to save
     */
    public void saveMessageForRoom(String roomId, UserMessageDTO message) {
        this.getRoomByRoomTopicId(roomId).ifPresent(r -> {
            r.getMessages().add(new Message(null, r, message.getFrom(),
                    message.getMessage(), LocalDateTime.now()));
            this.roomRepository.save(r);
        });
    }

    /**
     * Finds the Room by a room topic id (a random alphanumeric string of length of 10)
     *
     * @param roomId the room topic id
     * @return room found or null
     */
    public Optional<Room> getRoomByRoomTopicId(String roomId) {
        return this.roomRepository.findRoomByRoomTopicId(roomId);
    }
}
