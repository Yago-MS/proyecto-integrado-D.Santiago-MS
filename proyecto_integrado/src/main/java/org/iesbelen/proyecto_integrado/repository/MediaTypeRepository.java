package org.iesbelen.proyecto_integrado.repository;

import org.iesbelen.proyecto_integrado.domain.MediaType;
import org.iesbelen.proyecto_integrado.domain.UserType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MediaTypeRepository extends JpaRepository<MediaType, Long> {
    MediaType findByName(String name);

    boolean existsByName(String name);
}
