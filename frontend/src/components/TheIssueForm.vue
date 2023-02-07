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
                <!-- Toast-ui-Editor 영역-->
                <div class="col-sm-10 description-area">
                  <div class="form-control border-radius ">
                    <!-- Toast-ui-Editor -->
                    <editor></editor>
                  </div>
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
                <div class="col-md-1">
                </div>
                <div class="col-md-3">
                  <label for="">시작일자 </label> 
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
                <div class="col-md-1">
                </div>
                <div class="col-md-3">
                  <label for="">완료기한 </label> 
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
                  <label for="">담당자</label> 
                </div>
                <div class="col-sm-3">
                  <select class="form-control" id="sel1">
                    <option></option>
                  </select>
                </div>
                <div class="col-md-1">
                </div>
                <div class="col-md-3">
                  <label for="">진척도 </label> 
                </div>
                <div class="col-sm-3">
                  <select class="form-control" id="sel1">
                    <option value="">0%</option>
                    <option value="">10%</option>
                    <option value="">20%</option>
                    <option value="">30%</option>
                    <option value="">40%</option>
                    <option value="">50%</option>
                    <option value="">60%</option>
                    <option value="">70%</option>
                    <option value="">80%</option>
                    <option value="">90%</option>
                    <option value="">100%</option>
                  </select>
                </div>
            </div>


            <div class="row">
                <div class="col-md-2">
                  <label for="">파일</label> 
                </div>
                <div class="col-sm-5">
                  <!--파일 업로드 시 생성됨-->
                  <div class="row">
                    <!--첨부파일 업로드 시 반복적으로 생성되는 영역-->
                      <div class="col-sm-11">
                        <div class="attachment-area">
                          <font-awesome-icon icon="fa-solid fa-paperclip" />
                          <span>첨부파일명.png</span>
                          <!--삭제 버튼-->
                          <div style="float:right">
                            <div class="btn" @click="confirmDelete('첨부파일명')">
                              <font-awesome-icon icon="fa-solid fa-trash" />
                            </div>
                          </div>
                        </div>  
                      </div>
                    <!--첨부파일 업로드 시 반복적으로 생성되는 영역 끝-->
                  </div>
                  <!--파일 업로드 버튼 영역-->
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
import TheToastUIEditor from './TheToastUIEditor.vue';

/* eslint-disable */
export default {
  components : {
    editor : TheToastUIEditor
  },
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
    },

    confirmDelete(pram){
      confirm(`${pram} 삭제하시겠습니까?`);
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


.attachment-area {
  margin-right: 10px;
}


</style>
