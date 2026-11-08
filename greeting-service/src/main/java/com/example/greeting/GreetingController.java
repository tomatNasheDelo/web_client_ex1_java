package com.example.greeting;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {
    @GetMapping("/api/greeting")
    public GreetingResponse greeting(@RequestParam(defaultValue = "мир") String name) {
        return new GreetingResponse("Привет, " + name + "! Ответ от greeting-service.");
    }
}
