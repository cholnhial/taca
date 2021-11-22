package com.cholnhial.taca.controller;

import com.cholnhial.taca.service.UserService;
import com.cholnhial.taca.service.dto.JoinRoomRequestDTO;
import com.cholnhial.taca.service.dto.JoinRoomResponseDTO;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

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
        if (!userService.doesUserExist(joinRoom.getUsername())) {
            userService.saveUser(joinRoom.getUsername());
        }
        responseBuilder.roomId(null);

        return ResponseEntity.ok(responseBuilder.build());
    }
}
