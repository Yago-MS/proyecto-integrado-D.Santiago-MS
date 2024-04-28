package org.iesbelen.proyecto_integrado.repository;

import org.iesbelen.proyecto_integrado.domain.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTypeRepository extends JpaRepository<UserType, Long> {
}
