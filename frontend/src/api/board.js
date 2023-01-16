import axios from 'axios';
/* eslint-disable */

export default {
    getArticles: function () {
      return axios.get('/board/read');
    },    
    getArticle: function (id) {
        return axios.get('/board/read' + `/${id}`);
    },
    postAritcle: function (BoardData) {
        return axios.post('/board/write', BoardData)
    },
    editArticle: function(id,BoardData){
        return axios.put(`/board/update/${id}`,BoardData)
    },
    
    delArticle: function(id){
        return axios.patch(`/board/delete/${id}`)
    }

};