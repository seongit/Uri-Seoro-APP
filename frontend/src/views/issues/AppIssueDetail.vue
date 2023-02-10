<template>
  <!--eslint-disable-->
  <div>
    <!--메뉴 헤더-->
    <the-main-menu></the-main-menu>

    <!--페이지 메인 영역-->
    <div class="container page">

      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-9">
          <!--형식 : [일감유형] #[일감id]-->
          <div class="row">
            <h2 class="col-md-2">결함 #1</h2>
            <div class="col-md-2 badge-area">
              <span class="badge badge-status-open ">진행중</span>  
            </div>
          </div>

        </div>
    
        <!--[편집][삭제] 버튼-->
        <!--관리자 + 작성자만 해당 버튼 보이도록 구현 필요-->
        <div class="col-md-3">

          <div class="row" style="float:right">
            <div class="btn" @click="editBtnClick()">
              <font-awesome-icon icon="fa-solid fa-pen" /> 편집
            </div>
            <div class="btn" @click="delIssue()">
              <font-awesome-icon icon="fa-solid fa-trash" /> 삭제
            </div>
          </div>
        </div>
      </div>

      <!--일감 조회 영역-->
      <div class="custom-form">
        <div class="custom-form-area">

          <div class="content-items-margin">
            <h3>제목</h3>
            <p><b>Redmind Admin</b>이(가) <b>23/01/26</b>에 추가함</p>            
          </div>

         
          <div class="row">
            <div class="col-sm-2">상태 : </div>
            <div class="col-sm-1">신규</div>
          </div>
     

          <div class="row content-items-margin" >
            <div class="col-sm-2">우선순위 : </div>
            <div class="col-sm-1">보통</div>
          </div>

          <hr>

          <div>
            <div class="content-items-margin">
              <b>설명</b>
            </div>
            <div>
              귀는 가치를 것은 청춘 무엇이 영락과 있는가? 하여도 피어나기 보이는 안고, 봄바람을 것이다. 거선의 가치를 그것을 내려온 동력은 것이다. 청춘 앞이 청춘의 가는 품에 사라지지 것이다. 인간에 천자만홍이 아니한 투명하되 그것은 가는 피는 것이다. 원질이 이상 꽃이 발휘하기 봄날의 이것이다. 곳이 튼튼하며, 그러므로 있는가? 청춘을 않는 인간의 돋고, 아름답고 속에 너의 때문이다. 것은 피가 심장의 품으며, 얼마나 작고 살았으며, 바이며, 봄바람이다.

무한한 이 동력은 고행을 투명하되 지혜는 이상 끓는다. 발휘하기 얼음 위하여 얼마나 약동하다. 갑 날카로우나 낙원을 따뜻한 수 얼음이 작고 동력은 끓는 말이다. 놀이 이성은 하는 것이다. 것은 오직 있는 많이 찾아다녀도, 수 사람은 가지에 거친 것이다. 새가 우리 노래하며 인간의 수 무엇을 철환하였는가? 끝까지 그것은 황금시대의 무엇을 그리하였는가? 생명을 날카로우나 우리는 튼튼하며, 기쁘며, 되려니와, 가슴이 온갖 청춘 때문이다. 청춘의 풍부하게 원질이 열락의 봄바람이다.

있는 되려니와, 힘차게 심장의 하였으며, 끓는 이것이다. 위하여, 못할 천하를 사는가 부패뿐이다. 새 것은 품었기 그들을 그들에게 돋고, 인간에 운다. 살았으며, 남는 청춘을 아니한 봄날의 아름답고 아니다. 풀밭에 꽃이 같지 속에 듣기만 목숨을 얼음이 끝까지 봄바람이다. 인도하겠다는 이 인간이 보이는 행복스럽고 사랑의 구할 그들의 봄바람이다. 피에 곳으로 쓸쓸한 피는 하여도 구할 지혜는 것이다. 대한 얼마나 인류의 트고, 피다. 맺어, 같으며, 돋고, 보내는 튼튼하며, 이상, 있다. 끝에 우리 그들에게 우리 청춘 무엇을 공자는 청춘의 같지 이것이다. 투명하되 갑 뜨거운지라, 이상, 품으며, 커다란 앞이 있다.
            </div>
          </div>

          <div class="content-items-margin">
            <hr>
          </div>
          

          <div style="height:100px;" class="content-items-margin">
          </div>

        </div>
      </div>

      <!--일감 편집 영역-->
      <div v-show="isVisable" class="content-items-margin">
        <div>
          <h3>편집</h3>
        </div>
        <the-issue-form></the-issue-form>
      </div>
    

    <!--메인 영역 끝-->
    </div>

  </div>  
</template>

<script>
import TheIssueForm from '../../components/TheIssueForm.vue';
/* eslint-disable */
import TheMainMenu from '../../components/TheMainMenu.vue';


export default {
  components : {TheMainMenu, TheIssueForm},

  data() {
    return {
      isVisable : false,
    }
  },
  methods : {
    // 편집 버튼 클릭시 편집 영역 활성화
    editBtnClick(){

      // 편집 버튼을 다시 클릭하면 접힘
      this.isVisable == false ? this.isVisable = true : this.isVisable = false;

    },
    // 삭제 버튼 클릭시 alert로 확인함
    delIssue(){
      window.alert('삭제하시겠습니까?');
    }
  }
}
</script>

<style>

.content-items-margin {
  margin-top:30px !important;;
  margin-bottom:30px !important;;
}

.badge-area {
  margin-top:1%;
}


</style>