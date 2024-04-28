package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.User;
import org.iesbelen.proyecto_integrado.domain.UserType;
import org.iesbelen.proyecto_integrado.exception.UserTypeNotFoundException;
import org.iesbelen.proyecto_integrado.repository.UserTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTypeService {

    private final UserTypeRepository userTypeRepository;

    public UserTypeService(UserTypeRepository userTypeRepository) {
        this.userTypeRepository = userTypeRepository;
    }

    public List<UserType> all() {
        return this.userTypeRepository.findAll();
    }

    public UserType save(UserType userType) {
        return this.userTypeRepository.save(userType);
    }

    public UserType one(Long id) {
        return this.userTypeRepository.findById(id)
                .orElseThrow(() -> new UserTypeNotFoundException(id));
    }

    public void deleteUserType(long id){
        this.userTypeRepository.findById(id).orElseThrow(() -> new UserTypeNotFoundException(id));
        this.userTypeRepository.deleteById(id);
    }

    public void updateUserType(long id, UserType userType){
        this.userTypeRepository.findById(id).orElseThrow(() -> new UserTypeNotFoundException(id));
        this.userTypeRepository.save(userType);
    }
}
