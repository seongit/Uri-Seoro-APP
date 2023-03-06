/* eslint-disable */
import axios from 'axios';

// axios.defaults.baseURL = process.env.VUE_API_URL 

export default {

  // 구성원 전체 목록 조회
  getAllMembers(projectId){
    return axios.get(`/member/getAllMembers?projectId=${projectId}`)
  },

  // 구성원 상세 조회

  // 구성원 생성
  createMember(requestData,projectId){
    return axios.post(`/member/createMember?projectId=${projectId}`,requestData)
  },

  // 구성원 수정

  // 구성원 삭제
  deleteMember(id){
    return axios.delete(`/member/deleteMember/${id}`)
  }

}