package org.iesbelen.proyecto_integrado.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserTypeNotFoundException extends RuntimeException {
    public UserTypeNotFoundException(String message) {
        super(message);
    }

}
