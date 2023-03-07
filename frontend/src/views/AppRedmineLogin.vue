<template>
  <!--eslint-disable-->
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">로그인</h1>
          <form @submit.prevent="submitLoginForm">
            <fieldset class="form-group">
              <label for="loginID"
                ><b>ID</b>
                <input
                  class="form-control form-control-lg"
                  id="loginID"
                  type="loginID"
                  v-model="loginID"
                />
              </label>
            </fieldset>
            <fieldset class="form-group">
              <label for="password"
                ><b>Password</b>
                <input
                  class="form-control form-control-lg"
                  id="password"
                  type="password"
                  v-model="password"
                />
              </label>
            </fieldset>
            <div style="float: right">
              <button type="submit" class="btn">로그인</button>
            </div>
          </form>
          <!--카카오 로그인 추후 구현 필요-->
          <!-- <a @click="kakaoLogin()">
            <img src="https://developers.kakao.com/tool/resource/static/img/button/login/simple/ko/kakao_login_small.png"
            width="15%">
          </a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import apiUser from "../api/user.js";

export default {
  name: "App-Login",
  data() {
    return {
      loginID: "",
      password: "",
      users: "",
    };
  },

  methods: {
    // 백업

    // async submitLoginForm() {
    //   // API 요청시 전달할 userData 객체
    //   const user = {
    //     login : this.loginID,
    //     password : this.password,
    //   }

    //   const requestData = {user}

    //   await apiUser.login(requestData)
    //   .then((response) => {

    //     console.log(response);
    //     let resObj = response.data;

    //     // response data를 store에 저장
    //     this.$store.commit('setuserInfo', resObj);

    //     // sessionStorage에 사용자 data 저장
    //     sessionStorage.setItem('LoginUserInfo', JSON.stringify(this.$store.state.userInfo));

    //     this.$router.push({
    //       path : '/'
    //     })

    //   }).catch((e) => {

    //     alert(`${e.response.data.message}`)

    //   });

    // },

    // 구성원 정보
    async submitLoginForm() {
      // API 요청시 전달할 userData 객체
      const user = {
        login: this.loginID,
        password: this.password,
      };

      const requestData = { user };

      await apiUser
        .login(requestData)
        .then((response) => {
          console.log(response);
          let resObj = response.data;

          console.log(resObj);
          // response data를 store에 저장
          this.$store.commit("setuserInfo", resObj);

          // sessionStorage에 사용자 data 저장
          sessionStorage.setItem("LoginUserInfo", JSON.stringify(this.$store.state.userInfo));

          this.$router.push({
            path: "/",
          });

          console.log(`resObj.userNo =====> ${resObj.userNo}`);

          // 레드마인 API에 있는 사용자 정보를 받아옴
          this.getUserDetail(resObj.userNo);
        })
        .catch((e) => {
          alert(`${e.response.data.message}`);
        });
    },

    // 레드마인 API에 있는 사용자 상세 정보를 받아와(=membership) 세팅
    async getUserDetail(userNo) {
      await apiUser
        .getUserDetail(userNo)
        .then((response) => {
          
          let resObj = response.data.user.memberships;
          this.$store.commit("setuserMembershipInfo", resObj);

          sessionStorage.setItem(
            "UserMembershipInfo",
            JSON.stringify(this.$store.state.userMembershipInfo)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
label {
  display: inline;
}
.btn {
  background: #fcd842;
  border-radius: 11px;
}

.form-control {
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 11px;
}

fieldset {
  padding: 7px;
}
</style>
