package com.sekim.uriseoro.apiController;

import com.sekim.uriseoro.config.enums.BaseURLType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;


/* api 서버와 통신하기 위해 webclient 사용 */

@RestController
@RequestMapping("/user")
public class UserController {

    WebClient webClient = WebClient.builder()
            .baseUrl(BaseURLType.API_SERVER.getUrl())
            .defaultCookie("cookie-name", "cookie-value")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();



    /* 회원가입 */
    @PostMapping("/signup")
    public String signUp(@RequestBody String obj){

        return webClient.post()         // POST method
                .uri("/user/signup")    // baseUrl 이후 uri
                .bodyValue(obj)     // set body value
                .retrieve()                 // client message 전송
                .bodyToMono(String.class)  // body type
                .block();                   // await

    }

    /* 로그인 */
    @PostMapping("/login")
    public String login(@RequestBody String obj){

        return webClient.post()         // POST method
                .uri("/user/login")    // baseUrl 이후 uri
                .bodyValue(obj)     // set body value
                .retrieve()                 // client message 전송
                .bodyToMono(String.class)  // body type
                .block();                   // await

    }


}
