package com.example.orchestrator;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class MessageService {
    private final WebClient webClient;
    private final String greetingServiceUrl;

    public MessageService(
            WebClient webClient,
            @Value("${clients.greeting-service.url}") String greetingServiceUrl) {
        this.webClient = webClient;
        this.greetingServiceUrl = greetingServiceUrl;
    }

    public Mono<MessageResponse> getMessage(String name) {
        return webClient.get()
                .uri(greetingServiceUrl + "/api/greeting?name={name}", name)
                .retrieve()
                .bodyToMono(MessageResponse.class)
                .switchIfEmpty(Mono.error(
                        new IllegalStateException("greeting-service вернул пустой ответ")));
    }
}
