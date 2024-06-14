package org.iesbelen.proyecto_integrado.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


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
    @Column(name="name", unique = true)
    private String name;
    @Column(name="credential")
    private String credential;
    @Column(name="type_id")
    private int typeId;
    @Column(name="max_score", columnDefinition = "bigint DEFAULT 0")
    private Long maxScore;
    @Column(name = "profile_pic_url")
    private String imageUrl;

    @JsonIgnore
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="type_id", referencedColumnName = "id", insertable = false, updatable = false)
    private UserType type;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Score> scores;
}