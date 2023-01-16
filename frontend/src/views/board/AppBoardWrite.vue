<template>
    <!--eslint-disable-->
   <div class="container page">
        <form>
            <!--content-->
            <div>
                    <h1>{{ getBoardTitle }}</h1>
                <div>
                    <label for="board-title" class="form-label">제목</label>    
                    <input type="text" v-model="boardTitle" class="form-control" id="board-title" placeholder="제목">
                </div>
                <div>
                    <label for="board-content" class="form-label">내용</label>
                    <textarea v-model="boardContent" class="form-control" id="board-content" rows="10" style="resize:none"></textarea>
                </div>
                <div style="float:right; margin-top: 10px;">
                    <button @click="onSubmit" type="button" class="btn btn-success">{{ getBtnText }}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
/* eslint-disable */
import apiBoard from '../../api/board';

export default {
    data() {
        return {
            boardTitle : '',
            boardContent : '',
            writer : this.$store.state.userInfo.username,
            userNo : this.$store.state.userInfo.userNo
        }
    },

		mounted() {
			if(this.$route.params.id){
				apiBoard.getArticle(this.$route.params.id)
				.then((response) => {
					this.boardTitle = response.data.title,
					this.boardContent = response.data.content;
				}).catch((e) => console.log(e))
			}
		},

		computed : {
			getBoardTitle() {
				if(this.$route.params.id) return "게시물 수정"
				return "게시물 작성"
			},
			getBtnText() {
				if(this.$route.params.id)	return "수정"
				return "등록"
			}
		},

    methods: {
        onSubmit(){
            // 제목과 내용이 공백일 경우 return 
            if(!this.boardTitle || !this.boardContent){
                  return alert('제목과 내용을 작성해주세요');
                }

            const boardData = {
                title : this.boardTitle,
                content : this.boardContent,
                writer : this.writer,
                userNo : this.userNo,
            }

            // 파라미터가 있다면 게시글 수정
            if(this.$route.params.id){
                apiBoard
                        .editArticle(this.$route.params.id, boardData)
                        .then((response) => {
                            
                            console.log(response.data);

                            this.$router.push({
                                path: `/board/detail/${this.$route.params.id}`
                            })
                        })
                        .catch((e) => {console.log(e);});
                return;
            }
    

            apiBoard
                .postAritcle(boardData)
                .then((response) => {
                    // 정상 등록시 alert
                    alert('게시글이 정상적으로 등록되었습니다.');
                    // 게시판 전체 조회 페이지로 이동
                    this.$router.push({path:'/board'});

                })
                .catch((e) => {console.log(e);})


        }
    },


};
</script>

<style>

</style>
