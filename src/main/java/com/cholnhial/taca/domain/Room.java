package com.cholnhial.taca.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table
@Data
@EqualsAndHashCode(of = {"roomTopicId", "id"})
@AllArgsConstructor
@NoArgsConstructor
public class Room {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String roomTopicId;
    @OneToOne
    private User user1;
    @OneToOne
    private User user2;
}
