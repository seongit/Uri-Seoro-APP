<template>
  <!--eslint-disable-->
  <div class="container page">
    <div>
      <!--메인 컨텐츠 영역-->
      <div>
        <!--사용자 관리 상단바-->
        <div class="row">
          <div class="col-md-9">
            <h2>새 프로젝트</h2>
          </div>
        </div> 

        <the-project-form></the-project-form>

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

<style scoped>

.col-md-1 {
  padding-left: 0px;
}

.col-sm-4 span{
  font-size: 12px;
}

.bottomBtn-area {
  display: flex;
  margin-top: 0.5%;
}
.bottomBtn {
  margin:auto;
}

.bottomBtn button{
  margin-right: 10px;
}


</style>