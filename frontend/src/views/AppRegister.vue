<template>
  <!--eslint-disable-->
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">회원 가입</h1>
          <form @submit.prevent="submitRegisterForm">
            <fieldset class="form-group">
              <label for="email"><b>이메일</b> 
                  <input
                    class="form-control form-control-lg border-radius"
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="이메일 입력"
                  />
                  <span v-if="msg.email">{{msg.email}}</span>
              </label>
            </fieldset>
            <fieldset class="form-group">
              <label for="password"><b>비밀번호</b>
                  <input
                    class="form-control form-control-lg border-radius"
                    id="password"
                    type="password"
                    v-model="password"
                    placeholder="숫자,대문자,소문자를 조합하여 8자리 이상입력"
                  />
              </label>
              <span v-if="msg.password">{{msg.password}}</span>
            </fieldset>
            <fieldset class="form-group">
              <label for="check-password"><b>비밀번호 확인</b>
                  <input
                    class="form-control form-control-lg border-radius"
                    id="check-password"
                    type="password"
                    v-model="checkPassword"
                    placeholder="비밀번호 재입력"
                  />
              </label>
              <span v-if="msg.checkPassword">{{msg.checkPassword}}</span>
            </fieldset>
            <fieldset class="form-group">
              <label for="username"><b>이름</b>
                  <input
                    class="form-control form-control-lg border-radius"
                    id="username"
                    type="text"
                    v-model="username"
                    placeholder="이름 입력"
                  />
              </label>
              <span v-if="msg.username">{{msg.username}}</span>
            </fieldset>
            <fieldset class="form-group">
              <div class="service-policy border-radius">
                <div class="service-policy-area">
                  <b>서비스 정책</b>
                  <!--추후 해당 데이터가 DB에 담길 수 있도록 추가 개발 필요-->
                  <!--23.01.15 화면단만 구현하였음-->
                  <ul class="list-unstyled">
                    <input type="checkbox" id="completeAgreement" value="completeAgreement" v-model="allSelected">
                    <label for="completeAgreement">전체 동의</label>
                    <li v-for="(item,index) in checkList">
                      <input type="checkbox"
                        :id="index"
                        :value="item"
                        v-model="policyArr"
                        :key="index">
                        <label :for="item" :key="index + '1'">{{ item }}</label>
                    </li>
                  </ul>
                </div>
              </div>
            </fieldset>
            <!--필수 입력값이 공백일 경우 버튼 비활성화-->
            <button v-if="isFormEmpty" type="submit" class="btn disabledbtn btn-lg btn-block border-radius" disabled>
              회원가입
            </button>
            <button v-else type="submit" class="btn btn-lg btn-block border-radius">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import apiUser from '../api/user.js';

export default {
  name: 'signUp',
  data() {
    return {
      email: '',
      password: '',
      checkPassword: '',
      username: '',
      msg : [],
      checkList : ["만 14세 이상입니다. (필수)","서비스 이용약관 동의 (필수)","개인정보 수집 및 이용동의 (필수)"],
      policyArr : [],

    };
  },

  watch: {

    email(value){
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

    username(value) {
      this.username = value;
      this.validateName(value);
    },
    

  },

  methods: {

    // 회원가입 폼 등록 
    async submitRegisterForm() {

      // API 요청시 전달할 userData 객체
      const userData = {
        email : this.email,
        password : this.password,
        checkPassword : this.checkPassword,
        username : this.username,
      }

      // console.log("userData---->");
      // console.log(userData);

      await apiUser.registerUser(userData)
        .then((response) => {

          // 정상적으로 회원가입 완료 되었을 경우 
          this.registerSuccess(response.data);

        }).catch((e) => {

           // 백단에서 중복회원 방지 로직 error message : 이미 존재하는 회원입니다.

          //  console.log(e);
          //  console.log(e.response);
            if(e.response.data.status == "500"){
              // response는 200으로 주는게 좋음 -> 추후 개발 필요 
              // 클라이언트에서는 어떤 에러가 발생하였는지 모르는 게 해야함 
              return alert(`회원가입에 실패했습니다.`);
            }else{
              console.log(e.response.data)
            }
        })

    },

    // 회원 가입 완료 
    registerSuccess(userData){
      // 가입 후 폼 초기화
      this.initForm();

      alert(`${userData.username}님이 회원 가입 되었습니다.`);

      // 로그인 페이지로 이동
      this.$router.push({
        path : '/login'
      })

    },

    // 입력 폼 초기화 
    initForm() {
      this.email = '';
      this.password = '';
      this.checkPassword = '';
      this.username = '';
    },

    // email 유효성 검사 
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
        {
          this.msg['email'] = '';
        } else{
          this.msg['email'] = '유효하지 않은 이메일입니다.';
        } 
    },

    // 비밀번호 유효성 검사 
    validatePassword(value) {

      if(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(value)){
        this.msg['password'] = '';
      }else{
        this.msg['password'] = '유효하지 않은 비밀번호입니다.'
      }

    },

    // 비밀번호 재확인 유효성 검사
    validateCheckPassword(value) {
      if(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(value)){
        this.msg['checkPassword'] = '';
        // 재입력 비밀번호와 비밀번호가 불일치할 경우 
        if(this.password !== this.checkPassword) {
          this.msg['checkPassword'] = '비밀번호가 일치하지 않습니다.';
        }
      }else{
        this.msg['checkPassword'] = '유효하지 않은 비밀번호입니다.'
      }
    },

    // 이름 유효성 검사
    validateName(value){

      // 한글과 영문만 가능
      if(/^[가-힣a-zA-Z]*$/.test(value)){
        this.msg['username'] = '';

      }else{
        this.msg['username'] = '유효하지 않은 이름입니다.'
      }
    },

  },

  computed:{

    // 서비스 정책 checkBox select
    // return boolean
    allSelected : {
      // 전체 선택 allSelected를 get/set으로 설정
      // get : checkList와 policyArr의 길이가 같으면 true,그 외는 flase로 전체 선택 checkBox 제어
      // set : 사용자가 선택한 selectList 데이터에 true일때는 checkList를 set, 그 외에는 [](빈값)을 set
      // getter
      get: function(){
        return this.checkList.length === this.policyArr.length;
      },

      // setter
      set: function(e) {
        this.policyArr = e ? this.checkList : [];
      }

    },

    // 회원가입 필수 입력 항목 확인하여 회원가입 버튼 활성화
    // retrun boolean
    // default -> true (비활성화) / false (활성화)
    isFormEmpty(){

      // 추후 리팩토링 필요 
      if(this.email && this.password && this.checkPassword && this.username && this.allSelected){
        return false
      }else return true;
    
    },

  }


};
</script>

<style scoped>
label {
  display:inline;
}
fieldset {
  padding: 7px;
}
.service-policy {
  background: #F3F3F3;
  border-radius: 14px;
  height: 200px;
  display: flex;
}

.service-policy-area {
  width: 80%;
  height: 80%;
  margin: auto;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: 18px;
}

.btn {
  background: #FCD842;
}

.disabledbtn{
  background: #fcd74260;
}

.form-control {
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
}

.border-radius {
  border-radius: 14px;
}
</style>
