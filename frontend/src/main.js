/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import "./fontAwesomeIcon.js"; // fontAwesomeIcon.js 불러옴

/*VueSimpleContextMenu 컴포넌트 등록*/
import VueSimpleContextMenu from 'vue-simple-context-menu';
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css';
Vue.component('vue-simple-context-menu',VueSimpleContextMenu);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

window.Kakao.init('d3e0ad7625b035449b15f3b5850aecb0'); // 사용하려는 앱의 JavaScript 키 입력
