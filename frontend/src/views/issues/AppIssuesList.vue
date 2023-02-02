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
              <router-link :to="{name:'projectCreate'}">
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
        <thead>
        <tr>
            <th style="width:5%;">#</th>
            <th style="width:10%">프로젝트</th>
            <th style="width:5%">유형</th>
            <th style="width:5%">상태</th>
            <th style="width:5%">우선순위</th>
            <th style="width:10%">제목</th>
            <th style="width:10%">변경일시</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td >
                    1
                </td>
                <td >
                    프로젝트 제목
                </td>
                <td >
                    결함
                </td>
                <td >
                    신규
                </td>
                <td >
                    보통
                </td>
                <td >
                    일감 제목
                </td>
                <td >
                  <div class="row">
                    <div>
                      2023/01/24 10:03
                    </div>
                    <!--일감 편집 버튼 영역-->
                    <div class="btn" @click="showContextMenu()">
                      <font-awesome-icon icon="fa-solid fa-ellipsis" />
                    </div>
                  </div>
                </td>
              </tr>
              <!--context menu 테스트 영역-->
              <div v-show="values2" id="test" class="item-wrapper relative">
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
         
        </tbody>
      </table>


      

    <!--메인 메뉴 끝--> 
    </div>
    

  </div>
</template>

<script>
/*eslint-disable */
import TheMainMenu from '../../components/TheMainMenu.vue';
// import VueSimpleContextMenu from 'vue-simple-context-menu';
// import 'vue-simple-context-menu/dist/vue-simple-context-menu.css';

export default {
  components : {TheMainMenu} ,
  data() {
    return {
      values2: false,

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

    }
  },
  methods : {
   

   // 버튼 클릭 시 context Menu 보이도록 구현 
    showContextMenu(){
      console.log(this.$refs);
      this.values2 = true;
    },  



    handleClick1(event, item) {
      this.$refs.vueSimpleContextMenu1.showMenu(event, item);
    },


    optionClicked1(event) {
      alert('test');
      window.alert(JSON.stringify(event));
    },


  }
}
</script>

<style scoped>


.relative {
    position: relative;
    left: 1050px;
    top: -45px;
}
</style>