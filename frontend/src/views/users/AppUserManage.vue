<template>
  <!--eslint-disable-->
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ getPageTitle }}</h1>
          <form @submit.prevent="submitRegisterForm">
            <fieldset class="form-group">
              <!-- <label for="username"><b>이름</b> *
                  <input
                    class="form-control form-control-lg border-radius"
                    id="username"
                    type="text"
                    v-model="username"
                    placeholder="이름 입력"
                  />
              </label>
              <span v-if="msg.username">{{msg.username}}</span> -->
            </fieldset>
            <fieldset class="form-group row InputUserName-area">
              <label for="userfamilyName"
                ><b>성</b> *
                <input
                  class="form-control form-control-lg border-radius"
                  id="userfamilyName"
                  type="text"
                  v-model="userfamilyName"
                  placeholder="성 입력"
                  maxlength="10"
                />
              </label>

              <label for="username"
                ><b>이름</b> *
                <input
                  class="form-control form-control-lg border-radius"
                  id="username"
                  type="text"
                  v-model="username"
                  placeholder="이름 입력"
                  maxlength="20"
                />
              </label>

              <span v-if="msg.username">{{ msg.username }}</span>
            </fieldset>
            <fieldset class="form-group">
              <label for="loginID"
                ><b>ID</b> *
                <input
                  class="form-control form-control-lg border-radius"
                  id="loginID"
                  type="text"
                  v-model="loginID"
                  placeholder="ID 입력"
                  maxlength="20"
                />
                <span v-if="msg.loginID">{{ msg.loginID }}</span>
              </label>
            </fieldset>
            <fieldset class="form-group">
              <label for="email"
                ><b>이메일</b> *
                <input
                  class="form-control form-control-lg border-radius"
                  id="email"
                  type="text"
                  v-model="email"
                  placeholder="이메일 입력"
                />
                <span v-if="msg.email">{{ msg.email }}</span>
              </label>
            </fieldset>
            <fieldset class="form-group">
              <label v-if="isEditMode" for="password"
                ><b>비밀번호</b>
                <input
                  class="form-control form-control-lg border-radius"
                  id="password"
                  type="password"
                  v-model="password"
                  placeholder="숫자,대문자,소문자를 조합하여 8자리 이상입력"
                  maxlength="25"
                />
              </label>
              <label v-else for="password"
                ><b>비밀번호</b> *
                <input
                  class="form-control form-control-lg border-radius"
                  id="password"
                  type="password"
                  v-model="password"
                  placeholder="숫자,대문자,소문자를 조합하여 8자리 이상입력"
                  maxlength="25"
                />
              </label>
              <span v-if="msg.password">{{ msg.password }}</span>
            </fieldset>
            <fieldset class="form-group">
              <label v-if="isEditMode" for="check-password"
                ><b>비밀번호 확인</b>
                <input
                  class="form-control form-control-lg border-radius"
                  id="check-password"
                  type="password"
                  v-model="checkPassword"
                  placeholder="비밀번호 재입력"
                  maxlength="25"
                />
              </label>
              <label v-else for="check-password"
                ><b>비밀번호 확인</b> *
                <input
                  class="form-control form-control-lg border-radius"
                  id="check-password"
                  type="password"
                  v-model="checkPassword"
                  placeholder="비밀번호 재입력"
                  maxlength="25"
                />
              </label>
              <span v-if="msg.checkPassword">{{ msg.checkPassword }}</span>
            </fieldset>

            <fieldset class="form-group">
              <div class="userDetailInfo border-radius">
                <div class="userDetailInfo-area">
                  <b>사용자 세부 정보</b>
                  <ul class="list-unstyled">
                    <!--전체 선택일 경우 모든 데이터의 값이 세팅되도록 설정할 필요있음 -->
                    <!-- <input type="checkbox" id="completeAgreement" value="completeAgreement" v-model="allSelected">
                    <label for="completeAgreement">전체 선택</label> -->
                    <li v-for="(item, index) in checkList">
                      <input
                        type="checkbox"
                        :id="`option${index}`"
                        :value="item"
                        v-model="detailArr"
                        :key="index"
                        @click="setAdminTrueOrFalse()"
                      />
                      <label :for="index" :key="index + '1'">{{ item }}</label>
                    </li>
                  </ul>
                </div>
              </div>
            </fieldset>
            <!--필수 입력값이 공백일 경우 버튼 비활성화-->
            <button
              v-if="isFormEmpty"
              type="submit"
              class="btn disabledbtn btn-lg btn-block border-radius"
              disabled
            >
              {{ getBtnText }}
            </button>
            <button v-else type="submit" class="btn btn-lg btn-block border-radius">
              {{ getBtnText }}
            </button>
          </form>
        </div>
        <!--사이드바-->
        <div class="col-md-3">
          <the-admin-sidebar></the-admin-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import TheAdminSidebar from "@/components/TheAdminSidebar.vue";
