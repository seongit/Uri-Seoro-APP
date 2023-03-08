/* eslint-disable */
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_API_URL 

export default {

  // 프로젝트 전체 목록 조회
  getAllProjects(isPublic){
    // 페이징처리 구현 필요
    return axios.get(`/project/getAllProjects?isPublic=${isPublic}&searchWord=`)
  },

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