package org.accenture.taskmanager.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    String allowed = System.getenv().getOrDefault("ALLOWED_ORIGINS", "http://localhost:5173");

    registry.addMapping("/api/**")
        .allowedOrigins(allowed.split(","))
        .allowedMethods("GET","POST","PUT","DELETE")
        .allowedHeaders("*");
  }
}
