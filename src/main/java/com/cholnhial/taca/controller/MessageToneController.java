package com.cholnhial.taca.controller;


import com.cholnhial.taca.service.IBMToneAnalyzerService;
import com.cholnhial.taca.service.dto.MessageToneRequestDTO;
import com.cholnhial.taca.service.dto.MessageToneResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tone-analyzer")
@RequiredArgsConstructor
public class MessageToneController {
    private final IBMToneAnalyzerService toneAnalyzerService;

    @PostMapping("/message")
    ResponseEntity<MessageToneResponseDTO> getMessageTone(@RequestBody MessageToneRequestDTO request) {
        return ResponseEntity.ok(toneAnalyzerService.processMessage(request));
    }
}
