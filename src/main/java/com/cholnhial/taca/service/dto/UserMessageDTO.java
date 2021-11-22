package com.cholnhial.taca.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMessageDTO {

    private String from;
    private LocalDateTime sent;
    private String message;
}
