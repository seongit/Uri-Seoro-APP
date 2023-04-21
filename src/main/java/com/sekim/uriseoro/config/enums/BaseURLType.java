package com.sekim.uriseoro.config.enums;


import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 *
 */
@Getter
public enum BaseURLType {

    /* 로컬 테스트 시 사용*/
    APP_SERVER("http://localhost:8080"),
//    API_SERVER("http://localhost:8081");

    // 테스트 - 레드마인 api 호출 가능 여부 확인
    API_SERVER("http://100.0.0.157:30180");

    /* 배포시 사용
    APP_SERVER("http://100.0.0.157:22380"),

    // 배포시 에러 발생
    API_SERVER("http://192.168.50.101:8080");*/

    // API_SERVER("http://100.0.0.157:10180");
    private final String url;

     BaseURLType(String url) {
        this.url = url;
    }


}
