<template>
  <!--eslint-disable-->
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ getPageTitle }}</h1>
          <form @submit.prevent="submitRegisterForm">
            <fieldset class="form-group">
              <label for="username"><b>이름</b> *
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
              <label for="userfamilyName"><b>성</b> *
                  <input
                    class="form-control form-control-lg border-radius"
                    id="userfamilyName"
                    type="text"
                    v-model="userfamilyName"
                    placeholder="성 입력"
                  />
              </label>
              <span v-if="msg.username">{{msg.username}}</span>
            </fieldset>
            <fieldset class="form-group">
              <label for="loginID"><b>ID</b> * 
                  <input
                    class="form-control form-control-lg border-radius"
                    id="loginID"
                    type="text"
                    v-model="loginID"
                    placeholder="ID 입력"
                  />
                  <span v-if="msg.email">{{msg.email}}</span>
              </label>
            </fieldset>
            <fieldset class="form-group">
              <label for="email"><b>이메일</b> *
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
              <label for="password"><b>비밀번호</b> *
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
              <label for="check-password"><b>비밀번호 확인</b> *
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
              <div class="userDetailInfo border-radius">
                <div class="userDetailInfo-area">
                  <b>사용자 세부 정보</b>
                  <!--추후 해당 데이터가 DB에 담길 수 있도록 추가 개발 필요-->
                  <!--23.01.15 화면단만 구현하였음-->
                  <ul class="list-unstyled">
                    <input type="checkbox" id="completeAgreement" value="completeAgreement" v-model="allSelected">
                    <label for="completeAgreement">전체 선택</label>
                    <li v-for="(item,index) in checkList">
                      <input type="checkbox"
                        :id="index"
                        :value="item"
                        v-model="detailArr"
                        :key="index">
                        <label :for="item" :key="index + '1'">{{ item }}</label>
                    </li>
                  </ul>
                </div>
              </div>
            </fieldset>
            <!--필수 입력값이 공백일 경우 버튼 비활성화-->
            <button v-if="isFormEmpty" type="submit" class="btn disabledbtn btn-lg btn-block border-radius" disabled>
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

import TheAdminSidebar from '@/components/TheAdminSidebar.vue';

export default {
  components : {TheAdminSidebar},
  
  data() {
    return {
      username: '',
      userfamilyName : '',
      loginID :  '',
      email: '',
      password: '',
      checkPassword: '',
      msg : [],
      checkList : ["관리자입니다.","다음 로그인 시 암호를 변경합니다."],
      detailArr : [],

    };
  },

  // validation 필요 - vue- validation 사용 예정
  

  methods: {

    // 회원가입 폼 등록 
    async submitRegisterForm() {

      // AppRegister.vue를 참고

      // 로그인 페이지로 이동
      this.$router.push({
        path : '/users'
      })

    },

    // 사용자 등록 완료 
    // registerSuccess(){
    //   // 폼 초기화
    //   this.initForm();

    // },

    // 입력 폼 초기화 
    initForm() {
      this.username = '';
      this.userfamilyName = '';
      this.loginID = '';
      this.email = '';
      this.password = '';
      this.checkPassword = '';
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

    getPageTitle () {
      if(this.$route.params.id) return "사용자 정보 수정"
    	return "새 사용자"
    },
    
    getBtnText() {
    	if(this.$route.params.id)	return "확인"
    	return "사용자 등록"
    },

    // checkBox select
    // return boolean
    allSelected : {
      // 전체 선택 allSelected를 get/set으로 설정
      // get : checkList와 detailArr의 길이가 같으면 true,그 외는 flase로 전체 선택 checkBox 제어
      // set : 사용자가 선택한 selectList 데이터에 true일때는 checkList를 set, 그 외에는 [](빈값)을 set
      // getter
      get: function(){
        return this.checkList.length === this.detailArr.length;
      },

      // setter
      set: function(e) {
        this.detailArr = e ? this.checkList : [];
      }

    },

    // 회원가입 필수 입력 항목 확인하여 회원가입 버튼 활성화
    // retrun boolean
    // default -> true (비활성화) / false (활성화)
    isFormEmpty(){
      // 추후 리팩토링 필요 
      if(this.email && this.password && this.checkPassword && this.username && this.allSelected){
        return false
      }else 
      return false;
      //return true; //테스르를 위해 주석 하였음 
    
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
  .userDetailInfo {
    background: #F3F3F3;
    border-radius: 14px;
    height: 200px;
    display: flex;
  }

  .userDetailInfo-area {
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
