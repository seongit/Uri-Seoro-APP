<template>
  <!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu></the-main-menu>

    <div class="container page">

      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-9 top-bar">
          <h3>설정</h3>
        </div>
      </div>

      <!--메인 컨텐츠 영역-->
      <div>
      
      </div>

      <the-project-form></the-project-form>

      </div>

  </div>
  
</template>

<script>
/* eslint-disable */
import TheMainMenu from '@/components/TheMainMenu.vue';
import TheProjectForm from '@/components/TheProjectForm.vue';

export default {
  components : {TheMainMenu,TheProjectForm},
  
}
</script>