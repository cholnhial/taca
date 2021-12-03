package com.cholnhial.taca.controller;


import com.cholnhial.taca.service.IBMToneAnalyzerService;
import com.cholnhial.taca.service.RoomService;
import com.cholnhial.taca.service.dto.MessageToneRequestDTO;
import com.cholnhial.taca.service.dto.ToneResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tone-analyzer")
@RequiredArgsConstructor
public class ToneController {
    private final IBMToneAnalyzerService toneAnalyzerService;
    private final RoomService roomService;

    @PostMapping("/message")
    ResponseEntity<ToneResponseDTO> getMessageTone(@RequestBody MessageToneRequestDTO request) {
        return ResponseEntity.ok(toneAnalyzerService.processMessage(request));
    }

    @GetMapping("/room/{roomId}")
    ResponseEntity<ToneResponseDTO> getRoomMessagesTone(@PathVariable("roomId") String roomId) {
        return ResponseEntity.ok(roomService.getRoomMessagesTone(roomId));
    }
}
