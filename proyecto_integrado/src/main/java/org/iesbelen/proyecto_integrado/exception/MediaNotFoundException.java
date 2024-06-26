package org.iesbelen.proyecto_integrado.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MediaNotFoundException extends RuntimeException{
    public MediaNotFoundException(Long id) {
        super("Not found Media with id: " + id);
    }
}
