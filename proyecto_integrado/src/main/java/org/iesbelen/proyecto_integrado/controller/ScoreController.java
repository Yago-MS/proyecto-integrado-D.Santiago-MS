package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Score;
import org.iesbelen.proyecto_integrado.service.ScoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/score")
public class ScoreController {

    private final ScoreService scoreService;
    public ScoreController(ScoreService scoreService){
        this.scoreService = scoreService;
    }

    @GetMapping({"", "/"})
    public List<Score> all(){
        log.info("fetching users");
        return this.scoreService.all();
    }

    @GetMapping("/{id}")
    public Score one(@PathVariable("id") Long id){
        return this.scoreService.one(id);
    }

    @PostMapping({"", "/"})
    public Score newUser(@RequestBody Score score) {
        return this.scoreService.save(score);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable long id){
        this.scoreService.deleteScore(id);
    }
}
