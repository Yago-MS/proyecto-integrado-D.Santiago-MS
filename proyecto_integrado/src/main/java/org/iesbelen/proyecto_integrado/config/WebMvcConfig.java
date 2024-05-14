package org.iesbelen.proyecto_integrado.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/medias/**")
                .addResourceLocations("file:media/");
        registry.addResourceHandler("/user/**")
                .addResourceLocations("file:user");
    }
}
