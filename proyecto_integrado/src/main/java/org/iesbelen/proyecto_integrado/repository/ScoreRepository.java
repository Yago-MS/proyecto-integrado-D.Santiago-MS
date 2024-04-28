package org.iesbelen.proyecto_integrado.repository;

import org.iesbelen.proyecto_integrado.domain.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
}
