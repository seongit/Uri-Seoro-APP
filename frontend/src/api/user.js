/* eslint-disable */
import axios from 'axios';
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://100.0.0.157:10180';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// export default {
//   registerUser : function(userData) {
//     return axios.post('/user/signup',userData);
//   },
//   getUserInfo : function(userData) {
//     return axios.post('/user/login',userData);
//   }
  
// }


export default {
  registerUser : function(userData) {
    //return axios.post('/test/signup',userData)
    return axios.post('/user/signup',userData);
  },
  getUserInfo : function(userData) {
    return axios.post('/user/login',userData);
  }
  
}