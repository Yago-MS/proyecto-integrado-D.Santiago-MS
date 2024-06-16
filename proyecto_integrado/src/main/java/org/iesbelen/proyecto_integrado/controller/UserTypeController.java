package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.UserType;
import org.iesbelen.proyecto_integrado.service.UserTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/userType")
public class UserTypeController {

    private final UserTypeService userTypeService;

    @Autowired
    public UserTypeController(UserTypeService userTypeService) {
        this.userTypeService = userTypeService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<UserType>> all() {
        log.info("fetching user types");
        List<UserType> userTypes = this.userTypeService.all();
        return ResponseEntity.ok(userTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserType> one(@PathVariable("id") Long id) {
        UserType userType = this.userTypeService.one(id);
        if (userType != null) {
            return ResponseEntity.ok(userType);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<UserType> oneByName(@PathVariable("name") String name){
        UserType userType = this.userTypeService.getUserTypeByName(name);
        if (userType != null) {
            return ResponseEntity.ok(userType);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping({"", "/"})
    public ResponseEntity<UserType> newUserType(@RequestBody UserType userType) {
        UserType savedUserType = this.userTypeService.save(userType);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUserType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUserType(
            @PathVariable long id,
            @RequestBody UserType userType) {
        this.userTypeService.updateUserType(id, userType);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserType(@PathVariable long id) {
        if(!userTypeService.one(id).getUsers().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No puedes borrar un tipo que se esté usando");
        }
        this.userTypeService.deleteUserType(id);
        return ResponseEntity.noContent().build();
    }
}
