/* eslint-disable */
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_API_URL 

export default {
    getIssues: function () {

      // 안됨 cors 에러 
      // return axios.get('http://100.0.0.157:30180/issues.json');

      // cors 에러 X , 404 에러 O 
      // return axios.get('/http://100.0.0.157:30180/issues.json');

      // nginx proxy_pass 경로를 /api 패턴일 경우 http://100.0.0.157로 설정
      // setupProxy 경로는 /api로 설정
  
      //return axios.get('/issues.json');

      // nginx proxy_pass 경로를 /api 패턴일 경우 http://100.0.0.157로 설정
      // setupProxy 경로는 /api로 설정
  

      // nginx proxy_pass 경로를 /api 패턴일 경우 http://100.0.0.157로 설정
      // setupProxy 경로는 /로 설정
      // return axios.get('/api/issues');


      return axios.get(`/issue/getIssues/test`);

      // 테스트 
      // return axios({
      //   method : "get",
      //   url: "/http://100.0.0.157:30180/issues.json",
      //   data: {
      //     firstName: 'Fred',
      //     lastName: 'Flintstone'
      //   }
      // })

    //   return axios.get('http://100.0.0.157:30180/issues.json',function (req, res) {
    //     req.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.send('Hello World');
    // });


    },

    // 첨부파일 token 생성
    postFileUploadCreateToken : function(FileData){
      return axios.post('/issue/uploads.json?',FileData)
    },


    
    // 일감 생성
    postIssue : function(IssueData){
      return axios.post('/issue/issues.json',IssueData)
    },

    // 유형 전체 목록 조회
    getTrackerList : function(){
      return axios.get('/issue/trackers.json')
    },

    // 일감 상태 목록 조회
    getIssueStatusArr : function(){
      return axios.get('/issue/issue_statuses.json')
    },

    // 우선 순위 전체 목록 조회
    getPrioritiesArr : function(){
      return axios.get('/issue/issue_priorities.json')
    },

    // 일감 상세 조회
    getIssueDetail : function(id){
      return axios.get(`/issue/${id}`)
    },

    // 일감 편집
    editIssue : function(id,IssueData){
      return axios.put(`/issue/${id}`,IssueData)
    },

    // 첨부파일 삭제
    deleteAttachment : function(id){
      return axios.delete(`/issue/attachment/${id}`)
    },

    // 일감 삭제
    deleteIssue : function(id){
      return axios.delete(`/issue/deleteIssue/${id}`)
    } 


};