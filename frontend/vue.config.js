const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir : "../src/main/resources/static",
   // npm run serve 개발 진행시에 포트가 다르기때문에 프록시 설정
  //  devServer: {
  //   // proxy: 'http://localhost:8080' // -> 로컬에서 테스트 하면 됨 
  //    proxy: 'http://localhost:8081' 
  //   // proxy : 'http://192.168.50.101:8080'
  //   // proxy : 'http://100.0.0.157:10180' // -> localhost:8081 시 성공 
  // },

  // devServer: {
  //   proxy: {
  //     '/user':{
  //       //"target":'http://100.0.0.157:22380', -> 에러
  //       "target":'http://locathost:8081',
  //       "changeOrigin":true,
  //       "secure":false
  //     }
  //   }
  // }
});