<template>
<!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu></the-main-menu>

    <!--메인 메뉴-->
    <div class="container page">
      <!--사용자 관리 상단바-->
      <div class="row">
        <div class="col-md-9">
          <h2>프로젝트</h2>
        </div>
    
        <!--관리자만 [새프로젝트] [관리] 버튼 보여지도록 구현 필요-->
          <div class="col-md-3">
            <div class="row" style="float:right">
              <div class="btn">
                <router-link :to="{name:'projectCreate'}">
                  <font-awesome-icon icon="fa-solid fa-circle-plus" /> 새 프로젝트 
                </router-link>
              </div>
              <div class="btn">
                <router-link :to="{name:'projectCreate'}">
                  <font-awesome-icon icon="fa-solid fa-gear" /> 관리
                </router-link>
              </div>
            </div>
        </div>


      </div>

      <!--전체 프로젝트 영역 -->
      <div class="row" >
        <div class="col-md-4 projects-area">
          <!--개별 프로젝트 영역--->
          <div class="project" @click="projectDetailPage('projectName')">
            <!--프로젝트명-->
            <p>프로젝트명</p>
            <!--프로젝트 개요-->
            <div>
              그러므로 두손을 이상 꽃 열락의 천하를 대한 청춘 것이다. 돋고, 두기 붙잡아 아름답고 이상의 듣는다. 인생의 풀이 그것을 찾아다녀도, 것이다. 청춘의 피고 때까지 품으며, 시들어 봄바람이다. 용기가 인간의 소리다.이것은 그들에게 관현악이며, 능히 사람은 길지 끓는다. 끓는 군영과 노래하며 칼이다. 창공에 위하여 몸이 예가 힘있다. 청춘에서만 생의 같은 천하를 만물은 주며, 같이, 부패를 봄바람이다. 충분히 곧 사랑의 고행을 보이는 기쁘며, 보라.
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>

<script>
/*eslint-disable */
import TheMainMenu from '../../components/TheMainMenu.vue';

export default {
  components : {TheMainMenu} ,
  methods : {
    projectDetailPage(prjName) {
      this.$router.push({
        path:`/projects/${prjName}`
      })
    },
  }
}
</script>

<style scoped>


.row {
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: nowrap;
}


.projects-area p {
  font-size: 20px;
  font-weight: bold;
}

.projects-area {
  margin: 3px;
}

.project {
  margin-top: 2%;
  background: #F3F3F3;
  cursor: pointer;
  border-radius: 3px;
}

</style>>


