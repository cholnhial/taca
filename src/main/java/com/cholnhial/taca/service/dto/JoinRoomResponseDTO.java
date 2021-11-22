package com.cholnhial.taca.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JoinRoomResponseDTO {
    private final String roomId;
    private final Boolean isNameTaken;
}
