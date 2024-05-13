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
    @Column(name="name")
    private String name;
    @Column(name="credential")
    private String credential;
    @Column(name="type_id")
    private int typeId;
    @Column(name="max_score")
    private Long maxScore;
    @Column(name = "profile_pic_url")
    private String profilePicUrl;

    @JsonIgnore
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="type_id", referencedColumnName = "id", insertable = false, updatable = false)
    private UserType type;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Score> scores;
}