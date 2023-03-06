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
                <div class="btn" @click="createUser">
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
                    <!-- <div class="col-sm-3 searchUser">
                      <div>
                        <label for="sel1">상태</label>
                      </div>
                      <div>
                        <select class="form-control" id="sel1">
                          <option>사용중</option>
                          <option>삭제됨</option>
                      </select>
                      </div>
                    </div> -->
                    <div class="col-sm-7 searchUser">
                      <div> <label for="">사용자</label></div>
                      <div>  
                        <input
                                class="form-control border-radius"
                                type="text"
                                style="width:150%"
                                @change="setTmpSearchWord($event)"                      
                              />
                      </div>
                    </div>
                    <!--추후 리팩토링 필요, 검색 아이콘을 우측으로 놓기 위해 비어있는 div 생성하였음-->
                    <div class="col-sm-2">
                    </div>
                    <div class="col-sm-3">
                
                          <!--사용자 검색 버튼 -->
                          <div class="btn searchBtn"  @click="setSearchWord(tmpSearchWord)"> 
                            <!--검색 버튼 -->
                            <img src="../../../public/images/searchBtn.png" >
                          </div>
                    
                    </div>
                  </div>
                </div>
              </div>
          </fieldset>

          <!--사용자 리스트
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
                  <tr @click="rowClicked(1)">
                      <td >
                          admin
                      </td>
                      <td>Redmine</td>
                      <td>admin</td>
                      <td>admin@okestro.com</td>
                      <td>     
                        <font-awesome-icon icon="fa-solid fa-check"></font-awesome-icon>     
                      </td>
                      <td>2023/01/24 10:03</td>
                      <td>
                        <router-link :to="{name:'userDelete'}">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </router-link>
                      </td>
                  </tr>
              </tbody>
          </table> -->

      <vuetable ref="vuetable" 
          :api-url = "this.setURLPath()"
          :fields="fields"
          data-path="users"
          pagination-path=""
          class="table table-hover table-height"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:row-dblclicked="onRowDoubleClicked"
          :key = "reloadUserComponent"
          >

          <div slot="test-slot" slot-scope="props">
            <!--system admin일 경우 휴지통 아이콘이 보이지 않음-->
            <div v-if="props.rowData.id === 1">
            </div>
            <!--그 외의 경우 휴지통 아이콘 보여짐-->
            <div v-else class="btn" @click.prevent.stop="handleRowClick($event, props.rowData, userPermission )">
                <font-awesome-icon icon="fa-solid fa-trash" />
            </div>
          </div>

      </vuetable> 



        <!-- 페이징 영역 -->
        <vuetable-pagination 
        ref="pagination"
        :css="css.pagination"
        class="row"
        @vuetable-pagination:change-page="onChangePage"
        >
        </vuetable-pagination>

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
import FieldsDef from '../vueTableDef/UsersFiledsDef.js'

import Vuetable from '../../../node_modules/vuetable-2/src/components/Vuetable.vue'
import VuetablePagination from '../../components/VuetablePagination.vue'
import cssConfig from '../../VuetableCssConfig'

import apiUser from '../../api/user.js';
import { faL } from '@fortawesome/free-solid-svg-icons';

export default {
  components : {TheAdminSidebar,Vuetable,VuetablePagination},
 
  data(){
    return {

      /** 페이징 처리 관련
       *  cssConfig : 페이징 처리 관련 css를 config 파일로 정의하였음
       */
      css : cssConfig, 
      // 필드 항목 관리를 위해 별도의 파일로 구분하였음
      fields : FieldsDef,
      userPermission : 1, // 사용자 권한
      ClickedRowData : {},
      reloadUserComponent : 0, 
      tmpSearchWord : '',   
      enteredSearchWord : '',

    }
  },

  computed : {

  },

  methods : {

    isSystemAdmin(item){
     if(item.id == 1) {
        return true;
     }
     return false;
    },

    createUser(){
      this.$router.push({
        path: '/users/new'
      })
    },

    rowClicked(rowId){
      // 상세 페이지로 이동
      this.$router.push({
          path : `/users/${rowId}/edit`
      })
    },

    setURLPath(){

      let str = "/user/getUsers?";

      if(this.enteredSearchWord != ''){
        str += "searchWord=" + this.enteredSearchWord ; 
      }else{
        str += "searchWord=" ; 
      }


      return str
    },

    /**
     * 검색 조건 입력 후 change Event가 발생하면 tmpSearchWord 변수에 해당 값이 담김
     * @param {*} event 
     */
    setTmpSearchWord(event){
      this.tmpSearchWord = event.target.value
    },

    /**
     * 검색 버튼 클릭 시, enteredSearchWord 변수에 tmpSearWord의 값이 담김
     * @param {*} param 
     */
    setSearchWord(param){
      this.enteredSearchWord = param;
    },


    /**
     * 전체 목록 그리드 더블 클릭시 호출되는 메소드
     * @param {*} dataItem 
     */
     onRowDoubleClicked(dataItem){
      this.$router.push({
        path:`/users/${dataItem.data.id}/edit`
      })
    },


    // 편집 아이콘 클릭 시 호출되는 메소드
    handleRowClick(event, rowData, userPermission) {
      // rowData 담아줌
      this.ClickedRowData = rowData;
      // context menu 팝업 출력됨

      // 사용자 권한별로 조회되는 context 항목 상이함
      // 1 == 관리자
      // 2 == 일감을 할당 받은 개발자 (본인 일감만 편집 가능)

     
      if(confirm('사용자를 삭제하시겠습니까?')){

        apiUser.deleteUser(this.ClickedRowData.id).then((response) => {
          console.log(response);

          if(response.data == "200 OK"){

            this.reloadUserComponent++;

          }

        }).catch((error) => {
          console.log(error);
        })
      }

    },



    /**
     * 페이징 처리 관련
     */

    // 화면 로딩 시, 페이징 처리 데이터를 세팅하는 메소드 
    onPaginationData(obj){
    
      // vuetable-pagination에서 필요하는 데이터 형식에 맞게 가공
      let paginationData = {
      total : obj.total_count,
      per_page : obj.limit,
      current_page : obj.current_page,
      last_page :  Math.ceil(obj.total_count / obj.limit) || 0,
      next_page_url: '/',
      prev_page_url: '/',
      from: 1,
      to:  10
      }

      //console.log(paginationData);

      this.$refs.pagination.setPaginationData(paginationData);

    },

    // 페이지바 클릭 시 해당 페이지 번호가 담김
    onChangePage (page) {
      this.$refs.vuetable.changePage(page);
    },


  // 메서드 속성 종료
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