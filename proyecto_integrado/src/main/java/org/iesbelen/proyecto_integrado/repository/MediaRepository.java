package org.iesbelen.proyecto_integrado.repository;

import org.iesbelen.proyecto_integrado.domain.Media;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findByReleaseYearAfter(int dateAfter);
    Media findByName(String name);

    boolean existsByName(String name);
}
