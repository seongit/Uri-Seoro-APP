<template>
  <!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu :name="name"></the-main-menu>
    <div class="container page">
      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-9 top-bar">
          <p>개요</p>
        </div>

        <!--관리자만 [관리] 버튼 보여짐 -->
        <div v-if="isAdmin" class="col-md-3">
          <div class="row" style="float: right">
            <div class="btn">
              <router-link :to="{ name: 'adminProjects' }">
                <font-awesome-icon icon="fa-solid fa-gear" /> 관리
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!--프로젝트 설명-->
      <div>
        {{ description }}
      </div>
    </div>

    <app-project-issue-list v-if="isSelectedTab"></app-project-issue-list>
  </div>
</template>

<script>
/* eslint-disable */
import TheMainMenu from "@/components/TheMainMenu.vue";
import apiProject from "../../api/project.js";
import AppProjectIssueList from "../../views/projects/AppProjectIssueList.vue";

export default {
  components: { TheMainMenu, AppProjectIssueList },
  data() {
    return {
      name: "",
      description: "",
      isSelectedTab: false,
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  mounted() {
    apiProject
      .getProjectDetail(this.$route.params.id)
      .then((response) => {
        // console.log(response.data.project);

        let resObj = response.data.project;

        this.name = resObj.name;
        this.description = resObj.description;
      })
      .catch((error) => {
        console.log(`ERROR:${error}`);
      });
  },

  methods: {},
};
</script>

<style>
.top-bar {
  font-size: 20px;
  font-weight: bold;
}
</style>
