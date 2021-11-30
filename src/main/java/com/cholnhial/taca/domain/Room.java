package com.cholnhial.taca.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "room")
    private Set<Message> messages = new HashSet<>();

    private String roomTopicId;
    @OneToOne
    private User user1;
    @OneToOne
    private User user2;
}
