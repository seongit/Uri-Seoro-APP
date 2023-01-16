<template>
  <div class="home">
    <HelloWorld msg="Welcome to 우리 서로"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/WelcomePage.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
};
</script>
