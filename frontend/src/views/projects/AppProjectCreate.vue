<template>
  <!--eslint-disable-->
  <div class="container page">
    <div>
      <!--메인 컨텐츠 영역-->
      <div>
        <!--페이지 상단바-->
        <div class="row">
          <div class="col-md-9">
            <h2>새 프로젝트</h2>
          </div>
        </div> 

        <the-project-form :resObj="resObj"></the-project-form>

      </div>
    
    </div>
      
  </div>

</template>

<script>
/* eslint-disable */

import TheAdminSidebar from '@/components/TheAdminSidebar.vue';
import TheProjectForm from '@/components/TheProjectForm.vue';

export default {
  components : {TheAdminSidebar,TheProjectForm},

  data( ){
    return {
      resObj : {
          name : "",
          identifier : "",
          description : "",
          is_public : false,
          is_public_checked : false,
      },
    }
  },

  methods : {
    // 관리자 목록으로 이동
    projectsListPage(){
      this.$router.push({
        path: '/admin/projects'
      })
    }
  }

}
</script>
