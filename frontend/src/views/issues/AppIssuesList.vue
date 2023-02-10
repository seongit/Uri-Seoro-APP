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
                    <option>사용중</option>
                    <option>삭제됨</option>
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




      <vuetable ref="vuetable"
          api-url="http://localhost:8080/test/issues.json"
          :fields="fields"
          @vuetable:row-dblclicked="onRowDoubleClicked"
          @vuetable:row-clicked="onRowClicked"
          data-path="issues"
          pagination-path=""
          class="table table-hover"
          >

          <div slot="test-slot" slot-scope="props">
            <!--권한이 있는 사용자만 조회 가능-->
            <div v-if="isVisableEditBtn">
              <div class="btn" @click.prevent.stop="handleRowClick($event,props.rowData,1)">
                <font-awesome-icon icon="fa-solid fa-ellipsis" />
              </div>
            </div>
            <div v-else>

            </div>
          </div>

      </vuetable>
                  

        <!--
        <div v-show="isVisable" id="test" class="item-wrapper context-menu-absolute">
          <div class="list-group" >
              <div
                v-for="(item, index) in StatusItemArrayForAdmin"
                :key="index"
                @click.prevent.stop="handleClick1($event, item)"
                class="list-group-item list-group-item-action"
              >
                {{ item.name }}
            </div>
          </div>
        </div>
    -->

      <!--사용자 권한에 따라 조회되는 context-menu 항목이 달라야함 - 추후 구현 필요 -->
      <!-- <vue-simple-context-menu
          element-id="myFirstMenu"
          :options="StatusItemArrayForAdmin"
          ref="vueSimpleContextMenu"
          @option-clicked="statusClicked($event)"
        >
      </vue-simple-context-menu> -->

      <vue-simple-context-menu
          element-id="myFirstMenu"
          :options="StatusItemArrayForAdmin"
          ref="vueSimpleContextMenu"
          @option-clicked="statusClicked($event)"
        >
      </vue-simple-context-menu>


      <vue-simple-context-menu
          element-id="mySecondMenu"
          :options="StatusItemArrayForEditor"
          ref="vueSimpleContextMenu2"
          @option-clicked="showSubMenu($event)"
        >
      </vue-simple-context-menu>



      <vue-simple-context-menu
          element-id="myTestMenu"
          :options="TestArray"
          ref="testMenu"
          @subMenu-clicked="test($event)"
        >
      </vue-simple-context-menu>


    <!--메인 메뉴 끝--> 
    </div>
    

  </div>
</template>

<script>
/*eslint-disable */
import TheMainMenu from '../../components/TheMainMenu.vue';
import Vuetable from 'vuetable-2'
import FieldsDef from '../vueTableDef/IssueFiledsDef.js'

// 테스트 중
import apiIssue from '../../api/issue.js';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { objectToString } from '@vue/shared';


export default {
  components : {TheMainMenu,Vuetable} ,
  data() {
    return {
      // 필드 항목 관리를 위해 별도의 파일로 구분하였음 (issueFiledsDef.js)
      fields : FieldsDef,
      // isVisableEditBtn : true => 버튼 조회
      // isVisableEditBtn : false => 버튼 미조회 (기본값) => 테스트를 위해 true로 변경하였음
      isVisableEditBtn: true,
      isDone : false,
      ClickedRowData : {},
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
      TestArray: [
        {
          name: '진행중'
        },
        {
          name: '완료'
        },
      ],
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
        this.$refs.vueSimpleContextMenu.showMenu(event);
      }else if(userPermission == 2){
        this.$refs.vueSimpleContextMenu2.showMenu(event);
      }else{
        this.$refs.testMenu.showMenu(event);
      }
    },


    // context-menu 항목 클릭 시 호출되는 메소드
    statusClicked(event) {

      let clickedStatus = event?.option?.name;

      // context-menu 중 어떤 항목을 체크 했는지 확인
      console.log(clickedStatus);

      switch(clickedStatus){
        case '편집' : {this.$router.push({path:`/issues/${this.ClickedRowData.id}`}) }break;
        case '상태' : {
          //this.$refs.testMenu.showMenu();
          let test = document.getElementById('myFirstMenu');
          test.addEventListener("click",this.showSubMenu(top))
        }break;
        case '일감삭제' : {alert(`일감이 삭제 되었습니다.`)} break;
        default : console.log("default 찍혔음")
      }

      // window.alert(JSON.stringify(this.ClickedRowData));
    },

    // 테스트
    optionClicked: function optionClicked(option) {
      this.$emit("option-clicked", {
        item: this.item,
        option: option
      });
    },


    showSubMenu(top){
      this.$refs.testMenu.showMenu(top?.event);
    },

    // // context-menu 항목 클릭 시 호출되는 메소드
    // statusClicked(e) {

    //   let clickedStatus = event?.option?.name;

    //   console.log(e);
    //   // // context-menu 중 어떤 항목을 체크 했는지 확인
    //   // console.log(clickedStatus);
    //   // console.log(event);
    //   // console.log(e);
    //   // switch(clickedStatus){
    //   //   case '편집' : {this.$router.push({path:`/issues/${this.ClickedRowData.id}`}) }break;
    //   //   case '상태' : break;
    //   //   case '일감삭제' : {alert(`일감이 삭제 되었습니다.`)} break;
    //   //   default : console.log("default 찍혔음")
    //   // }

    // // window.alert(JSON.stringify(this.ClickedRowData));
    // },



    // 일감 전체 목록 그리드 더블 클릭시 호출되는 메소드
    onRowDoubleClicked(dataItem){
      console.log("데이터 : "+JSON.stringify(dataItem.data));
      console.log("이벤트 : "+JSON.stringify(dataItem.event));

      this.$router.push({
        path:`/issues/${dataItem.data.id}`
      })
    },




    // 테스트 중


    // 테스트 종료


  },



  // mounted(){
  //   // 테스트 중
  //   apiIssue.getIssues().then((response)=>{
  //     console.log(response);
  //   }).catch((e) => {
  //     console.log(`ERROR:${e}`);
  //   })
  // }
}
</script>

<style scoped>


.context-menu-absolute {
  position: absolute;
  left: 1000px;
  top: 70px;
}

</style>