<template>
  <!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu :name="name"></the-main-menu>

    <div class="container page">
      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-11 top-bar">
          <!--서브 메뉴-->
          <!-- <the-sub-menu :name="name"></the-sub-menu> -->
          <div>
            <div class="row tabs">
              <ul class="col-md-6">
                <li>
                  <!--해당 프로젝트 내의 settings 폴더로 이동할 것-->
                  <a id="projectEditModeBtn" @click="selectedProjectEditMode()" class="selected">
                    프로젝트 설정
                  </a>
                </li>
                <li>
                  <!--해당 프로젝트 내의 settings 폴더로 이동할 것-->
                  <a id="memberEditModeBtn" @click="selectedMemberEditMode()"> 구성원 </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!--메인 컨텐츠 영역-->
      <the-project-form v-if="isProjectEditMode" :resObj="resObj"></the-project-form>
      <app-project-members v-if="isMemberEditMode"></app-project-members>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TheMainMenu from "@/components/TheMainMenu.vue";
import TheProjectForm from "@/components/TheProjectForm.vue";
import TheSubMenu from "@/components/TheSubMenu.vue";
import AppProjectMembers from "../../views/projects/AppProjectMembers.vue";

// api 호출
import apiProject from "../../api/project.js";

export default {
  components: { TheMainMenu, TheProjectForm, TheSubMenu, AppProjectMembers },

  data() {
    return {
      isProjectEditMode: true,
      isMemberEditMode: false,
      name: "",
      // prop으로 전달할 데이터
      resObj: {
        name: "",
        identifier: "",
        description: "",
        is_public: false,
        is_public_checked: false,
      },
    };
  },

  mounted() {
    // 사용자 상세 정보 조회
    if (this.$route.params.id > 0) {
      this.getProjectDetail();
    }
  },

  methods: {
    // 프로젝트 상세 조회
    async getProjectDetail() {
      apiProject
        .getProjectDetail(this.$route.params.id)
        .then((response) => {
          let resObj = response.data.project;

          this.name = resObj.name;

          this.resObj.name = resObj.name;
          this.resObj.description = resObj.description;
          this.resObj.identifier = resObj.identifier;

          if (resObj.is_public == true) {
            this.resObj.is_public = true;
            this.resObj.is_public_checked = true;
          }

          // 식별자 수정 불가
          document.getElementById("inputIdentifier").setAttribute("disabled", true);
        })
        .catch((error) => {
          console.log(`ERROR:${error}`);
        });
    },

    // 구성원 탭 클릭 시
    selectedMemberEditMode() {
      this.toggleSelected("memberEditModeBtn", "projectEditModeBtn");
      this.isMemberEditMode = true;
      this.isProjectEditMode = false;
    },

    // 프로젝트 설정 탭 클릭시
    selectedProjectEditMode() {
      this.toggleSelected("memberEditModeBtn", "projectEditModeBtn");
      this.isMemberEditMode = false;
      this.isProjectEditMode = true;
    },

    // 서브 메뉴 탭 - 토글로 화면 제어
    toggleSelected(toggleOnParam, toggleOffParam) {
      let toggleOnElId = toggleOnParam;
      let toggleOffElId = toggleOffParam;
      document.getElementById(`${toggleOnElId}`).classList.toggle("selected");
      document.getElementById(`${toggleOffElId}`).classList.toggle("selected");
    },
  },
};
</script>

<style scoped>
.col-md-11 {
  max-width: 98.5%;
}
</style>
