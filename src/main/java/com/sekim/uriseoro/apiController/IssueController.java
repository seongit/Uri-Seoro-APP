package com.sekim.uriseoro.apiController;

import com.sekim.uriseoro.config.enums.BaseURLType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@RestController
@RequestMapping("/issues")
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

    @GetMapping("/sq/custome")
    public String sqCustom(){
        //System.out.println("test");
        log.info("test");
        return "소나큐브 sonarlint 플러그인";
    }
}
