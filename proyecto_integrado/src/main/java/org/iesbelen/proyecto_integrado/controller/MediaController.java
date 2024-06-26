package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Media;
import org.iesbelen.proyecto_integrado.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/media")
public class MediaController {

    private final MediaService mediaService;

    @Autowired
    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<List<Media>> all() {
        log.info("fetching media");
        List<Media> mediaList = this.mediaService.all();
        return ResponseEntity.ok(mediaList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Media> one(@PathVariable("id") Long id) {
        Media media = this.mediaService.one(id);
        if (media != null) {
            return ResponseEntity.ok(media);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/afterAndType")
    public ResponseEntity<List<Media>> getByAfterReleaseYearAndByType(@RequestParam("startYear") int startYear, @RequestParam("types") int[] types) {
        List<Media> mediaList = this.mediaService.getMediaAfterYearAndType(startYear, types);
        return ResponseEntity.ok(mediaList);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<?> newMedia(@RequestBody Media media) {
        if(mediaService.findByName(media.getName()) != null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El nombre ya está en uso");
        }
        if(media.getReleaseYear() < 1895){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La fecha debe ser mayor a 1895");
        }

        Media savedMedia = this.mediaService.save(media);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMedia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMedia(
            @PathVariable long id,
            @RequestBody Media media) {
        if(mediaService.findByName(media.getName()) != null && mediaService.findByName(media.getName()).getId() != id){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El nombre ya está en uso");
        }
        if(media.getReleaseYear() < 1895){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La fecha debe ser mayor a 1895");
        }

        this.mediaService.updateMedia(id, media);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable long id) {
        this.mediaService.deleteMedia(id);
        return ResponseEntity.noContent().build();
    }
}