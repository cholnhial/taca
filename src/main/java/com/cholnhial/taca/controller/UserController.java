package com.cholnhial.taca.controller;

import com.cholnhial.taca.domain.Room;
import com.cholnhial.taca.domain.User;
import com.cholnhial.taca.service.RoomService;
import com.cholnhial.taca.service.UserService;
import com.cholnhial.taca.service.dto.JoinRoomRequestDTO;
import com.cholnhial.taca.service.dto.JoinRoomResponseDTO;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final RoomService roomService;

    /**
     * POST /api/user : post a new join request
     *
     * For requesting a chat
     *
     * @param joinRoom the request object
     * @return the ResponseEntity with (200 OK) and body containing JoinRoomResponseDTO
     */
    @PostMapping("/join")
    public ResponseEntity<?> joinRoom(@RequestBody @Valid JoinRoomRequestDTO joinRoom) {
        var responseBuilder = JoinRoomResponseDTO.builder();
        responseBuilder.isNameTaken(false);
        responseBuilder.otherUser(null);

        User user = null;
        if (joinRoom.getSecret() != null) {
            user = userService.getUserBySecret(joinRoom.getSecret());
            if(user == null) {
                return ResponseEntity.badRequest().body(Strings.EMPTY);
            }
            responseBuilder.secret(user.getSecret());
        } else {
            if(userService.doesUserExist(joinRoom.getUsername())) {
                responseBuilder.isNameTaken(true);
            } else {
                user =  userService.saveNewUser(joinRoom.getUsername());
                responseBuilder.secret(user.getSecret());
            }
        }

        Room room = null;
        if (user != null && user.getIsChatting()) {
            // get existing chatRoom
            room = roomService.findExistingRoom(joinRoom.getUsername());
        } else {
            // Create a chat room with available user
            var userNotInChat = userService.getUserNotInChat(joinRoom.getUsername());
            if (userNotInChat != null) {
                var users = Set.of(userNotInChat, user);
                room = roomService.createRoomForUsers(users);
            }
        }
        if (room != null) {
            if (!room.getUser1().getUsername().equals(user.getUsername())) {
                responseBuilder.otherUser(room.getUser1().getUsername());
            }
            if (!room.getUser2().getUsername().equals(user.getUsername())) {
                responseBuilder.otherUser(room.getUser2().getUsername());
            }
        }
        responseBuilder.roomId(room != null ? room.getRoomTopicId() : null);
        return ResponseEntity.ok(responseBuilder.build());
    }
}
