package com.cholnhial.taca.controller;

import com.cholnhial.taca.service.IBMToneAnalyzerService;
import com.cholnhial.taca.service.dto.UserMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class MessagingController {

    private final IBMToneAnalyzerService ibmToneAnalyzerService;

    @MessageMapping("/message/{roomId}")
    @SendTo("/room/{roomId}")
    public UserMessageDTO message(@DestinationVariable String roomId, UserMessageDTO message) {
        message.setTone(ibmToneAnalyzerService.getMessageTone(message.getMessage()));
        message.setSent(LocalDateTime.now());
        return message;
    }
}
