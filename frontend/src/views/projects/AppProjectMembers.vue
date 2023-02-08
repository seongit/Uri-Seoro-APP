<template>
  <!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu></the-main-menu>

    <div class="container page">

      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-11 top-bar">
          <!--서브 메뉴-->
          <the-sub-menu></the-sub-menu>
        </div>
      </div>

      <!--모달 영역-->
      <the-memeber-modal></the-memeber-modal>


      <!--메인 컨텐츠 영역-->
      <div class="row">
        <!--새 구성원 버튼-->
        <div class="col-md-12">
          <div class="row" style="float:right">
            <div class="btn"  @click="$modal.show('member-modal')">
              <font-awesome-icon icon="fa-solid fa-circle-plus" /> 새 구성원
            </div>
          </div>
        </div>

        <!--구성원 조회 영역-->
        <div class="col-md-12">
          <!--리스트 항목-->
          <table class="table table-hover">
            <thead>
              <tr>
                  <th style="width:20%;">사용자</th>
                  <th style="width:20%">역할</th>
                  <th style="width:20%"></th>
              </tr>
            </thead>
            <tbody>
              <tr @click="rowClicked(1)">
                <td>Redmine admin</td>
                <td>개발자</td>
                <td style="float:right;">
                  <!--구성원 편집-->
                  <div class="btn" @click="editBtnClick()">
                    <font-awesome-icon icon="fa-solid fa-pen" /> 편집
                  </div>
                  <!--구성원 삭제-->
                  <div class="btn" @click="delIssue()">
                    <font-awesome-icon icon="fa-solid fa-trash" /> 삭제
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--구성원 조회 영역 종료-->
      </div>
      <!--메인 컨텐츠 영역-->

    </div>
  </div>
  
</template>

<script>
/* eslint-disable */
import TheMainMenu from '@/components/TheMainMenu.vue';
import TheProjectForm from '@/components/TheProjectForm.vue';
import TheSubMenu from '@/components/TheSubMenu.vue';
import TheMemeberModal from '@/components/Modal/TheMemberModal.vue'

export default {
  components : {TheMainMenu,TheProjectForm, TheSubMenu,TheMemeberModal},
  methods : {
    // 편집 버튼 클릭시 편집 영역 활성화
    editBtnClick(){

      // 편집 버튼을 다시 클릭하면 접힘
      this.isVisable == false ? this.isVisable = true : this.isVisable = false;

    },
    // 삭제 버튼 클릭시 alert로 확인함
    delIssue(){
      window.alert('삭제하시겠습니까?');
    },

    createMembersClick(){
      this.$router.push({
        path : "/"
      })
    },

  showDynamicComponentModal() {
    this.$modal.show(DemoCustomComponent, {
      text: 'This text is passed as a property'
    })
  },

    
  },

}
</script>

<style scoped>

.col-md-11 {
  max-width: 98.5%;
}

</style>