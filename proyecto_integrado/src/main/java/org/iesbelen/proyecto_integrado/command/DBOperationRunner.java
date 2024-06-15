package org.iesbelen.proyecto_integrado.command;

import org.iesbelen.proyecto_integrado.domain.*;
import org.iesbelen.proyecto_integrado.repository.MediaRepository;
import org.iesbelen.proyecto_integrado.repository.MediaTypeRepository;
import org.iesbelen.proyecto_integrado.repository.UserRepository;
import org.iesbelen.proyecto_integrado.repository.UserTypeRepository;
import org.iesbelen.proyecto_integrado.service.MediaTypeService;
import org.iesbelen.proyecto_integrado.service.ScoreService;
import org.iesbelen.proyecto_integrado.service.UserService;
import org.iesbelen.proyecto_integrado.service.UserTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DBOperationRunner implements CommandLineRunner {

    @Autowired
    private MediaRepository mediaRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserTypeRepository userTypeRepository;
    @Autowired
    private MediaTypeRepository mediaTypeRepository;
    @Autowired
    private MediaTypeService mediaTypeService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserTypeService userTypeService;

    // 1 -> juego 2 -> serie 3 -> pelicula
    @Override
    public void run(String... args) throws Exception {
        saveMediaTypeIfNotExists(1, "juego");
        saveMediaTypeIfNotExists(2, "serie");
        saveMediaTypeIfNotExists(3, "pelicula");

        saveUserTypeIfNotExists(1, "admin");
        saveUserTypeIfNotExists(2, "player");

        saveUserIfNotExists(1, "admin", "1234", 1, 0L, "default.jpg");
        saveUserIfNotExists(2, "player", "1234", 2, 0L, "default.jpg");


        saveMediaIfNotExist(3, "las chicas del cable", 2, 2017, "las-chicas-del-cable.jpg", 2L);
        saveMediaIfNotExist(4, "verano azul", 2, 1981, "verano-azul.jpg", 2L);
        saveMediaIfNotExist(5, "stranger things", 2, 2016, "stranger-things.jpg", 2L);
        saveMediaIfNotExist(6, "sexo en Nueva York", 2, 1998, "sexo-en-nueva-york.jpg", 2L);
        saveMediaIfNotExist(7, "gambito de dama", 2, 2020, "gambito-de-dama.jpg", 2L);
        saveMediaIfNotExist(8, "miercoles", 2, 2022, "miercoles.jpg", 2L);
        saveMediaIfNotExist(9, "peaky Blinders", 2, 2013, "peaky-blinders.jpg", 2L);
        saveMediaIfNotExist(10, "breaking Bad", 2, 2008, "breaking-bad.jpeg", 2L);
        saveMediaIfNotExist(11, "los goonies", 3, 1985, "los-goonies.jpg", 3L);
        saveMediaIfNotExist(12, "el exorcista", 3, 1975, "el-exorcista.jpg", 3L);
        saveMediaIfNotExist(13, "regreso al futuro", 3, 1985, "regreso-al-futuro.jpg", 3L);
        saveMediaIfNotExist(14, "indiana Jones: busca del arca perdida", 3, 1981, "indiana-jones-el-arca-perdida.jpg", 3L);
        saveMediaIfNotExist(15, "el gigante de hierro", 3, 1999, "el-gigante-de-hierro.jpg", 3L);
        saveMediaIfNotExist(16, "ready player one", 3, 2018, "ready-player-one.jpg", 3L);
        saveMediaIfNotExist(17, "star wars: la amenaza fantasma", 3, 1999, "star-wars-la-amenaza-fantasma.jpg", 3L);
        saveMediaIfNotExist(18, "los gremlins", 3, 1984, "gremlins.jpg", 3L);
        saveMediaIfNotExist(19, "la lego película", 3, 2014, "la-lego-pelicula.jpg", 3L);
        saveMediaIfNotExist(20, "el padrino", 3, 1972, "el-padrino.jpg", 3L);
        saveMediaIfNotExist(21, "god of war", 1, 2005, "god-of-war.jpg", 1L);
        saveMediaIfNotExist(22, "little big planet", 1, 2008, "little-big-planet.jpg", 1L);
        saveMediaIfNotExist(23, "halo: Combat evolved", 1, 2001, "halo-combat-evolved.jpg", 1L);
        saveMediaIfNotExist(24, "lemmings", 1, 1991, "lemmings.jpg", 1L);
        saveMediaIfNotExist(25, "minecraft", 1, 2011, "minecraft.jpg", 1L);
        saveMediaIfNotExist(26, "asura's wrath", 1, 2012, "asuras-wrath.jpg", 1L);
        saveMediaIfNotExist(27, "grand theft auto", 1, 2013, "grand-thef-auto.jpg", 1L);
        saveMediaIfNotExist(28, "ace attorney", 1, 2001, "ace-attorney.jpg", 1L);

    }

    private void saveMediaIfNotExist(int id, String name, int type, int year, String image, Long mediaTypeId) {
        if (!mediaRepository.existsByName(name)) {
            Media media = new Media(id, name, type, year, image, mediaTypeService.one(mediaTypeId));
            mediaRepository.save(media);
        }
    }
    private void saveUserIfNotExists(int id, String name, String credential, int typeId, Long maxScore, String imageUrl){
        if(!(userRepository.existsByName(name))){
            List<Score> scores = new ArrayList<>();
            User user = new User(id, name, credential, typeId, maxScore, imageUrl, userTypeService.one((long) typeId), scores);
            userRepository.save(user);
        }
    }
    private void saveUserTypeIfNotExists(int id, String name){
        if(!(userTypeRepository.existsByName(name))){
            List<User> users = new ArrayList<>();
            UserType userType = new UserType(id, name, users);
            userTypeRepository.save(userType);
        }
    }
    private void saveMediaTypeIfNotExists(int id, String name){
        if(!(mediaTypeRepository.existsByName(name))){
            List<Media> medias = new ArrayList<>();
            MediaType mediaType = new MediaType(id, name, medias);
            mediaTypeRepository.save(mediaType);
        }
    }
}

