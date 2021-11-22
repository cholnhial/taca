package com.cholnhial.taca.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class JoinRoomRequestDTO {
    @NotNull
    private String username;
}
