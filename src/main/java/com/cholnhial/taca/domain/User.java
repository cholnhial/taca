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
    private Long id;

    @Column(unique = true)
    private String username;

    private Boolean isChatting;
}
