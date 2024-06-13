package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Score;
import org.iesbelen.proyecto_integrado.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/score")
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

    @GetMapping({ "/top"})
    public ResponseEntity<List<Score>> top() {
        log.info("fetching top 10 scores");
        List<Score> scores = this.scoreService.all();

        scores = scores.stream()
                .sorted((s1, s2) -> Long.compare(s2.getScore(), s1.getScore()))
                .limit(10)
                .collect(Collectors.toList());
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
