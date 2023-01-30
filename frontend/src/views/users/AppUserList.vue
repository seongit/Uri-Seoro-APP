<template>
  <!--eslint-disable-->
  <div class="container page">
    <div class="row">
      <div class="col-md-9">
          <h2>사용자</h2>
          
          <div style="float:right" class="row">
            <div class="col-md-9">
              <router-link :to="{name:'userCreate'}">
                <img alt="new User" src="../../../public/images/new_user_icon.png">
              </router-link>
            </div>
          </div>
          
          <!--사용자 검색 영역-->

          <!--사용자 리스트 -->
          <table class="table table-hover">
              <thead>
              <tr>
                  <th style="width:10%;">로그인</th>
                  <th style="width:10%">이름</th>
                  <th style="width:10%">성</th>
                  <th style="width:15%">메일</th>
                  <th style="width:10%">관리자</th>
                  <th style="width:15%">등록일시</th>
                  <th style="width:20%">상태관리</th>
              </tr>
              </thead>
              <tbody>
                  <!-- eslint-disable-->
                  <tr @click="rowClicked(1)">
                      <td >
                          admin
                      </td>
                      <td>Redmine</td>
                      <td>admin</td>
                      <td>admin@okestro.com</td>
                      <!--관리자 여부 아이콘으로 표시-->
                      <td>               
                        <img src="../../../public/images/check.png" style="width:40%">
                      </td>
                      <td>2023/01/24 10:03</td>
                      <!--사용자 계정 관리 버튼-->
                      <td>
                        <!-- 사용자 계정 잠금 구현 필요
                        <div class="btn btn-sm">
                          <router-link :to="{}">
                            <img src="../../../public/images/lock.png">
                          </router-link>
                        </div>
                        -->
                        <!--사용자 삭제 -->
                        <div class="btn btn-sm"> 
                          <router-link :to="{name:'userDelete'}">
                            <img src="../../../public/images/trash.png" >
                          </router-link>
                        </div>
                      </td>
                  </tr>
              </tbody>
          </table>
          <!--페이징 처리 구현 필요-->
          <div style="display:flex">
              <div style="margin:auto">
                  <ul class="pagination">
                      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                      <li class="page-item active"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item"><a class="page-link" href="#">Next</a></li>
                  </ul>  
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
  methods : {
    rowClicked(rowId){
            // 상세 페이지로 이동
            this.$router.push({
                path : `/users/${rowId}/edit`
            })
        },
  },
}


</script>

<style scoped>

  img {
  width: 100%;
  height: 70%;
  margin: 8px;
  }

  .btn-sm {
    width: 30%;
    height: 30%;
  }

    
</style>