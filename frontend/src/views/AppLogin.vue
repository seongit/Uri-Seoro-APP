<template>
  <!--eslint-disable-->
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">로그인</h1>
          <form @submit.prevent="loginForm">
            <fieldset class="form-group">
              <label for="email"
                ><b>이메일</b>
                <input
                  class="form-control form-control-lg"
                  id="email"
                  type="email"
                  v-model="email"
                />
              </label>
            </fieldset>
            <fieldset class="form-group">
              <label for="password"
                ><b>비밀번호</b>
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
import { LOGIN } from "../store/actions.type";

import apiUser from "../api/user.js";

export default {
  name: "App-Login",
  data() {
    return {
      email: "",
      password: "",
      users: "",
    };
  },

  methods: {
    async loginForm() {
      // API 요청시 전달할 userData 객체
      const userData = {
        email: this.email,
        password: this.password,
      };

      await apiUser
        .getUserInfo(userData)
        .then((response) => {
          // ID / PWD 일치하는 회원이 없는 경우
          if (response.data == "") {
            return alert("아이디와 비밀번호를 확인해주세요.");
          }

          // response data를 store에 저장
          this.$store.commit("setuserInfo", response.data);

          // sessionStorage에 사용자 data 저장
          sessionStorage.setItem("LoginUserInfo", JSON.stringify(this.$store.state.userInfo));

          this.$router.push({
            path: "/",
          });
        })
        .catch((error) => {
          console.log(`ERROR:${error}`);
        });
    },

    /* 카카오 로그인 연동 구현 예정 */

    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname,account_email",
        success: this.getKakaoAccount,
      });
      // window.Kakao.Auth.authorize({});
    },

    getKakaoAccount(authObj) {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          console.log(kakao_account);
          // 형식 (kakao_account) Map, json
          // json (Json.stringify(json))
          axios.post(BASE_URL, "posts", {
            //JSON.stringify(kakao_account);
          });
        },
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
