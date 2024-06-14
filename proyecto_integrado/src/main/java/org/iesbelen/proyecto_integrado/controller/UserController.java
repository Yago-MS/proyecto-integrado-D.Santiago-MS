package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.MediaType;
import org.iesbelen.proyecto_integrado.domain.User;
import org.iesbelen.proyecto_integrado.service.MediaTypeService;
import org.iesbelen.proyecto_integrado.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    private String checkUser(User user){
        if(userService.findByName(user.getName()) != null){
            return  "El nombre de usuario ya existe";
        } else if (user.getCredential().length() < 4) {
            return "La contraseña es demasiado corta";
        } else if (user.getName().length() < 4) {
            return "Tu nombre es demasiado corto";
        } else {
            return null;
        }
    }

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<User>> all() {
        log.info("fetching users");
        List<User> userList = this.userService.all();
        return ResponseEntity.ok(userList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> one(@PathVariable("id") Long id) {
        User user = this.userService.one(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping({"", "/"})
    public ResponseEntity<?> newUser(@RequestBody User user) {

        if(checkUser(user)!= null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(checkUser(user));
        }

        User savedUser = this.userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable long id,
            @RequestBody User user) {
        if(user.getCredential() != null && user.getCredential().length() < 4){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La contraseña es demasiado corta");
        }
        if(user.getName() != null && user.getName().length() < 4){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El nombre es demasiado corto");
        }

        this.userService.updateUser(id, user);
        return ResponseEntity.ok(userService.one(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        this.userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
