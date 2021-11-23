package com.cholnhial.taca.controller;

import com.cholnhial.taca.domain.Room;
import com.cholnhial.taca.domain.User;
import com.cholnhial.taca.service.RoomService;
import com.cholnhial.taca.service.UserService;
import com.cholnhial.taca.service.dto.JoinRoomRequestDTO;
import com.cholnhial.taca.service.dto.JoinRoomResponseDTO;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<JoinRoomResponseDTO> joinRoom(@RequestBody @Valid JoinRoomRequestDTO joinRoom) {
        var responseBuilder = JoinRoomResponseDTO.builder();
        responseBuilder.isNameTaken(this.userService.doesUserExist(joinRoom.getUsername()));
        User user;
        if (!userService.doesUserExist(joinRoom.getUsername())) {
          user =  userService.saveNewUser(joinRoom.getUsername());
        } else {
            user = userService.getUserByUsername(joinRoom.getUsername());
        }

        Room room = null;
        if (user.getIsChatting()) {
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
        responseBuilder.roomId(room != null ? room.getRoomTopicId() : null);

        return ResponseEntity.ok(responseBuilder.build());
    }
}
