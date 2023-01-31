<template>
  <!--eslint-disable-->
  <div class="container page">
    <div class="row">
      <!--메인 컨텐츠 영역-->
      <div class="col-md-9">

          <!--사용자 관리 상단바-->
          <div class="row">
            <div class="col-md-9">
              <h2>사용자</h2>
            </div>
            <div>
              <div class="col-md-9" style="float:right">
                <div class="btn">
                  <font-awesome-icon icon="fa-solid fa-circle-plus" /> 새 사용자 
                </div>
              </div>
            </div>
          </div>
          
          <!--사용자 검색 영역-->
          <fieldset class="form-group">
              <div class="custom-search-form border-radius">
                <div class="custom-search-form-area">
                  <br>
                  <b>검색 조건</b> 
                  <br>
                  <div class="row" >
                    <div class="col-sm-3 searchUser">
                      <div>
                        <label for="sel1">상태</label>
                      </div>
                      <div>
                        <select class="form-control" id="sel1">
                          <option>사용중</option>
                          <option>삭제됨</option>
                      </select>
                      </div>
                    </div>
                    <div class="col-sm-6 searchUser">
                      <div>       <label for="">사용자 ID</label></div>
                      <div>  
                        <input
                                class="form-control border-radius"
                                type="text"                         
                              />
                      </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="btn"> 
                          <!--사용자 검색 버튼 -->
                          <router-link :to="{name:''}">
                            <img src="../../../public/images/searchBtn.png" >
                          </router-link>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </fieldset>

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
                        <font-awesome-icon icon="fa-solid fa-check"></font-awesome-icon>     
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
                        <router-link :to="{name:'userDelete'}">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </router-link>
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

  .searchUser {
    font-size: 16px;
    display: flex;
  }
  .searchUser * {
    margin: auto;
  }

</style>