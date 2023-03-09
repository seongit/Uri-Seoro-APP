/* eslint-disable */
import axios from 'axios';
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.VUE_API_URL 
// 'http://100.0.0.157:10180';

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {


  // 사용자 전체 목록 조회
  // 페이징 처리 필요
  getAllUsers(searchWord){
    return axios.get(`/user/getAllUsers?searchWord=${searchWord}`)
  },
  
  // 사용자 생성
  registerUser : function(userData) {
    //return axios.post('/issue/signup',userData)
    return axios.post('/user/registerUser',userData);
  },

  // 로그인
  login : function(requestData){
    return axios.post('/user/login',requestData)
  },

  // 사용자 상세 조회
  getUserDetail(userNo){
    return axios.get(`/user/getDetailUser/${userNo}`)
  },

  // 사용자 정보 수정
  editUser(id,userData){
    return axios.put(`/user/editUser/${id}`,userData)
  },

  // 사용자 삭제
  deleteUser(id){
    return axios.delete(`/user/deleteUser/${id}`)
  }



}