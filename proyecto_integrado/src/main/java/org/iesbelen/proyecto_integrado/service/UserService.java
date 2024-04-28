package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.User;
import org.iesbelen.proyecto_integrado.exception.MediaTypeNotFoundException;
import org.iesbelen.proyecto_integrado.exception.UserNotFoundException;
import org.iesbelen.proyecto_integrado.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> all() {
        return this.userRepository.findAll();
    }

    public User save(User user) {
        return this.userRepository.save(user);
    }

    public User one(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public void deleteUser(long id){
        this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        this.userRepository.deleteById(id);
    }

    public void updateUser(long id, User user){
        this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        this.userRepository.save(user);
    }
}