import apiUser from "../../api/user";
import user from "../../api/user";

export default {
  components: { TheAdminSidebar },

  data() {
    return {
      username: "",
      userfamilyName: "",
      loginID: "",
      email: "",
      password: "",
      checkPassword: "",
      isAdmin: false,
      msg: [],
      checkList: ["관리자 입니다."],
      detailArr: [],
    };
  },

  mounted() {
    // 사용자 상세 정보 조회
    if (this.$route.params.id > 0) {
      this.getUserDetail();
    }
  },

  watch: {
    loginID(value) {
      this.loginID = value;
      this.validateLoginId(value);
    },

    email(value) {
      this.email = value;
      this.validateEmail(value);
    },

    password(value) {
      this.password = value;
      this.validatePassword(value);
    },

    checkPassword(value) {
      this.checkPassword = value;
      this.validateCheckPassword(value);
    },

    userfamilyName(value) {
      this.userfamilyName = value;
      this.validateName(value);
    },

    username(value) {
      this.username = value;
      this.validateName(value);
    },
  },

  // validation 필요 - vue- validation 사용 예정

  methods: {
    // 체크박스 선택시 값 세팅
    setAdminTrueOrFalse() {
      if (this.isAdmin == true) {
        this.isAdmin = false;
      } else if (this.isAdmin == false) {
        this.isAdmin = true;
      }
    },

    // 사용자 상세 조회
    async getUserDetail() {
      apiUser
        .getUserDetail(this.$route.params.id)
        .then((response) => {
          console.log(response);

          console.log(response.data.user);

          let resObj = response.data.user;

          this.username = resObj.firstname;
          this.userfamilyName = resObj.lastname;
          this.loginID = resObj.login;
          this.email = resObj.mail;

          if (resObj.admin == true) {
            // check box 선택하기 선택
            this.detailArr = true;
            this.isAdmin = true;

            // system admin의 경우 관리자 권한 해제 불가
            if (resObj.id == 1) {
              let checkboxSystemAdmin = document.getElementById("option0");
              checkboxSystemAdmin.setAttribute("disabled", true);
            }
          }
        })
        .catch((error) => {
          console.log(`ERROR:${error}`);
        });
    },

    // 회원가입 폼 등록
    async submitRegisterForm() {
      // 관리자 여부 확인
      const user = {
        firstname: this.username,
        lastname: this.userfamilyName,
        login: this.loginID,
        mail: this.email,
        password: this.password,
        admin: this.isAdmin,
      };

      // 사용자 정보 수정
      if (this.$route.params.id) {
        let requestUser = {
          user,
        };

        apiUser
          .editUser(this.$route.params.id, requestUser)
          .then((response) => {
            if (response.data == "201 OK") {
              this.editSuccess();
            }
          })
          .catch((error) => {
            console.log(`ERROR:${error}`);
            return alert("아이디와 비밀번호를 확인해주세요.");
          });
      } else {
        await apiUser
          .registerUser(user)
          .then((response) => {
            console.log(response);

            if (response.status == 200) {
              this.registerSuccess(response.data);
            }
          })
          .catch((error) => {
            return alert("아이디와 비밀번호를 확인해주세요.");
          });
      }
    },

    // 사용자 등록 완료
    registerSuccess(userData) {
      let fullname = userData.user.lastname + userData.user.firstname;

      alert(`${fullname}님을 등록하였습니다.`);

      // 폼 초기화
      this.initForm();

      // 사용자 전체 목록 페이지로 이동
      this.$router.push({
        path: "/users",
      });
    },

    // 사용자 정보 수정 완료
    editSuccess() {
      // 폼 초기화
      this.initForm();

      alert(`사용자 정보가 정상적으로 수정되었습니다.`);

      // 사용자 전체 목록 페이지로 이동
      this.$router.push({
        path: "/users",
      });
    },

    // 입력 폼 초기화
    initForm() {
      this.username = "";
      this.userfamilyName = "";
      this.loginID = "";
      this.email = "";
      this.password = "";
      this.checkPassword = "";
      this.isAdmin = false;
    },

    // loginID 유효성 검사
    validateLoginId(value) {
      //특수문자 / 문자 / 숫자 포함 형태의 5,20자리 이내의 아이디 정규식

      let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{5,20}$/;

      if (regExp.test(value) || value.length == 0) {
        this.msg["loginID"] = "";
      } else {
        this.msg["loginID"] = "유효하지 않은 아이디 입니다.";
      }
    },

    // email 유효성 검사
    validateEmail(value) {
      let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (regExp.test(value) || value.length == 0) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "유효하지 않은 이메일입니다.";
      }
    },

    // 비밀번호 유효성 검사
    validatePassword(value) {
      let regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

      if (regExp.test(value) || value.length == 0) {
        this.msg["password"] = "";
      } else {
        this.msg["password"] = "유효하지 않은 비밀번호입니다.";
      }
    },

    // 비밀번호 재확인 유효성 검사
    validateCheckPassword(value) {
      let regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

      if (regExp.test(value) || value.length == 0) {
        this.msg["checkPassword"] = "";
        // 재입력 비밀번호와 비밀번호가 불일치할 경우
        if (this.password !== this.checkPassword) {
          this.msg["checkPassword"] = "비밀번호가 일치하지 않습니다.";
        }
      } else {
        this.msg["checkPassword"] = "유효하지 않은 비밀번호입니다.";
      }
    },

    // 이름 유효성 검사
    validateName(value) {
      let regExp = /^[가-힣a-zA-Z]*$/;

      // 한글과 영문만 가능
      if (regExp.test(value)) {
        this.msg["username"] = "";
        this.msg["userfamilyName"] = "";
      } else {
        this.msg["username"] = "유효하지 않은 이름입니다.";
        this.msg["userfamilyName"] = "유효하지 않은 이름입니다.";
      }
    },
  },

  computed: {
    getPageTitle() {
      if (this.$route.params.id) return "사용자 정보 수정";
      return "새 사용자";
    },

    getBtnText() {
      if (this.$route.params.id) return "확인";
      return "사용자 등록";
    },

    // checkBox select
    // return boolean
    allSelected: {
      // 전체 선택 allSelected를 get/set으로 설정
      // get : checkList와 detailArr의 길이가 같으면 true,그 외는 flase로 전체 선택 checkBox 제어
      // set : 사용자가 선택한 selectList 데이터에 true일때는 checkList를 set, 그 외에는 [](빈값)을 set
      // getter
      get: function () {
        return this.checkList.length === this.detailArr.length;
      },

      // setter
      set: function (e) {
        this.detailArr = e ? this.checkList : [];
      },
    },

    // 회원가입 필수 입력 항목 확인하여 회원가입 버튼 활성화
    // retrun boolean
    // default -> true (비활성화) / false (활성화)
    isFormEmpty() {
      // 사용자 정보 수정의 경우 비밀번호는 필수 입력값 아님
      if (this.$route.params.id) {
        // 추후 리팩토링 필요
        // 필수 입력 값이 모두 기입되고, validation 검증 또한 완료하였을 때 사용자 등록버튼 활성화
        if (this.loginID && this.email && this.username && this.userfamilyName) {
          let validateAll =
            this.msg["loginID"] +
            this.msg["email"] +
            this.msg["username"] +
            this.msg["userfamilyName"];

          return validateAll.length > 0 ? true : false;
        } else return true;
      } else {
        // 추후 리팩토링 필요
        // 필수 입력 값이 모두 기입되고, validation 검증 또한 완료하였을 때 사용자 등록버튼 활성화
        if (
          this.loginID &&
          this.email &&
          this.password &&
          this.checkPassword &&
          this.username &&
          this.userfamilyName
        ) {
          let validateAll =
            this.msg["loginID"] +
            this.msg["email"] +
            this.msg["password"] +
            this.msg["checkPassword"] +
            this.msg["username"] +
            this.msg["userfamilyName"];

          return validateAll.length > 0 ? true : false;
        } else return true;
      }
    },

    // 비밀번호 필수값 화면단 제어
    // 사용자 정보 수정하기일 경우 비밀번호 변경은 필수 값이 아님
    isEditMode() {
      let userId = this.$route.params.id;
      return userId != "undefined" && userId > 0 ? true : false;
    },
  },
};
</script>

<style scoped>
.InputUserName-area {
  margin-left: 0px;
  justify-content: space-between;
}

label {
  display: inline;
}
fieldset {
  padding: 7px;
}
.userDetailInfo {
  background: #f3f3f3;
  border-radius: 14px;
  height: 200px;
  display: flex;
}

.userDetailInfo-area {
  width: 80%;
  height: 80%;
  margin: auto;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-size: 18px;
}

.btn {
  background: #fcd842;
}

.disabledbtn {
  background: #fcd74260;
}

.form-control {
  background: #ffffff;
  border: 1px solid #d9d9d9;
}

.border-radius {
  border-radius: 14px;
}
</style>
