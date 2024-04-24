package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Media;
import org.iesbelen.proyecto_integrado.service.MediaService;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping({"", "/"})
    public Media newMedia(@RequestBody Media media){
        return this.mediaService.save(media);
    }


}
