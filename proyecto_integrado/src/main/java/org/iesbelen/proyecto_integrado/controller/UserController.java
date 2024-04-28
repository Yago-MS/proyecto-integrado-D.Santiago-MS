package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.MediaType;
import org.iesbelen.proyecto_integrado.domain.User;
import org.iesbelen.proyecto_integrado.service.MediaTypeService;
import org.iesbelen.proyecto_integrado.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping({"", "/"})
    public List<User> all(){
        log.info("fetching users");
        return this.userService.all();
    }

    @GetMapping("/{id}")
    public User one(@PathVariable("id") Long id){
        return this.userService.one(id);
    }

    @PostMapping({"", "/"})
    public User newUser(@RequestBody User user) {
        return this.userService.save(user);
    }

    @PutMapping("/{id}")
    public void updateUser(
            @PathVariable long id,
            @RequestBody User user){
        this.userService.updateUser(id, user);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable long id){
        this.userService.deleteUser(id);
    }
}
