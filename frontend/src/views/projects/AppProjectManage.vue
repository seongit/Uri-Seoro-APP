<template>
  <!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu></the-main-menu>

    <div class="container page">

      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-11 top-bar">
          <!--서브 메뉴-->
          <the-sub-menu></the-sub-menu>
        </div>
      </div>

      <!--메인 컨텐츠 영역-->
      <the-project-form></the-project-form>

      </div>

  </div>
  
</template>

<script>
/* eslint-disable */
import TheMainMenu from '@/components/TheMainMenu.vue';
import TheProjectForm from '@/components/TheProjectForm.vue';
import TheSubMenu from '@/components/TheSubMenu.vue';


export default {
  components : {TheMainMenu,TheProjectForm, TheSubMenu},
  
}
</script>

<style scoped>

.col-md-11 {
  max-width: 98.5%;
}

</style>