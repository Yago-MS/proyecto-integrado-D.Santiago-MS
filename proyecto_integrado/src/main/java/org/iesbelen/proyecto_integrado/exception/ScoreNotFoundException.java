package org.iesbelen.proyecto_integrado.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ScoreNotFoundException extends RuntimeException{
    public ScoreNotFoundException(Long id) {
        super("Not found Score with id: " + id);
    }

}
