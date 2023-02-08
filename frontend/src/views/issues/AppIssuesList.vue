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

      <!--리스트 항목-->
      <table class="table table-hover">
        
          <!--테이블 -->
          <vuetable ref="vuetable"
          api-url="http://localhost:8080/test/issues.json"
          :fields="fields"
          data-path="issues"
          >

            <div slot="test-slot" slot-scope="props">
              <div class="btn" @click="showContextMenu()">
                <font-awesome-icon icon="fa-solid fa-ellipsis" />
              </div>
            </div>
          
          </vuetable>
                  
          <!--context menu 테스트 영역-->
          <div v-show="isVisable" id="test" class="item-wrapper context-menu-relative">
              <div class="list-group" >
                  <div
                    v-for="(item, index) in itemArray1"
                    :key="index"
                    @click.prevent.stop="handleClick1($event, item)"
                    class="list-group-item list-group-item-action"
                  >
                    {{ item.name }}
                </div>
              </div>
            </div>

          <vue-simple-context-menu
              element-id="myFirstMenu"
              :options="optionsArray1"
              ref="vueSimpleContextMenu1"
              @option-clicked="optionClicked1"
            >
          </vue-simple-context-menu>

      </table>
      
  

    <!--메인 메뉴 끝--> 
    </div>
    

  </div>
</template>

<script>
/*eslint-disable */
import TheMainMenu from '../../components/TheMainMenu.vue';
import Vuetable from 'vuetable-2'

// 테스트 중
import apiIssue from '../../api/issue.js';
import { faL } from '@fortawesome/free-solid-svg-icons';

export default {
  components : {TheMainMenu,Vuetable} ,
  data() {
    return {
      isVisable: false,
      isDone : false,
      itemArray1: [
        {
          name: '편집'
        },
        {
          name: '상태',
        },
        {
          name: '일감삭제',
        },
      ],
      optionsArray1: [
        {
          name: 'Duplicate',
          slug: 'duplicate',
        },
        {
          type: 'divider',
        },
        {
          name: 'Edit',
          slug: 'edit',
        },
        {
          name: '<em>Delete</em>',
          slug: 'delete',
        },
      ],

      fields : [
        {
          name : "id",
          title : "#",
          width : "3%",
        },
        {
          name : "project.name",
          title : "프로젝트명",
          width : "10%",
        },
        {
          name : "tracker.name",
          title : "유형",
          width : "5%",
        },
        {
          name : "status.id",
          title : "상태",
          width : "5%",
          titleClass: "center aligned",
          dataClass: "center aligned",
          formatter (value) {
          return value == 1 ? '<span class="badge badge-status-open ">진행중</span> ' : '<span class="badge badge-status-closed ">완료</span>' ;
          }
        },
        {
          name : "priority.id",
          title : "우선순위",
          width : "5%",
          formatter (value) {
            let test = ''
            if(value == 2){
              test = '<span class="badge badge-status-open ">보통</span> '
            }else if(value == 4){
              test = '<span class="badge badge-status-closed ">긴급</span>'
            }

            return value = test
          }
        },
        {
          name : "subject",
          title : "제목",
          width : "10%",
        },
        {
          name : "updated_on",
          title : "변경일시",
          width : "10%",
        },
        {
          name : "test-slot",
          title : "상태변경",
          width : "10%",
        },
        
      ]

    }
  },
  methods : {

  // 버튼 클릭 시 context Menu 보이도록 구현 
  showContextMenu(){
    this.isVisable == false ? this.isVisable = true : this.isVisable = false;
  },  

  rowClicked(id){
    this.$router.push({
      path:`/issues/${id}`
    })
  },


  handleClick1(event, item) {
    this.$refs.vueSimpleContextMenu1.showMenu(event, item);
  },


  optionClicked1(event) {
    alert('test');
    window.alert(JSON.stringify(event));
  },

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


.context-menu-relative {
    position: relative;
    left: 1070px;
    top: -45px;
}

</style>