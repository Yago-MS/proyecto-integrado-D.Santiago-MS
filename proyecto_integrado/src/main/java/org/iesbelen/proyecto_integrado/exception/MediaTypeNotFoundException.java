package org.iesbelen.proyecto_integrado.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MediaTypeNotFoundException extends RuntimeException{
    public MediaTypeNotFoundException(Long id) {
        super("Not found Media type with id: " + id);
    }
}