package com.cholnhial.taca.service;

import com.cholnhial.taca.domain.Room;
import com.cholnhial.taca.domain.User;
import com.cholnhial.taca.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
        Room room = new Room(null, RandomStringUtils.randomAlphabetic(10), (User) usersArr[0],
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
}
