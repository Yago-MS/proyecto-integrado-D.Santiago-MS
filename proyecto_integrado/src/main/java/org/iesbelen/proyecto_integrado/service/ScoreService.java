package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Score;
import org.iesbelen.proyecto_integrado.exception.ScoreNotFoundException;
import org.iesbelen.proyecto_integrado.repository.ScoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;

    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    public List<Score> all() {
        return this.scoreRepository.findAll();
    }

    public Score save(Score score) {
        return this.scoreRepository.save(score);
    }

    public Score one(Long id) {
        return this.scoreRepository.findById(id)
                .orElseThrow(() -> new ScoreNotFoundException(id));
    }

    public void deleteScore(long id){
        this.scoreRepository.findById(id).orElseThrow(() -> new ScoreNotFoundException(id));
        this.scoreRepository.deleteById(id);
    }
}
