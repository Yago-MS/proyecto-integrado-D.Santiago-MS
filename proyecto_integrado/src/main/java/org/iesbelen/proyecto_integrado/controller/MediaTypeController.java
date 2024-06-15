package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Media;
import org.iesbelen.proyecto_integrado.domain.MediaType;
import org.iesbelen.proyecto_integrado.service.MediaTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/mediaType")
public class MediaTypeController {

    private final MediaTypeService mediaTypeService;

    @Autowired
    public MediaTypeController(MediaTypeService mediaTypeService) {
        this.mediaTypeService = mediaTypeService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<MediaType>> all() {
        log.info("fetching media types");
        List<MediaType> mediaTypes = this.mediaTypeService.all();
        return ResponseEntity.ok(mediaTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MediaType> one(@PathVariable("id") Long id) {
        MediaType mediaType = this.mediaTypeService.one(id);
        if (mediaType != null) {
            return ResponseEntity.ok(mediaType);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping({"", "/"})
    public ResponseEntity<?> newMediaType(@RequestBody MediaType mediaType) {

        if(mediaTypeService.findByName(mediaType.getName()) != null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ese nombre ya está en uso");
        }
        MediaType savedMediaType = this.mediaTypeService.save(mediaType);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMediaType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMediaType(
            @PathVariable long id,
            @RequestBody MediaType mediaType) {
        if(mediaTypeService.findByName(mediaType.getName()) != null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ese nombre ya está en uso");
        }

        this.mediaTypeService.updateMediaType(id, mediaType);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMediaType(@PathVariable long id) {
        if(!mediaTypeService.one(id).getMedias().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No puedes borrar un tipo que se esté usando");
        }
        this.mediaTypeService.deleteMediaType(id);
        return ResponseEntity.noContent().build();
    }
}
