<template>
  <!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu :name="name"></the-main-menu>

    <div class="container page">

      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-11 top-bar">
          <!--서브 메뉴-->
          <the-sub-menu ></the-sub-menu>
        </div>
      </div>

      <!--메인 컨텐츠 영역-->
      <the-project-form :resObj="resObj"></the-project-form>

      </div>

  </div>
  
</template>

<script>
/* eslint-disable */
import TheMainMenu from '@/components/TheMainMenu.vue';
import TheProjectForm from '@/components/TheProjectForm.vue';
import TheSubMenu from '@/components/TheSubMenu.vue';

// api 호출
import apiProject from '../../api/project.js';

export default {
  components : {TheMainMenu,TheProjectForm, TheSubMenu},
  
  data(){

    return {
      name : '',
      // prop으로 전달할 데이터 
         resObj : {
          name : "",
          identifier : "",
          description : "",
          is_public : false,
          is_public_checked : false,
      },
    }
  },

  mounted(){
    // 사용자 상세 정보 조회
    if(this.$route.params.id > 0){
      this.getProjectDetail();
    }

  },

  methods : {

    // 프로젝트 상세 조회
    async getProjectDetail(){

      apiProject.getProjectDetail(this.$route.params.id).then((response) => {
      console.log(response);

      let resObj = response.data.project;

      this.name = resObj.name;

      this.resObj.name = resObj.name;
      this.resObj.description = resObj.description;
      this.resObj.identifier = resObj.identifier;

      if(resObj.is_public == true){
        this.resObj.is_public = true;
        this.resObj.is_public_checked = true;
      }

      // 식별자 수정 불가 
      document.getElementById('inputIdentifier').setAttribute("disabled",true);


      }).catch((error) => {
        console.log(error);
      })

    },

  }

}
</script>

<style scoped>

.col-md-11 {
  max-width: 98.5%;
}

</style>