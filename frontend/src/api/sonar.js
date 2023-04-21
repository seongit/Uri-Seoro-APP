/* eslint-disable */
import axios from "axios";

export default {

  // 
  getRulefacets : function(){
    return axios.get(`/sonar/rules/search`);
  },

  // Languages List 전체 목록 조회
  getAllLanguagesList : function(){
    return axios.get(`/sonar/languages/list`);
  }


  
}