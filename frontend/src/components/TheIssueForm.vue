<template>
  <!--eslint-disable-->
  <div>
    <!--압력 폼 영역-->
    <fieldset class="form-group">
      <div class="custom-form border-radius">
          <div class="custom-form-area ">

            <div class="row">
                <div class="col-md-2">
                  <label for="">프로젝트 * </label> 
                </div>
                <div class="col-sm-3">
                  <select class="form-control" id="sel1">
                    <option>프로젝트명1</option>
                    <option>프로젝트명2</option>
                  </select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-2">
                  <label for="">유형 * </label> 
                </div>
                <div class="col-sm-3">
                  <select class="form-control" id="sel1">
                    <option>결함</option>
                    <option>새기능</option>
                    <option>지원</option>
                  </select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-2">
                  <label for="">제목 * </label> 
                  
                </div>
                <div class="col-sm-4">
                  <input
                  class="form-control border-radius"
                  type="text"
                  />
                </div>
            </div>

            <div class="row">
                <div class="col-md-2">
                  <label for="">설명  </label> 
                </div>
                <div class="col-sm-4 description-area">
                  <!--토스트 UI 에디터로 에디터 기능 구현 필요-->
                  <textarea class="form-control border-radius "></textarea>
                </div>
            </div>
            
 
            <div class="row">
                <div class="col-md-2">
                  <label for="">상태 * </label> 
                  
                </div>
                <div class="col-sm-3">
                  <select class="form-control" id="sel1">
                    <option>신규</option>
                  </select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-2">
                  <label for="">우선순위 * </label> 
                </div>
                <div class="col-sm-3">
                  <select class="form-control" id="sel1">
                    <option>낮음</option>
                    <option>보통</option>
                    <option>높음</option>
                    <option>긴급</option>
                  </select>
                </div>
            </div>


            <div class="row">
                <div class="col-md-2">
                  <label for="">파일</label> 
                </div>
                <div class="col-sm-5">
                  <div class="row">
                    <div class="col-sm-3">
                      <button class="btn btn-nomal">파일선택</button>
                    </div>
                    <div class="col-sm-9">
                      <p>(최대크기 : 5MB)</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </fieldset>

    <!--버튼 영역-->
    <div class="bottomBtn-area">
        <div class="bottomBtn">
            <div>
                <button @click="projectsListPage" type="button" class="btn btn-nomal">확인</button>
                <button @click="historyBackPage" type="button" class="btn">취소</button>
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
    },

    // 이전 페이지로 이동
    historyBackPage(){
      this.$router.go(-1);
    }

  }
}
</script>

<style scoped>
/* eslint-disable */


.col-sm-9 {
  margin: auto;
}

.col-md-1 {
  padding-left: 0px;
}

.col-sm-4 span{
  font-size: 12px;
}



</style>
