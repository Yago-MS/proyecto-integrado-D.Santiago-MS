package org.iesbelen.proyecto_integrado.repository;

import org.iesbelen.proyecto_integrado.domain.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserTypeRepository extends JpaRepository<UserType, Long> {
    Optional<UserType> findByName(String name);

    boolean existsByName(String name);
}
