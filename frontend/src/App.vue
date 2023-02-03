<template>
  <div id="app">
    <The-Header></The-Header>
    <div></div>
    <router-view></router-view>
    <The-Footer></The-Footer>
  </div>
</template>

<script>

import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  /* eslint-disable */
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },

  /* session 유지 테스트  시작 */
  data() {
    return {
    }
  },

  computed: {
    
  }

  /* session 유지 테스트 종료  */
};

</script>

<style>
  @import './main.css';
</style>