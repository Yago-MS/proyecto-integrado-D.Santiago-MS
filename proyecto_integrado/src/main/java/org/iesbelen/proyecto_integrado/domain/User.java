package org.iesbelen.proyecto_integrado.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="credential")
    private String credential;
    @Column(name="max_score")
    private Long maxScore;
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="type_id")
    private UserType type_id;
}