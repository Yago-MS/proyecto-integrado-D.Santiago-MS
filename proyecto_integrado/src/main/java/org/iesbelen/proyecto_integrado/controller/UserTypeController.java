package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.UserType;
import org.iesbelen.proyecto_integrado.service.UserTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/userType")
public class UserTypeController {

    private final UserTypeService userTypeService;
    public UserTypeController(UserTypeService userTypeService){
        this.userTypeService = userTypeService;
    }

    @GetMapping({"", "/"})
    public List<UserType> all(){
        log.info("fetching users");
        return this.userTypeService.all();
    }

    @GetMapping("/{id}")
    public UserType one(@PathVariable("id") Long id){
        return this.userTypeService.one(id);
    }

    @PostMapping({"", "/"})
    public UserType newUserType(@RequestBody UserType userType) {
        return this.userTypeService.save(userType);
    }

    @PutMapping("/{id}")
    public void updateUserType(
            @PathVariable long id,
            @RequestBody UserType userType){
        this.userTypeService.updateUserType(id, userType);
    }
    @DeleteMapping("/{id}")
    public void deleteUserType(@PathVariable long id){
        this.userTypeService.deleteUserType(id);
    }
}
