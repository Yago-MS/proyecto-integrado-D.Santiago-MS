package org.iesbelen.proyecto_integrado.service;


import org.iesbelen.proyecto_integrado.domain.MediaType;
import org.iesbelen.proyecto_integrado.exception.MediaTypeNotFoundException;
import org.iesbelen.proyecto_integrado.repository.MediaTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MediaTypeService {

    private final MediaTypeRepository mediaTypeRepository;

    public MediaTypeService(MediaTypeRepository mediaTypeRepository) {
        this.mediaTypeRepository = mediaTypeRepository;
    }

    public List<MediaType> all() {
        return this.mediaTypeRepository.findAll();
    }

    public MediaType save(MediaType mediaType) {
        return this.mediaTypeRepository.save(mediaType);
    }

    public MediaType one(Long id) {
        return this.mediaTypeRepository.findById(id)
                .orElseThrow(() -> new MediaTypeNotFoundException(id));
    }

    public void deleteMediaType(long id){
        this.mediaTypeRepository.findById(id).orElseThrow(() -> new MediaTypeNotFoundException(id));
        this.mediaTypeRepository.deleteById(id);
    }

    public void updateMediaType(long id, MediaType mediaType){
        this.mediaTypeRepository.findById(id).orElseThrow(() -> new MediaTypeNotFoundException(id));
        this.mediaTypeRepository.save(mediaType);
    }
}
