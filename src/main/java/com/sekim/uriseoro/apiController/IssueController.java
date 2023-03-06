package com.sekim.uriseoro.apiController;

import com.sekim.uriseoro.config.enums.BaseURLType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

/* 테스트 중 */

@RestController
@RequestMapping("/test")
public class IssueController {

    WebClient webClient = WebClient.builder()
            .baseUrl(BaseURLType.API_SERVER.getUrl())
            .defaultCookie("cookie-name", "cookie-value")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();


    @GetMapping("/issues.json")
    public String save(){
        return webClient.get().uri("/issues.json")
                .retrieve()                 // client message 전송
                .bodyToMono(String.class)  // body type
                .block();                   // await
    }


}
