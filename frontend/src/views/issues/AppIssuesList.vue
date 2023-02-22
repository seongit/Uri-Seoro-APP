<template>
  <!--일감 전체 조회-->
  <!--eslint-disable-->
  <div>

    <!--메뉴 헤더-->
    <the-main-menu></the-main-menu>

    <!--메인 메뉴-->
    <div class="container page">

      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-9">
          <h2>일감</h2>
        </div>
    
        <div class="col-md-3">
          <div class="row" style="float:right">
            <div class="btn">
              <router-link :to="{name:'issueCreate'}">
                <font-awesome-icon icon="fa-solid fa-circle-plus" /> 새 일감 만들기
              </router-link>
            </div>
          </div>
        </div>
      </div>

    
      <!--검색 영역-->
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
                    <option v-for="(item,index) in StatusArray"
                      :key="index"
                      :value="item.value"
                    > {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-sm-9" style="float:right">
                <div class="row" style="float:right">
                  <div class="btn searchBtn" > 
                    <!--검색 버튼 -->
                    <router-link :to="{name:''}">
                      <img src="../../../public/images/searchBtn.png" >
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>



      <!--
      <vuetable ref="vuetable"
          api-url="http://localhost:8080/issue/issues.json"
          :fields="fields"
          @vuetable:row-dblclicked="onRowDoubleClicked"
          @vuetable:row-clicked="onRowClicked"
          data-path="issues"
          pagination-path=""
          class="table table-hover table-height"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:loading="onLoading"        
          @vuetable:loaded="onLoaded"
          >

          <div slot="test-slot" slot-scope="props">
            권한이 있는 사용자만 편집 버튼 (...) 조회 가능
            <div v-if="isVisableEditBtn">
              <div class="btn" @click.prevent.stop="handleRowClick($event,props.rowData,1)">
                <font-awesome-icon icon="fa-solid fa-ellipsis" />
              </div>
            </div>
            <div v-else>

            </div>
          </div>
      </vuetable>-->

      <!--api_url 변경 시 vuetable의 api 경로 또한 변경해야함-->

      <!-- :api-url = "`/issue/getIssues/page=${page}`" -->
      <vuetable ref="vuetable"
          :api-url = "`/issue/getIssues/test`"
          :fields="fields"
          @vuetable:row-dblclicked="onRowDoubleClicked"
          data-path="issues"
          pagination-path=""
          class="table table-hover table-height"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:loading="onLoading"        
          @vuetable:loaded="onLoaded"
          :key="deleteIssueComponent"
          >

          <div slot="test-slot" slot-scope="props">

            <div v-if="isVisableEditBtn">
              <div class="btn" @click.prevent.stop="handleRowClick($event,props.rowData,1)">
                <font-awesome-icon icon="fa-solid fa-ellipsis" />
              </div>
            </div>
            <div v-else>

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
      
      <!--사용자 권한에 따라 조회되는 context-menu 항목이 달라야함 - 추후 구현 필요 -->
      
      <!--관리자 contextMenu -->
      <vue-simple-context-menu
          element-id="firstContextMenu"
          :options="StatusItemArrayForAdmin"
          ref="firstContextMenu"
          @option-clicked="statusClicked($event)"
        >
      </vue-simple-context-menu>

      <!--개발자 contextMenu -->
      <vue-simple-context-menu
          element-id="mySecondMenu"
          :options="StatusItemArrayForEditor"
          ref="vueSimpleContextMenu2"
          @option-clicked="showSubMenu($event)"
        >
      </vue-simple-context-menu>


      <!-- contextMenu의 하위 contextMenu-->
      <vue-simple-context-menu
          element-id="secondContextMenu"
          :options="StatusArray"
          ref="secondContextMenu"
          @option-clicked="subStatusClicked($event,StatusItemArrayForAdmin)"
        >
      </vue-simple-context-menu>



      <!-- <vue-simple-context-menu
          element-id="testMenu"
          :options="TestArray"
          ref="testContextMenu"
          @option-clicked="subStatusClicked($event,StatusItemArrayForAdmin)"
        >
      </vue-simple-context-menu> -->


    <!--메인 메뉴 끝--> 
    </div>
    

  </div>
</template>

<script>
/*eslint-disable */
import TheMainMenu from '../../components/TheMainMenu.vue';
import FieldsDef from '../vueTableDef/IssueFiledsDef.js'

// 테스트 중
import Vuetable from '../../../node_modules/vuetable-2/src/components/Vuetable.vue'
import VuetablePagination from '../../components/VuetablePagination.vue'
import cssConfig from '../../VuetableCssConfig'

import apiIssue from '../../api/issue.js';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { objectToString } from '@vue/shared';


export default {
  
  components : {TheMainMenu, Vuetable, VuetablePagination} ,
  data() {
    return {

      // 필드 항목 관리를 위해 별도의 파일로 구분하였음 (issueFiledsDef.js)
      fields : FieldsDef,
      // isVisableEditBtn : true => 버튼 조회
      // isVisableEditBtn : false => 버튼 미조회 (기본값) => 테스트를 위해 true로 변경하였음
      isVisableEditBtn: true,
      isDone : false,
      ClickedRowData : {},
      deleteIssueComponent : 0, // Issue 삭제 후 vuetable 컴포넌트만 업데이트하기 위해 사용하는 key 값
      /**
       * 한계점 : 상위 context-menu에서 하위 context-menu를 갖도록 구현 필요
       * 현재는 각기 다른 context-menu를 호출하는 형식이기 때문에, 상위와 그에 따른 하위 항목들의 구분이 어려움
       * 또한, 하위 context의 menu는 db에서 조회하여 동적으로 구현할 필요가 있음 (e.g. 담당자등)
       * 
       */
      StatusItemArrayForAdmin: [
        {
          name: '편집'
        },
        {
          name: '상태',
        },
        {
          name: '유형',
        },
        {
          name: '우선순위',
        },
        {
          name: '담당자',
        },
        {
          name: '진척도',
        },
        {
          name: '일감삭제',
        },
      ],

      StatusItemArrayForEditor: [
        {
          name: '편집'
        },
        {
          name: '일감삭제',
        },
      ],

      StatusArray: [
        {name : "신규", value:  1 },
        {name : "진행",  value: 2 },
        {name : "완료",  value: 5 },
      ],

      /** 페이징 처리 관련
       *  cssConfig : 페이징 처리 관련 css를 config 파일로 정의하였음
       */
      css : cssConfig, 

      onLoading() {
      // console.log('loading... show your spinner here')
      
      },

      onLoaded() {
        // console.log('loaded! .. hide your spinner here')
      }

    }
  },



  methods : {

  
    rowClicked(id){
      this.$router.push({
        path:`/issues/${id}`
      })
    },


    // 편집 아이콘 클릭 시 호출되는 메소드
    handleRowClick(event, rowData,userPermission) {
      // rowData 담아줌
      this.ClickedRowData = rowData;
      // context menu 팝업 출력됨

      // 사용자 권한별로 조회되는 context 항목 상이함
      // 1 == 관리자
      // 2 == 일감을 할당 받은 개발자 (본인 일감만 편집 가능)

      if(userPermission == 1) {
        this.$refs.firstContextMenu.showMenu(event);
      }else if(userPermission == 2){
        this.$refs.vueSimpleContextMenu2.showMenu(event);
      }else{
        this.$refs.secondContextMenu.showMenu(event);
      }
    },


    // 상위 context-menu 항목 클릭 시 호출되는 메소드
    statusClicked(event) {

      let clickedStatus = event?.option?.name;

      // context-menu 중 어떤 항목을 체크 했는지 확인
      console.log(clickedStatus);

      /** 
       * 추후 리팩토링 필요 
       * 한계점 : clickedStatus의 문구가 변경되었을 경우 해당 구문으로 들어오지 않음 
       * */

      switch(clickedStatus){
        case '편집' : {this.$router.push({path:`/issues/${this.ClickedRowData.id}`}) }break;
        case '상태' : {

          //this.$refs.secondContextMenu.showMenu();
          let contextMenuEl = document.getElementById('firstContextMenu');
          contextMenuEl.addEventListener("click",this.showSubMenu(top));

        }break;

        case '유형' : {

        } break;

        case '우선순위' : {

        } break;

        case '담당자' : {

        }break;

        case '진척도' : {

        }break;

        case '일감삭제' : {
          if(confirm(`일감을 삭제하시겠습니까?`)){

              apiIssue.deleteIssue(`${this.ClickedRowData.id}`).then((response) => {
                if(response.status == 200){

                
                  this.deleteIssueComponent++;

                }
              }).catch((error) => {
                console.log(error);
              })

          }
         
          this.$refs?.secondContextMenu.hideContextMenu();
          this.$refs?.firstContextMenu.hideContextMenu();

        } break;

        default : console.log("default 찍혔음")
      }

      // window.alert(JSON.stringify(this.ClickedRowData));
    },


    /**
     * 하위 context-menu 항목 클릭 시 호출되는 메소드
     * @param {*} params  
     * 
     */

    subStatusClicked(obj,params){

      console.log(obj?.option?.name);
      console.log(params);

      // 하위 context-menu 항목 클릭 시, 하위를 포함한 상위 context-menu가 모두 사라진다.
      this.$refs?.secondContextMenu.hideContextMenu();
      this.$refs?.firstContextMenu.hideContextMenu();
    },


    /**
     * 상위 context-menu 클릭 시, 하위 context-menu 출력 메소드 
     * @param {*} top 
     */
    
    showSubMenu(top){
      this.$refs.secondContextMenu.showMenu(top?.event);
    },

    hideAllMenu(top){
      this.$refs.secondContextMenu.hideContextMenu();
    },  

    /**
     * 일감 전체 목록 그리드 더블 클릭시 호출되는 메소드
     * @param {*} dataItem 
     */
    onRowDoubleClicked(dataItem){
      console.log("데이터 : "+JSON.stringify(dataItem.data));
      console.log("이벤트 : "+JSON.stringify(dataItem.event));

      this.$router.push({
        path:`/issues/${dataItem.data.id}`
      })
    },



    /**
     * 페이징 처리 관련
     */

    // 화면 로딩 시, 페이징 처리 데이터를 세팅하는 메소드 
    onPaginationData(obj){

      /*
      The pagination component assumes that the following information are available for its calculation
      total -- 사용 가능한 총 레코드 수
      per_page -- 각 페이지의 레코드 수(페이지 크기)
      current_page -- 이 데이터 청크의 현재 페이지 번호
      last_page -- 이 데이터의 마지막 페이지 번호
      next_page_url -- 다음 페이지의 URL
      prev_page_url -- 이전 페이지의 URL
      from --  페이지 크기와 관련하여 이 페이지의 시작 레코드
      to -- 페이지 크기와 관련하여 이 페이지의 끝 레코드
      */

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
    
    /*
    
    totalPage-- 마지막 페이지 번호
    isOnFirstPage-- 현재 페이지 번호가 첫 번째 페이지인지 여부
    isOnLastPage-- 현재 페이지 번호가 마지막 페이지인지 여부
    notEnoughPages-- 모든 페이지가 슬라이딩 윈도우 크기보다 작은지 여부.
    windowSize-- 슬라이딩 페이지 매김 창의 크기. * 2 +1 로 계산됩니다 on-each-side.
    windowStart-- 이 슬라이딩 페이지 매김 창의 첫 번째 페이지 번호입니다.

    */

    // 페이지바 클릭 시 해당 페이지 번호가 담김
    onChangePage (page) {
      this.$refs.vuetable.changePage(page);
    },


  },



  mounted(){
    // 테스트 중
    // apiIssue.getIssues().then((response)=>{
    //   console.log(response);
    // }).catch((e) => {
    //   console.log(`ERROR:${e}`);
    // })
  }
}
</script>

<style scoped>


.context-menu-absolute {
  position: absolute;
  left: 1000px;
  top: 70px;
}

</style>