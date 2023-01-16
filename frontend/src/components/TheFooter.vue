<template>
    <footer>
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'home', params: {} }">
        <img alt="Vue logo" src="../assets/logo.png">
      </router-link>
      <span class="attribution">
        An interactive learning project from
        <a rel="noopener noreferrer" target="blank" href="https://thinkster.io"
          >Thinkster</a
        >. Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
</template>

<style scoped>
  img {
  width: 106px;
  height: 22px;
  left: 370px;
  }
</style>
