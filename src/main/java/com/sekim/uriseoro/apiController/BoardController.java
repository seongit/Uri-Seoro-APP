package com.sekim.uriseoro.apiController;

import com.sekim.uriseoro.config.enums.BaseURLType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequestMapping("/board")
public class BoardController {


    WebClient webClient = WebClient.builder()
            .baseUrl(BaseURLType.API_SERVER.getUrl())
            .defaultCookie("cookie-name", "cookie-value")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();


    /* 게시글 작성 */
    @PostMapping("/write")
    public String save(@RequestBody String obj){
        return webClient.post().uri("/board/write")
                .bodyValue(obj)     // set body value
                .retrieve()                 // client message 전송
                .bodyToMono(String.class)  // body type
                .block();                   // await
    }



    /* 게시글 전체 목록 조회 */
    @GetMapping("/read")
    public String read(){
        return webClient.get().uri("/board/read")
                .retrieve()                 // client message 전송
                .bodyToMono(String.class)  // body type
                .block();                   // await
    }

    /* 게시글 상세 조회 */
    @GetMapping("/read/{id}")
    public String read(@PathVariable Long id){
        return webClient.get().uri("/board/read/"+id)
                .retrieve()                 // client message 전송
                .bodyToMono(String.class)  // body type
                .block();                   // await
    }


    /* 게시글 수정 */
    @PutMapping("/update/{id}")
    public String update(@PathVariable Long id,@RequestBody String obj){
        return webClient.put().uri("/board/update/"+id)
                .bodyValue(obj)     // set body value
                .retrieve()                 // client message 전송
                .bodyToMono(String.class)  // body type
                .block();                   // await
    }

    /**
     * 테스트 필요
     */

    /* 게시글 삭제 delYn의 값을 변경한다. (delYn\ default value N) */
    @PatchMapping("/delete/{id}")
    public String delete(@PathVariable Long id){

        System.out.println("app server " + id);

        return webClient.patch().uri("/board/delete/"+id)
                .retrieve()                 // client message 전송
                .bodyToMono(String.class)  // body type
                .block();                   // await
    }



}
