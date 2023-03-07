/* eslint-disable */
import user from '@/api/user';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo : {
      username : '',
    },

    userMembershipInfo : []

  },
  getters: {
    isLogin(state){
      return state.userInfo.username !== '';
    },
    isAdmin(state){
      return state.userInfo.adminYN == 'Y';
    },

    getUserMemberShipInfo(state){
      return state.userMembershipInfo;
    },

    getUserInfo(state){
      return state.userInfo;
    }
  }, 
  

  mutations: {
    setuserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },

    setuserMembershipInfo(state, userMembershipInfo) {
      state.userMembershipInfo = userMembershipInfo;
  },

    clearUserInfo(state){
      state.userInfo = {
        username : '',
      };
    },

    // 테스트 - 전역적으로 사용가능여부 확인 필요 
    isUserLogin() {
      return this.$store.getters.isLogin;
    }, 

    // 현재 로그인 여부 체크하여 store에 저장
    isLoginCheck(){
      // sessionStorage.getItem("LoginUserInfo")에 데이터를 JSON으로 변환 
      var obj = JSON.parse(sessionStorage.getItem("LoginUserInfo"))
      
      // setuserInfo 계속 commit
      if(obj.userNo > -1 ){
        this.$store.commit('setuserInfo', obj);
      }
    },

  },
  actions: {
  },
  modules: {
  },
});
