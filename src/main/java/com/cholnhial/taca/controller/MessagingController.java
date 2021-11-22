package com.cholnhial.taca.controller;

import com.cholnhial.taca.service.dto.UserMessageDTO;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessagingController {

    @MessageMapping("/message/{roomId}")
    @SendTo("/room/{roomId}")
    public UserMessageDTO message(@DestinationVariable String roomId, UserMessageDTO message) {
        return message;
    }
}
