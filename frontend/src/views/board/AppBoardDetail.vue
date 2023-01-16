<template>
    <!--eslint-disable-->
  <div class="container page">

    <div>
        <h1>게시글 상세조회</h1>
        <header class="masthead">
            <div class="container position-relative px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <div class="post-heading">
                            <h3>{{article.title}}</h3>
                            <span class="meta">
                                Posted by
                                {{article.writer}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <article class="mb-4">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div>
                        {{ article.content }}
                    </div>
                </div>
            </div>
        </article>

        <!-- 삭제,수정은 작성자만 가능 -->
        <div style="display: flex; margin-top: 10px;">
            <div style="margin:auto">
                <div v-if="loginUserIswriter" class="btn-group">
                    <button @click="delArticle" type="button" class="btn btn-danger">삭제</button>
                    <button @click="boardArticleList" type="button" class="btn ">목록</button>
                    <button @click="editArticle" type="button" class="btn btn-warning">수정</button>
                </div>
                <div v-else class="btn-group">
                    <button @click="boardArticleList" type="button" class="btn ">목록</button>
                </div>
            </div>
        </div>
    </div>
  
  </div>
</template>

<script>
/* eslint-disable */
import apiBoard from '../../api/board';

export default {

    data() {
        return {
            article : '',
        }
    },
    mounted() {
        // 게시글 상세 조회 
        apiBoard.getArticle(this.$route.params.id)
        .then((response)=>{

            this.article = response.data;
            console.log(this.article);
        })
        .catch(function(e){
            console.log(e);
        })
    },

    computed : {
        // 로그인한 사용자가 게시글 작성자인지 확인하여 return  (boolean)
        loginUserIswriter() {
            var writer = this.article.userNo;
            var loginUser = this.$store.state.userInfo.userNo;

            if(writer !== loginUser){
                // 작성자 
                // console.log(this.article.userNo);
                // 로그인한 사용자
                // console.log(this.$store.state.userInfo.userNo);
                return false;
            }
            return true;
        }
        
    },

    methods: {
        // 게시판 내용 수정
        editArticle(){
            this.$router.push({
                path : `/board/write/${this.$route.params.id}`
            })
        },

        // 게시판 삭제 
        delArticle(){
            apiBoard.delArticle(this.$route.params.id)
            .then((response) => {

                // 정상적으로 삭제될 경우 alert
                // 게시중 = delYn = N = 0 
                // 삭제 완료 = delYn = Y = 1
                if(!response.data == '1'){
                   alert("게시글 삭제 실패하였습니다")
                }
                alert("정상적으로 삭제되었습니다.");
                this.boardArticleList();

            })
            .catch((e) => {
                console.log(e);
            })

        },

        // 게시글 전체 목록으로 이동
        boardArticleList(){
            this.$router.push({
                path : '/board'
            })

        }

    }
}
</script>

<style>
header.masthead {
  position: relative;
  margin-bottom: 3rem;
  padding-top: calc(3rem);
  padding-bottom: 3rem;
  background: no-repeat center center;
  background-color: #6c757d;
  background-size: cover;
  background-attachment: scroll;
}

header.masthead .page-heading,
header.masthead .post-heading,
header.masthead .site-heading {
  color: #fff;
}

header.masthead .page-heading,
header.masthead .site-heading {
  text-align: center;
}

header.masthead .page-heading .subheading,
header.masthead .site-heading .subheading {
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.1;
  display: block;
  margin-top: 0.625rem;
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

</style>