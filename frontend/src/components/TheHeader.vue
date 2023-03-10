<!--eslint-disable-->
<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        <img alt="Vue logo" src="../assets/logo.png" />
      </router-link>
      <ul class="nav navbar-nav">
        <!-- 추후 구현 예정 
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    exact
                    :to="{ name: 'reservation' }"
                >
                 예약하기
                </router-link>
            </li>
            -->
        <!-- <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    exact
                    :to="{ name: 'board' }"
                >
                 게시판
                </router-link>
            </li> -->
        <!-- 추후 구현 예정
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    exact
                    :to="{ name: 'qna' }"
                >
                 건의함
                </router-link>
            </li>
             -->
        <!-- <li v-if="isUserLogin" class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{ name: 'myPage' }">
            내 페이지
          </router-link>
        </li> -->
        <li v-if="isUserLogin" class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{ name: 'projects' }">
            프로젝트
          </router-link>
        </li>
        <!--todo : 관리자로 로그인한 경우에만 관리 페이지 보여질 것-->
        <li v-if="isAdmin" class="nav-item">
          <router-link class="nav-link" active-class="active" exact :to="{ name: 'admin' }">
            관리
          </router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <div v-if="isUserLogin">
            <router-link class="nav-link" active-class="active" exact :to="{ name: '' }">
              {{ $store.state.userInfo.login }}
            </router-link>
          </div>
          <div v-else>
            <!-- <router-link
                    class="nav-link"
                    active-class="active"
                    exact
                    :to="{ name: 'login' }"
                      >
                    로그인
                    </router-link> -->
            <router-link class="nav-link" active-class="active" exact :to="{ name: 'redminLogin' }">
              로그인
            </router-link>
          </div>
        </li>
        <li class="nav-item">
          <div v-if="isUserLogin">
            <a class="nav-link" @click="logoutUser"> 로그아웃 </a>
          </div>
          <div v-else>
            <router-link class="nav-link" active-class="active" exact :to="{ name: 'register' }">
              회원가입
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {};
  },

  computed: {
    // 현재 로그인 여부 확인하여 화면단 제어
    //  $store의 isLogin true => 현재 로그인 중
    isUserLogin() {
      return this.$store.getters.isLogin;
    },

    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },

  mounted() {
    this.isLoginCheck();
  },

  methods: {
    logoutUser() {
      // logout시 $store와 sessionStorage 모두 초기화
      this.$store.commit("clearUserInfo");
      sessionStorage.clear();

      // 페이지 새로고침
      location.reload();
    },

    // sessionStorage의 value를 $store에 저장한다.
    isLoginCheck() {
      // sessionStorage.getItem("LoginUserInfo")에 데이터를 JSON으로 변환
      var obj = JSON.parse(sessionStorage.getItem("LoginUserInfo"));
      let membership = JSON.parse(sessionStorage.getItem("UserMembershipInfo"));

      // obj가 null이 아닌 경우에만 sessionStorage에 있는 value를 $store userInfo commit
      if (obj) {
        // 사용자 비밀번호는 암호화하거나 sessionStorage에 담지 않도록 수정 필요
        if (obj?.userNo > -1) {
          this.$store.commit("setuserInfo", obj);
          this.$store.commit("setuserMembershipInfo", membership);
        }
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 106px;
  height: 22px;
  left: 370px;
  margin-top: 8px;
}
</style>
