const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  // spring boot를 사용할 경우 outputDir를 이렇게 설정해야함
  // outputDir : "../src/main/resources/static", 

  // npm run serve 개발 진행시에 포트가 다르기때문에 프록시 설정
   devServer: {
     //proxy: 'http://localhost:8081' // api 서버 포트 번호로 지정
     proxy: {
      '/user*':{
          target : 'http://100.0.0.157:10180', // 레드마인 api 주소 및 포트
          changeOrigin:true,  
          ws : false
      }
  }
  },

  // nginx reverse proxy 설정 시 다음과 같이 구성함
//   devServer: {
      // proxy: {
      //     '/':{
      //         "target":'http://100.0.0.157:30180', // 레드마인 api 주소 및 포트
      //         "pathRewrite":{'^/':''},
      //         "changeOrigin":true,  
      //     }
      // }
//     }

});