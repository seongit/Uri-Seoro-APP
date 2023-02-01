<template>
  <!--eslint-disable-->
  <div>
    <!--압력 폼 영역-->
    <fieldset class="form-group">
      <div class="custom-form border-radius">
          <div class="custom-form-area ">

            <div class="row">
                <div class="col-sm-1">
                  <label for="">이름 * </label> 
                </div>
                <div class="col-sm-4">
                  <input
                  class="form-control border-radius"
                  type="text"
                  />
                </div>
            </div>


            <div class="row">
                <div class="col-sm-1">
                  <label for="">설명  </label> 
                </div>
                <div class="col-sm-4">
                  <input
                  class="form-control border-radius"
                  type="text"
                  />
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-1">
                  <label for="">식별자 * </label> 
                  
                </div>
                <div class="col-sm-4">
                  <input
                  class="form-control border-radius"
                  type="text"
                  />
                  <span>
                    1에서 100글자 소문자(a-z),숫자,대쉬(-)와 밑줄(_)만 가능합니다.
                    식별자는 저장후에는 수정할 수 없습니다.
                  </span>
                </div>
            </div>

                
            <div class="row">
                <div class="col-sm-1">
                  <label for="">공개</label> 
                </div>
                <div class="col-sm-4">
                  <input type="checkbox">
                </div>
            </div>

            <div class="row">
                <div class="col-sm-1">
                  <label for="">모듈</label> 
                </div>
                <div class="col-sm-4">
                  <input type="checkbox"> 일감관리
                </div>
            </div>

          </div>
        </div>
    </fieldset>

    <!--버튼 영역-->
    <div class="bottomBtn-area">
        <div class="bottomBtn">
            <div class="btn-group">
                <button @click="projectsListPage" type="button" class="btn">확인</button>
                <button @click="projectsListPage" type="button" class="btn">취소</button>
            </div>
        </div>
    </div>
      

  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods : {
    // 관리자 목록으로 이동
    projectsListPage(){
      this.$router.push({
        path: '/admin/projects'
      })
    }
  }
}
</script>

<style scoped>
/* eslint-disable */
.col-md-1 {
  padding-left: 0px;
}

.col-sm-4 span{
  font-size: 12px;
}


.bottomBtn-area {
  display: flex;
  margin-top: 0.5%;
}
.bottomBtn {
  margin:auto;
}

.bottomBtn button{
  margin-right: 10px;
}



</style>
