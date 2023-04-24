/* eslint-disable */
import axios from "axios";

export default {

  // 테스트
  getRulesList : function(){
    return axios.get(`/sonar/rules/search`)
  },

  // 
  getRulefacets : function(){
    return axios.get(`/sonar/rules/search`);
  },

  // Languages List 전체 목록 조회 (미사용)
  getAllLanguagesList : function(){
    return axios.get(`/sonar/languages/list`);
  }


  
}