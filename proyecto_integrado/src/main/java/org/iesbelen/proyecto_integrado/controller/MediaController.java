package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Media;
import org.iesbelen.proyecto_integrado.service.MediaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/media")
public class MediaController {
    private final MediaService mediaService;

    public MediaController(MediaService mediaService){
        this.mediaService = mediaService;
    }

    @GetMapping({"", "/"})
    public List<Media> all(){
        log.info("fetching media");
        return this.mediaService.all();
    }

    @GetMapping("/{id}")
    public Media one(@PathVariable("id") Long id){
        return this.mediaService.one(id);
    }

    @GetMapping("/after")
    public List<Media> getByAfterReleaseDate(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate){
        return this.mediaService.getMediaAfterDate(startDate);
    }

    @PostMapping({"", "/"})
    public Media newMedia(@RequestBody Media media) {
        return this.mediaService.save(media);
    }

    @PutMapping("/{id}")
    public void updateMedia(
            @PathVariable long id,
            @RequestBody Media media){
        this.mediaService.updateMedia(id, media);
    }

    @DeleteMapping("/{id}")
    public void deleteMedia(@PathVariable long id){
        this.mediaService.deleteMedia(id);
    }

}
