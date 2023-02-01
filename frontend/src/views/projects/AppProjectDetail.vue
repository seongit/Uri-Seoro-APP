<template>
<!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu></the-main-menu>
    <div class="container page">

      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-9 top-bar">
          <p>개요</p>
        </div>
    
        <!--관리자만 [새프로젝트] [관리] 버튼 보여지도록 구현 필요-->
          <div class="col-md-3">
            <div class="row" style="float:right">
              <div class="btn">
                <router-link :to="{name:'projectCreate'}">
                  <font-awesome-icon icon="fa-solid fa-gear" /> 관리
                </router-link>
              </div>
            </div>
        </div>
      </div>
      
      <!--프로젝트 설명-->
      <div>
        프로젝트 설명 ~ 
      </div>

    </div>

  </div>
</template>

<script>
/* eslint-disable */ 
import TheMainMenu from '@/components/TheMainMenu.vue';

export default {
  components : {TheMainMenu},
}
</script>

<style>

  .top-bar {
    font-size: 20px;
    font-weight: bold;
  }

</style>