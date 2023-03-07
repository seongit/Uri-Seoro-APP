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
    this.getAllProjects();
  },

  methods: {
    async getAllProjects() {
      let isPublic = "";

      if (this.getPublicProjects()) {
        isPublic = "false";
      } else {
        // 로그인하지 않을 경우 public
        isPublic = "true";
      }

      // 로그인 했을 경우 public + 구성원에 해당하는 프로젝트만 조회
      if (this.$store.getters.isLogin) {
        await apiProject
          .getAllProjects(isPublic)
          .then((response) => {
            //this.projectsArr = response.data.projects;
            /*

            // membership에 등록된 사용자일 경우 this.$store.getters.getUserMemberShipInfo 배열 길이는 1 이상
            // console.log(this.$store.getters.getUserMemberShipInfo.length);
            if (this.$store.getters.getUserMemberShipInfo.length > 0) {
              let userMemberShipsArr = this.$store.getters.getUserMemberShipInfo;
              let allProjectArr = response.data.projects;
              allProjectArr.forEach((projectItem) => {
                //console.log(projectItem);
                // 공개된 프로젝트일 경우
                if (projectItem.is_public == true) {
                  this.projectsArr.push(projectItem);
                }
                // 로그인한 사용자의 프로젝트
                userMemberShipsArr.forEach((item) => {
                  // console.log(item);
                  if (item.project.id == projectItem.id) {
                    this.projectsArr.push(projectItem);
                  }
                });
              });
            } else if (this.$store.getters.isAdmin) {
              // 관리자일 경우 전체 프로젝트 조회
              this.projectsArr = response.data.projects;
            }
            */

            if (this.$store.getters.isAdmin) {
              // 관리자일 경우 전체 프로젝트 조회
              this.projectsArr = response.data.projects;
            } else if (this.$store.getters.getUserMemberShipInfo.length > 0) {
              // membership에 등록된 사용자일 경우 this.$store.getters.getUserMemberShipInfo 배열 길이는 1 이상
              let userMemberShipsArr = this.$store.getters.getUserMemberShipInfo;
              let allProjectArr = response.data.projects;

              allProjectArr.forEach((projectItem) => {
                //console.log(projectItem);
                // 공개된 프로젝트일 경우
                if (projectItem.is_public == true) {
                  this.projectsArr.push(projectItem);
                } else {
                  // 할당된 프로젝트가 있을 경우
                  userMemberShipsArr.forEach((item) => {
                    if (item.project.id == projectItem.id) {
                      this.projectsArr.push(projectItem);
                    }
                  });
                }
              });
            } else {
              // 로그인은 했으나, 아직 구성원에 할당 받지 않은 경우
              let allProjectArr = response.data.projects;
              // 공개된 프로젝트일 경우
              allProjectArr.forEach((projectItem) => {
                //console.log(projectItem);
                // 공개된 프로젝트일 경우
                if (projectItem.is_public == true) {
                  this.projectsArr.push(projectItem);
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // 로그인하지 않았을 경우 -> Public 프로젝트만 조회
        await apiProject
          .getAllProjects(isPublic)
          .then((response) => {
            this.projectsArr = response.data.projects;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    projectDetailPage(id) {
      this.$router.push({
        path: `/projects/${id}`,
      });
    },

    getPublicProjects() {
      return this.$store.getters.isLogin;
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
