package org.iesbelen.proyecto_integrado.domain;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "media")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="name")
    private String name;
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="type_id")
    private MediaType type_id;
    @Column(name = "release_date")
    private Date releaseDate;
}

