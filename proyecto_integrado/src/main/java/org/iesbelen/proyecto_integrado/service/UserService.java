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

    public void deleteUser(long id) {
        this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        this.userRepository.deleteById(id);
    }

    public void updateUser(long id, User user) {
        User updateUser = this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        if (user.getTypeId() < 0) {
            updateUser.setTypeId(user.getTypeId());
        }
        if (user.getCredential() != null) {
            updateUser.setCredential(user.getCredential());
        }
        if (user.getImageUrl() != null) {
            updateUser.setImageUrl(user.getImageUrl());
        }
        if (user.getName() != null) {
            updateUser.setName(user.getName());
        }
        if(user.getMaxScore() != null) {
            updateUser.setMaxScore(user.getMaxScore());
        }
        this.userRepository.save(updateUser);
    }

    public User findByName(String name) {
        return userRepository.findByName(name);
    }
}
