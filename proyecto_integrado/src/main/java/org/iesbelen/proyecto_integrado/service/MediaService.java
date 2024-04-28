package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Media;
import org.iesbelen.proyecto_integrado.exception.MediaNotFoundException;
import org.springframework.stereotype.Service;
import org.iesbelen.proyecto_integrado.repository.MediaRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public List<Media> all() {
        return this.mediaRepository.findAll();
    }

    public Media save(Media media) {
        return this.mediaRepository.save(media);
    }

    public Media one(Long id) {
        return this.mediaRepository.findById(id)
                .orElseThrow(() -> new MediaNotFoundException(id));
    }

    public List<Media> getMediaAfterDate(LocalDate dateAfter){
        return this.mediaRepository.findByReleaseDateAfter(dateAfter);
    }

    public void deleteMedia(long id){
        this.mediaRepository.findById(id).orElseThrow(() -> new MediaNotFoundException(id));
        this.mediaRepository.deleteById(id);
    }

    public void updateMedia(long id, Media media){
        this.mediaRepository.findById(id).orElseThrow(() -> new MediaNotFoundException(id));
        this.mediaRepository.save(media);
    }
}
