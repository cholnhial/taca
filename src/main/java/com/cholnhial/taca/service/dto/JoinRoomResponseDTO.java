package com.cholnhial.taca.service.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
@Builder
public class JoinRoomResponseDTO {
    private final String roomId;
    private final Boolean isNameTaken;
    private final String secret;
}
