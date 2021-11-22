package com.cholnhial.taca.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table
@Data
@EqualsAndHashCode(of = {"roomTopicId", "id"})
public class Room {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    private String roomTopicId;
    @OneToOne
    private User user1;
    @OneToOne
    private User user2;
}
