<template>
  <!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu></the-main-menu>

    <!--페이지 메인 영역-->
    <div class="container page">
      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-9">
          <h2>프로젝트</h2>
        </div>

        <!--관리자만 [새프로젝트] [관리] 버튼 보여지도록 구현 필요-->
        <div class="col-md-3" v-if="isAdmin">
          <div class="row" style="float: right">
            <div class="btn">
              <router-link :to="{ name: 'projectCreate' }">
                <font-awesome-icon icon="fa-solid fa-circle-plus" /> 새 프로젝트
              </router-link>
            </div>
            <div class="btn">
              <router-link :to="{ name: 'adminProjects' }">
                <font-awesome-icon icon="fa-solid fa-gear" /> 관리
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!--전체 프로젝트 영역 -->
      <div class="row">
        <div
          class="col-md-4 projects-area"
          v-for="(item, index) in projectsArr"
          :key="index"
          :value="item.id"
        >
          <!--개별 프로젝트 영역--->
          <div class="project" @click="projectDetailPage(item.id)">
            <!--프로젝트명-->
            <p>{{ item.name }}</p>
            <!--프로젝트 개요-->
            <div>
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import TheMainMenu from "../../components/TheMainMenu.vue";
import apiProject from "../../api/project.js";

export default {
  components: { TheMainMenu },
  data() {
    return {
      projectsArr: [],
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  mounted() {
    apiProject
      .getAllProjects()
      .then((response) => {
        this.projectsArr = response.data.projects;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    projectDetailPage(id) {
      this.$router.push({
        path: `/projects/${id}`,
      });
    },
  },
};
</script>

<style scoped>
.row {
  justify-content: space-between;
  align-items: flex-start;
}

.projects-area p {
  font-size: 20px;
  font-weight: bold;
}

/* .projects-area {
  margin: 3px;
} */

.project {
  margin-top: 2%;
  background: #f3f3f3;
  cursor: pointer;
  border-radius: 3px;
  padding: 10px;
}
</style>
>
