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
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/media")
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

    @GetMapping("/after")
    public ResponseEntity<List<Media>> getByAfterReleaseDate(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        List<Media> mediaList = this.mediaService.getMediaAfterDate(startDate);
        return ResponseEntity.ok(mediaList);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<Media> newMedia(@RequestBody Media media) {
        Media savedMedia = this.mediaService.save(media);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMedia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMedia(
            @PathVariable long id,
            @RequestBody Media media) {
        this.mediaService.updateMedia(id, media);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable long id) {
        this.mediaService.deleteMedia(id);
        return ResponseEntity.noContent().build();
    }
}