/* eslint-disable */
import axios from 'axios';

export default {


  // 프로젝트 상세 조회
  getProjectDetail(id){
    return axios.get(`/project/getProjectDetail/${id}`)
  },

  // 프로젝트 생성
  createProject(requestData){
    return axios.post(`/project/createProject`,requestData)
  },

  // 프로젝트 수정
  editProject(id,requestData){
    return axios.put(`/project/editProject/${id}`,requestData)
  },

  // 프로젝트 삭제
  deleteProject(id){
    return axios.delete(`/project/deleteProject/${id}`)
  }

}