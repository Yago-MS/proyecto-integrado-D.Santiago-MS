package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.proyecto_integrado.domain.Media;
import org.iesbelen.proyecto_integrado.domain.MediaType;
import org.iesbelen.proyecto_integrado.service.MediaTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/mediaType")
public class MediaTypeController {
    private final MediaTypeService mediaTypeService;
    public MediaTypeController(MediaTypeService mediaTypeService){
        this.mediaTypeService = mediaTypeService;
    }

    @GetMapping({"", "/"})
    public List<MediaType> all(){
        log.info("fetching media types");
        return this.mediaTypeService.all();
    }

    @GetMapping("/{id}")
    public MediaType one(@PathVariable("id") Long id){
        return this.mediaTypeService.one(id);
    }

    @PostMapping({"", "/"})
    public MediaType newMediaType(@RequestBody MediaType mediaType) {
        return this.mediaTypeService.save(mediaType);
    }

    @PutMapping("/{id}")
    public void updateMediaType(
            @PathVariable long id,
            @RequestBody MediaType mediaType){
        this.mediaTypeService.updateMediaType(id, mediaType);
    }
    @DeleteMapping("/{id}")
    public void deleteMediaType(@PathVariable long id){
        this.mediaTypeService.deleteMediaType(id);
    }
}
