package com.cholnhial.taca.service;

import com.cholnhial.taca.domain.Message;
import com.cholnhial.taca.domain.Room;
import com.cholnhial.taca.domain.User;
import com.cholnhial.taca.repository.RoomRepository;
import com.cholnhial.taca.service.dto.ToneResponseDTO;
import com.cholnhial.taca.service.dto.UserMessageDTO;
import com.cholnhial.taca.service.exception.RoomNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Comparator;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserService userService;
    private final IBMToneAnalyzerService ibmToneAnalyzerService;

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

    /**
     *  Gets the tone of the room based on the last 10 messages sent to room
     *
     * @param roomId the room to get the tone for
     * @return the DTO containing tone
     */
    public ToneResponseDTO getRoomMessagesTone(String roomId) {
        String messages = this.roomRepository.findRoomByRoomTopicId(roomId).orElseThrow(() -> new RoomNotFoundException("Room Not Found"))
                .getMessages().stream()
                .sorted(Comparator.comparing(Message::getSent).reversed())
                .limit(10)
                .map(Message::getMessage).collect(Collectors.joining("\n"));

        return new ToneResponseDTO(ibmToneAnalyzerService.getMessageTone(messages));
    }

    /**
     *  The main goal is to clean up rooms that have been inactive for 2hrs
     *  checks happen every 10 minutes
     */
    @Async
    @Scheduled(cron = "* */10 * * * ?")
    public void cleanRooms() {
        this.roomRepository.findAll().forEach(r -> {
            if (shouldBeCleanedUp(r.getMessages())) {
                // clean up
                this.userService.delete(r.getUser1());
                this.userService.delete(r.getUser2());
                this.roomRepository.delete(r);
            }
        });
    }

    private boolean shouldBeCleanedUp(Set<Message> messages) {
        /* probably a inefficient way to get last message */
        Optional<Message> lastMessage = messages.stream().max(Comparator.comparing(Message::getSent));

        /* because IntelliJ suggested this */
        return lastMessage.
                filter(message -> ChronoUnit.HOURS.between(message.getSent(), LocalDateTime.now()) >= 2)
                .isPresent();
    }
}
