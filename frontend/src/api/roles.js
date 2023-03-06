/* eslint-disable */
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_API_URL 

export default {

  // 역할 전체 조회
  getRoles(){
    // 페이징처리 구현 필요
    return axios.get(`/role/getRoles`)
  },

}