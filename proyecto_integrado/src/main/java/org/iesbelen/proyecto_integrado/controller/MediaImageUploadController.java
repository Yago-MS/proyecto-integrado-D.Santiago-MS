package org.iesbelen.proyecto_integrado.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api")
public class MediaImageUploadController {
    @PostMapping("/uploadMedia")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("no file uploaded");
        }

        try {
            String filePath = System.getProperty("user.dir") + "/src/main/frontend/app-mediaGuesser/src/assets/medias/" + file.getOriginalFilename().replaceAll(" ", "-");
            file.transferTo(new File(filePath));
            return ResponseEntity.ok().body("");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }
}
