package org.iesbelen.proyecto_integrado.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "media_type")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MediaType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="name")
    private String name;

    @OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
    private List<Media> medias;
}
