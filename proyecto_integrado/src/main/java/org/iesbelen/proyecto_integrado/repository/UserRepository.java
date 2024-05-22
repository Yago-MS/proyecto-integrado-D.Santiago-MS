package org.iesbelen.proyecto_integrado.repository;

import org.iesbelen.proyecto_integrado.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String name);
}
