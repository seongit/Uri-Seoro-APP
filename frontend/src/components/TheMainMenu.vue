<template>
  <!--eslint-disable-->
  <!--메인 메뉴입니다.-->
  <!--전체 div -->
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <!--메인 메뉴 제목-->
        <div class="custom-form">
          <h1>{{ getPageTitle }}</h1>
        </div>

        <!--메인 메뉴 항목 -->
        <div id="menu-item">
          <ul class="nav navbar-nav">
            <!--프로젝트 전체 목록 페이지-->
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" exact :to="{ name: 'projects' }">
                프로젝트
              </router-link>
            </li>

            <!--관리자 - 사용자의 경우 전체 일감 조회 가능 - 사용자는 공개 프로젝트의 일감만 조회 가능 -->
            <div v-if="getProjectIssueListTab">
              <!--일감 전체 목록 페이지-->
              <li v-if="isGetAllIssues" class="nav-item">
                <router-link class="nav-link" active-class="active" exact :to="{ name: 'issues' }">
                  일감
                </router-link>
              </li>
              <!--프로젝트 해당하는 일감 조회-->
              <li v-if="isGetSelectedIssue" class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'projectIssues' }"
                >
                  일감
                </router-link>
              </li>
              <!--관리자만 해당 항목 조회됨-->
              <li class="nav-item" v-if="isAdminAndProjectId">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'projectEdit' }"
                >
                  설정
                </router-link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  props: {
    name: String,
  },
  data() {
    return {
      projectName: "",
      projectIdFromRouteParams: 0,
      isGetAllIssues: true,
      isGetSelectedIssue: false,
      isGetSelectedProject: false,
    };
  },

  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },

    getPageTitle() {
      if (this.$route.params.id) {
        this.projectName = this.$props.name;
        this.projectIdFromRouteParams = this.$route.params.id;
        return this.projectName;
      }
      return "Redmine";
    },

    getProjectIssueListTab() {
      if (this.$route.params.id) {
        return true;
      } else if (this.$store.getters.isAdmin) {
        return true;
      } else {
        return false;
      }
    },

    isAdminAndProjectId() {
      if (this.$store.getters.isAdmin && this.$route.params.id) {
        return true;
      }
      return false;
    },
  },

  mounted() {
    if (this.projectIdFromRouteParams) {
      this.isGetSelectedIssue = true;
      this.isGetAllIssues = false;
      this.isGetSelectedProject = true;
    }
  },

  methods: {
    onClickedIssueBtn(id) {
      // console.log("id=====>" + id);
    },
  },
};
</script>

<style>
#menu-item {
  height: 32px;
  background: #f3f3f3;
  padding-left: 3px;
}

#menu-item li a.selected {
  background: white;
  border-radius: 12%;
  color: #555;
  font-weight: bold;
}

#menu-item li {
  width: 7%;
}

#menu-item li a {
  text-align: center;
}
</style>
