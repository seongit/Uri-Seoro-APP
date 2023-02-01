<template>
  <!--eslint-disable-->


  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <h1>확인</h1>
        <fieldset class="form-group">
              <div class="confirm-delete border-radius">
                <div class="confirm-delete-area">
                  <div class="text-xs-center">
                    <br>
                    <p>
                      프로젝트를 삭제하시겠습니까? 프로젝트를 삭제하면 복구할 수 없습니다.
                    </p>
                    <p>
                      삭제를 원하시면 프로젝트명을 입력해주세요
                    </p>

                    <div>
                      <div class="row" style="margin:auto"  >
                          <label class="col-md-5" for="deleteProjectName"><b>~~~프로젝트명~~~~</b>
                            <input
                              class="form-control border-radius"
                              type="text"
                              placeholder="프로젝트명"
                            />
                        </label>
                        <!--관리자가 프로젝트의 ID 입력 시 해당 버튼 활성화-->
                        <div class="btn-group" style="margin-top:25px">
                            <button @click="projectsListPage" type="button" class="btn btn-danger" >삭제</button>
                        </div>
                     </div>
                    </div>
                  </div>
                </div>
              </div>
        </fieldset>

        <div style="display:flex">
            <div style="margin:auto">
              <div class="btn-group">
                <button @click="projectsListPage" type="button" class="btn" >취소</button>
              </div>
            </div>
        </div>

      </div>
      <!--사이드바-->
      <div class="col-md-3">
        <the-admin-sidebar></the-admin-sidebar>
      </div>
    </div>
  </div>

</template>

<script>
/* eslint-disable */
import TheAdminSidebar from '@/components/TheAdminSidebar.vue';

export default {

  components : {TheAdminSidebar},
  data(){
    return {
      deleteProjectName : ''
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

<style scoped>

.confirm-delete {
  background: #F3F3F3;
  height: 200px;
  display: flex;
  border-radius: 4px;
}

.confirm-delete-area {
  width: 80%;
  height: 100%;
  margin: auto;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: 18px;
}

.row {
  justify-content:center; 
  align-items : center;
}

</style>