package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Score;
import org.iesbelen.proyecto_integrado.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/score")
public class ScoreController {

    private final ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<Score>> all() {
        log.info("fetching scores");
        List<Score> scores = this.scoreService.all();
        return ResponseEntity.ok(scores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Score> one(@PathVariable("id") Long id) {
        Score score = this.scoreService.one(id);
        if (score != null) {
            return ResponseEntity.ok(score);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping({"", "/"})
    public ResponseEntity<Score> newScore(@RequestBody Score score) {
        Score savedScore = this.scoreService.save(score);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedScore);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScore(@PathVariable long id) {
        this.scoreService.deleteScore(id);
        return ResponseEntity.noContent().build();
    }
}
