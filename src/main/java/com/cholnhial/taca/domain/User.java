package com.cholnhial.taca.domain;

import lombok.*;

import javax.persistence.*;

@Data
@EqualsAndHashCode(of = {"username", "id"})
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String secret;

    private Boolean isChatting;
}
