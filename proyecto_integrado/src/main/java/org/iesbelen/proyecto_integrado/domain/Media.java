package org.iesbelen.proyecto_integrado.domain;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name= "type_id")
    private Long typeId;
    @Column(name = "release_date")
    private Date releaseDate;
    @Column(name = "image_url")
    private String imageUrl;

    @JsonIgnore
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="type_id", referencedColumnName = "id", insertable = false, updatable = false)
    private MediaType type;
}

