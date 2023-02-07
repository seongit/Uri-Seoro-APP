<template>
  <!--eslint-disable-->

  <modal
    name="member-modal"
    :min-width="200"
    :min-height="200"
    :reset="true"
    width="1030"
    height="635"
  >
  <div style="background:#F3F3F3"> 
    <div class="custom-form">
      <div class="custom-form-area">
        <div class="col-md-12">
         
          <div class="cancleBtn" @click="$modal.hide('member-modal')">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </div>

          <div class="row">
              <!--모달 헤더-->
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-11"><b>새 구성원</b></div>
                  <div class="col-md-1" style="float:right">
                    
                  </div>
                </div>
              </div>

        
                <!--모달 content 영역-->
                <div class="col-md-11" style="height:400px;" >
                    <div style="margin-bottom: 10px;">
                      <b>사용자 및 그룹 찾기</b> 
                      <input
                      class="form-control input-sm border-radius"
                      type="text"
                      />
                    </div>
                  
                  
                    <div class="objects-selection">

                      <!--div1 개에 label 4개씩 분리할 것-->
                      <div>
                        <label for="">
                          <input type="checkbox"> 
                          <span>Redmine admin</span>
                        </label>
                      </div>
                      <div>
                        <label for="">
                          <input type="checkbox"> 
                          <span>Redmine admin</span>
                        </label>
                      </div>

                    </div>
                </div>

              

              </div>
        </div>
        
          <div class="col-md-10">
             <b>역할 *</b>
              <div class="row">
                <div class="col-md-3">
                  <input type="checkbox" id="checkedAdmin">
                  <label for="checkedAdmin">관리자</label>
                </div>
                <div class="col-md-3">
                  <input type="checkbox" id="checkedDev">
                  <label for="checkedDev">개발자</label>
                </div>
              </div>
          </div>

      </div>
    </div>

 
    <!--버튼 영역-->
    <div class="bottomBtn-area" >
          <div class="bottomBtn">
              <div>
                  <button @click="" type="button" class="btn btn-nomal">확인</button>
                  <button @click="$modal.hide('member-modal')" type="button" class="btn">취소</button>
              </div>
          </div>
    </div>


  </div>
  </modal>
</template>
<script>
/* eslint-disable */
export default {
  name: 'SizeModalTest',
  data() {
    return {
      paragraphs: [null, null],
      timer: null
    }
  },
  methods: {

  }
}
</script>
<style scoped>

.objects-selection label{
  display: block;
}

.objects-selection>div{
  column-count: auto;
  column-width: 200px;
  -webkit-column-count: auto;
  -webkit-column-width: 200px;
  -webkit-column-rule: 1px solid #ccc;
}

.cancleBtn {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

</style>>