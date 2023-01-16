<template>
    <!--eslint-disable-->
    <div class="container page">
    <h2>{{title}}</h2>

    <!--로그인한 사용자만 작성하기 버튼 보여짐 -->
    <div style="float:right; margin: 10px;">
        <div v-if="isUserLogin">
            <button @click="writeClicked" type="button" class="btn btn-outline-primary">작성하기</button>
         </div>
    </div>


    <table class="table table-hover">
        <thead>
        <tr>
            <th style="width:10%;">글번호</th>
            <th style="width:20%">제목</th>
            <th style="width:20%">작성자</th>
            <th style="width:20%">작성일</th>
            <th style="width:20%"> 조회수 </th>
        </tr>
        </thead>
        <tbody>
            <!-- eslint-disable-->
            <tr v-for="(row,idx) in articles" :key="idx" @click="rowClicked(`${row.id}`)">
                <td >
                    {{row.id}}
                </td>
                <td>{{row.title}}</td>
                <td>{{row.writer}}</td>
                <td>{{row.createdDate}}</td>
                <td>{{row.view}}</td>
            </tr>
        </tbody>
    </table>
        <!--페이징 처리 구현 필요-->
        <div style="display:flex">
            <div style="margin:auto">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>  
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import apiBoard from '../../api/board.js';

export default {
    data() {
        return {
            title : "게시판",
            articles : [],
        }
    },
    mounted() {
        apiBoard.getArticles()
        .then((response) => {
            this.articles = response.data;
        }).catch((e) => {
            console.log(e);
        })
    },
    // Header에서도 사용하고 있어서 전역적으로 사용할 필요가 있음 
    computed:{
        isUserLogin() {
            return this.$store.getters.isLogin;
        }
    },
    methods: {
        rowClicked(rowId){
            // 상세 페이지로 이동
            this.$router.push({
                path : `/board/detail/${rowId}`
            })
        },
        writeClicked(){
            this.$router.push({
                path : `/board/write/`
            })
        }
    }
}
</script>

<style scoped>
</style>