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
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

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
    public ResponseEntity<User> newUser(@RequestBody User user) {
        User savedUser = this.userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable long id,
            @RequestBody User user) {
        this.userService.updateUser(id, user);
        return ResponseEntity.ok(userService.one(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        this.userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
