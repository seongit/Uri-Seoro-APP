<template>
  <!--eslint-disable-->
  <div class="container page">
    <div class="row">
      <!--메인 컨텐츠 영역-->
      <div class="col-md-9">
          <!--사용자 관리 상단바-->
          <div class="row">
            <div class="col-md-9">
              <h2>프로젝트</h2>
            </div>
            <div>
              <div class="col-md-9" style="float:right">
                <div class="btn">
                  <router-link :to="{name:'projectCreate'}">
                    <font-awesome-icon icon="fa-solid fa-circle-plus" /> 새 프로젝트 
                  </router-link>
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
                      <div>       <label for="">프로젝트</label></div>
                      <div>  
                        <input
                                class="form-control border-radius"
                                type="text"
                              />
                      </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="btn"> 
                          <!--검색 버튼 -->
                          <router-link :to="{name:''}">
                            <img src="../../../public/images/searchBtn.png" >
                          </router-link>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </fieldset>

          <!--리스트 항목
          <table class="table table-hover">
              <thead>
              <tr>
                  <th style="width:20%;">프로젝트</th>
                  <th style="width:10%">공개</th>
                  <th style="width:20%">등록일시</th>
                  <th style="width:10%">상태관리</th>
              </tr>
              </thead>
              <tbody>
  
                  <tr @click="rowClicked(1)">
                      <td >
                          테스트 프로젝트 입니다
                      </td>
                      <td> 
                        <font-awesome-icon icon="fa-solid fa-check"></font-awesome-icon>           
                      </td>
                      <td>2023/01/24 10:03</td>
                      <td onclick='event.cancelBubble=true;'>
                        <div class="btn" @click="confirmDelete('프로젝트명')">
                          <font-awesome-icon icon="fa-solid fa-trash" />
                        </div>
                      </td>
                  </tr>
              </tbody>
          </table>-->

        <vuetable ref="vuetable" 
          :api-url = "this.setURLPath()"
          :fields="fields"
          data-path="projects"
          pagination-path=""
          class="table table-hover table-height"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:row-dblclicked="onRowDoubleClicked"
          :key = "reloadComponent"
          >

          <div slot="status-slot" slot-scope="props">
            <div  class="btn" @click.prevent.stop="handleRowClick($event, props.rowData, userPermission )">
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
import FieldsDef from '../vueTableDef/ProjectFiledDef.js'

import Vuetable from '../../../node_modules/vuetable-2/src/components/Vuetable.vue'
import VuetablePagination from '../../components/VuetablePagination.vue'
import cssConfig from '../../VuetableCssConfig'

import apiProject from '../../api/project.js';

export default {
  components : {TheAdminSidebar,Vuetable,VuetablePagination},
  data() {
    return {

      /** 페이징 처리 관련
       *  cssConfig : 페이징 처리 관련 css를 config 파일로 정의하였음
       */
       css : cssConfig, 
      // 필드 항목 관리를 위해 별도의 파일로 구분하였음
      fields : FieldsDef,
      userPermission : 1, // 사용자 권한
      ClickedRowData : {},
      reloadComponent : 0, 

    }
  },
  methods : {

    rowClicked(id){
      this.$router.push({
        path: `/projects/${id}/settings`
      })
    },  

    confirmDelete(prjName){
      confirm(`${prjName} 삭제하시겠습니까?`);
    },

    setURLPath(){

      let str = "/project/getAllProjects?";

      return str
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

    /**
     * 전체 목록 그리드 더블 클릭시 호출되는 메소드
     * @param {*} dataItem 
     */
    onRowDoubleClicked(dataItem){
      this.$router.push({
        path: `/projects/${dataItem.data.id}/settings`
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

     
      if(confirm('프로젝트를 삭제하시겠습니까?')){

        apiProject.deleteProject(this.ClickedRowData.id).then((response) => {
          console.log(response);

          if(response.data == "200 OK"){

            this.reloadComponent++;

          }

        }).catch((error) => {
          console.log(error);
        })
      }

    },




  }
}

</script>