package org.iesbelen.proyecto_integrado.service;

import org.iesbelen.proyecto_integrado.domain.Media;
import org.iesbelen.proyecto_integrado.domain.MediaType;
import org.iesbelen.proyecto_integrado.exception.MediaNotFoundException;
import org.iesbelen.proyecto_integrado.exception.MediaTypeNotFoundException;
import org.springframework.stereotype.Service;
import org.iesbelen.proyecto_integrado.repository.MediaRepository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class MediaService {

    private static final Logger LOGGER = Logger.getLogger(MediaService.class.getName());


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

    public List<Media> getMediaAfterYear(int startYear) {
        List<Media> allMedia = mediaRepository.findAll();
        return allMedia.stream()
                .filter(media -> media.getReleaseYear() >= startYear)
                .collect(Collectors.toList());
    }

    public List<Media> getMediaAfterYearAndType(int startYear, int[] types) {
        List<Media> allMedia = mediaRepository.findAll();
        return allMedia.stream()
                .filter(media -> media.getReleaseYear() >= startYear && Arrays.stream(types).anyMatch(item -> item == media.getTypeId()
                )).collect(Collectors.toList());
    }

    public void deleteMedia(long id){
        this.mediaRepository.findById(id).orElseThrow(() -> new MediaNotFoundException(id));
        this.mediaRepository.deleteById(id);
    }

    public void updateMedia(long id, Media media){
        this.mediaRepository.findById(id).orElseThrow(() -> new MediaNotFoundException(id));
        this.mediaRepository.save(media);
    }

    public Media findByName(String name){
        return mediaRepository.findByName(name);
    }
}
