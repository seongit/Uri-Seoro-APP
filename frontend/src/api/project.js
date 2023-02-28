/* eslint-disable */
import axios from 'axios';

export default {


  // 프로젝트 상세 조회

  // 프로젝트 생성

  // 프로젝트 수정

  // 프로젝트 삭제
  deleteUser(id){
    return axios.delete(`/project/deleteProject/${id}`)
  }

}