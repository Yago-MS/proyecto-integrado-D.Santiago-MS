package org.iesbelen.proyecto_integrado.exception;

public class MediaNotFoundException extends RuntimeException{
    public MediaNotFoundException(Long id) {
        super("Not found Media with id: " + id);
    }
}
