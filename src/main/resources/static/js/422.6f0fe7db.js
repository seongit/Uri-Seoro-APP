"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[422],{3422:function(t,e,r){r.r(e),r.d(e,{default:function(){return u}});var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container page"},[e("form",[e("div",[e("h1",[t._v(t._s(t.getBoardTitle))]),e("div",[e("label",{staticClass:"form-label",attrs:{for:"board-title"}},[t._v("제목")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.boardTitle,expression:"boardTitle"}],staticClass:"form-control",attrs:{type:"text",id:"board-title",placeholder:"제목"},domProps:{value:t.boardTitle},on:{input:function(e){e.target.composing||(t.boardTitle=e.target.value)}}})]),e("div",[e("label",{staticClass:"form-label",attrs:{for:"board-content"}},[t._v("내용")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.boardContent,expression:"boardContent"}],staticClass:"form-control",staticStyle:{resize:"none"},attrs:{id:"board-content",rows:"10"},domProps:{value:t.boardContent},on:{input:function(e){e.target.composing||(t.boardContent=e.target.value)}}})]),e("div",{staticStyle:{float:"right","margin-top":"10px"}},[e("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.onSubmit}},[t._v(t._s(t.getBtnText))])])])])])},a=[],n=(r(7658),r(9477)),i={data(){return{boardTitle:"",boardContent:"",writer:this.$store.state.userInfo.username,userNo:this.$store.state.userInfo.userNo}},mounted(){this.$route.params.id&&n.Z.getArticle(this.$route.params.id).then((t=>{this.boardTitle=t.data.title,this.boardContent=t.data.content})).catch((t=>console.log(t)))},computed:{getBoardTitle(){return this.$route.params.id?"게시물 수정":"게시물 작성"},getBtnText(){return this.$route.params.id?"수정":"등록"}},methods:{onSubmit(){if(!this.boardTitle||!this.boardContent)return alert("제목과 내용을 작성해주세요");const t={title:this.boardTitle,content:this.boardContent,writer:this.writer,userNo:this.userNo};this.$route.params.id?n.Z.editArticle(this.$route.params.id,t).then((t=>{console.log(t.data),this.$router.push({path:`/board/detail/${this.$route.params.id}`})})).catch((t=>{console.log(t)})):n.Z.postAritcle(t).then((t=>{alert("게시글이 정상적으로 등록되었습니다."),this.$router.push({path:"/board"})})).catch((t=>{console.log(t)}))}}},s=i,l=r(1001),d=(0,l.Z)(s,o,a,!1,null,null,null),u=d.exports},9477:function(t,e,r){var o=r(6040);e["Z"]={getArticles:function(){return o.Z.get("/board/read")},getArticle:function(t){return o.Z.get(`/board/read/${t}`)},postAritcle:function(t){return o.Z.post("/board/write",t)},editArticle:function(t,e){return o.Z.put(`/board/update/${t}`,e)},delArticle:function(t){return o.Z.patch(`/board/delete/${t}`)}}}}]);
//# sourceMappingURL=422.6f0fe7db.js.map