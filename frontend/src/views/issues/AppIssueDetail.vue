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
            <h2 class="col-md-3"> {{ isseuDetailObj.trackerName }} # {{ isseuDetailObj.issueId }} </h2>
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
            <h3>{{ isseuDetailObj.subject }}</h3>
            <p><b>Redmind Admin</b>이(가) <b>{{ isseuDetailObj.issueCreateDate }}</b>에 추가함</p>            
          </div>

         
          <div class="row content-items-margin content-items-space" >
            <div class="col-sm-2">상태 : </div>
            <div class="col-sm-1">{{ isseuDetailObj.statusName }}</div>

            <div class="col-sm-2">우선순위 : </div>
            <div class="col-sm-1">{{ isseuDetailObj.priorityName }}</div>

            <div class="col-sm-2">진척도 : </div>
            <div class="col-sm-1">{{ isseuDetailObj.doneRatio }}%</div>
      
          </div>
     

          <div class="row content-items-margin content-items-space" >
            <div class="col-sm-2">시작일자 : </div>
            <div class="col-sm-1">{{ isseuDetailObj.issueStartDate }}</div>

            <div class="col-sm-2">완료기한 : </div>
            <div class="col-sm-1">{{ isseuDetailObj.issueDueDate }}</div>

            <div class="col-sm-2">담당자 : </div>
            <div class="col-sm-1">{{ isseuDetailObj.assignedName }}</div>

          </div>

          <hr>

          <div>
            <div class="content-items-margin">
              <b>설명</b>
            </div>
            <div>
              {{ isseuDetailObj.description }}
            </div>
          </div>

          <div class="content-items-margin">
            <hr>
          </div>
          

          <div style="height:5px;" class="content-items-margin">
          </div>
        
          <div class="col-sm-11" v-for="(item,index) in attachments"
          :key="index"
          :value="item.id">
            <div class="attachment-area">
              <font-awesome-icon icon="fa-solid fa-paperclip" />
              <a :href="item.content_url">{{ item.filename }}</a>
              <!--삭제 버튼-->
              <!--관리자 + 담당자만 해당 버튼 보이도록 할 것 -->
              <font-awesome-icon icon="fa-solid fa-trash" class="btn" @click="handleFileDelete(index)" />
            </div>  
            <div class="attachment-area">
              <a :href="item.content_url">
                <img class="attachment-item" :src="item.thumbnail_url">
              </a>
            </div>
    
          </div>

        </div>
      </div>

      <!--일감 편집 영역-->
      <div v-show="isVisable" class="content-items-margin">
        <div>
          <h3>편집</h3>
        </div>
        <the-issue-form :isseuDetailObj="isseuDetailObj"></the-issue-form>
      </div>
    

    <!--메인 영역 끝-->
    </div>

  </div>  
</template>

<script>
import TheIssueForm from '../../components/TheIssueForm.vue';
/* eslint-disable */
import TheMainMenu from '../../components/TheMainMenu.vue';
import apiIssue from '../../api/issue'

export default {
  components : {TheMainMenu, TheIssueForm},

  data() {
    return {
      isVisable : false,
      issueId : 0,
      trackerName : '',
      statusName : '',
      priorityName : '',
      subject : '',
      description : '',
      assignedName : null,
      doneRatio : 0,
      issueCreateDate : '',
      issueStartDate : '',
      issueDueDate : '',
      attachments : [],
      isseuDetailObj : {
        issueId : 0,
        projectId : 0,
        trackerId : 0,
        trackerName : '',
        statusId : 0,
        statusName : '',
        priorityId : 0,
        priorityName : '',
        subject : '',
        description : '',
        assignedId : null, 
        assignedName : null,
        authorId : 0, 
        doneRatio : 0,
        issueCreateDate : '',
        issueStartDate : '',
        issueDueDate : '',
      },
    }
  },

  mounted(){

    apiIssue.getIssueDetail(this.$route.params.id).then((response) => {
      
      this.statusName = response.data.issuse;

      let issueObj = response.data.issue;

      console.log(response.data);

      this.isseuDetailObj.issueId = issueObj.id;

      this.isseuDetailObj.projectId = issueObj.project.id;

      this.isseuDetailObj.trackerId = issueObj.tracker.id;

      this.isseuDetailObj.trackerName = issueObj.tracker.name;

      this.isseuDetailObj.statusId = issueObj.status.id;

      this.isseuDetailObj.statusName = issueObj.status.name;

      this.isseuDetailObj.priorityId = issueObj.priority.id;

      this.isseuDetailObj.priorityName = issueObj.priority.name;

      this.isseuDetailObj.subject = issueObj.subject;

      this.isseuDetailObj.description  = issueObj.description;

      this.isseuDetailObj.doneRatio = issueObj.done_ratio;

      this.isseuDetailObj.issueCreateDate = this.formattingDate(issueObj.created_on);

      if(issueObj.start_date != null){
    
        this.issueStartDate = this.formattingDate(issueObj.start_date);

        this.isseuDetailObj.issueStartDate = issueObj.start_date;

        console.log(this.isseuDetailObj);
        
      }else {
        this.isseuDetailObj.issueStartDate = '-';
      }

      if(issueObj.due_date != null){

        this.isseuDetailObj.issueDueDate = this.formattingDate(issueObj.due_date)
        this.isseuDetailObj.issueDueDate = issueObj.due_date;
        console.log(this.isseuDetailObj);

      }else {
        this.isseuDetailObj.issueDueDate = '-';
      }

      if(issueObj.assigned_to != null){
        this.isseuDetailObj.assignedId = issueObj.assigned_to.id;
        this.isseuDetailObj.assignedName = issueObj.assigned_to.name;
      }else{
        this.isseuDetailObj.assignedName = '-';
      }

      this.attachments = issueObj.attachments;

      // this.objTest = {
      //   "subject" : this.subject,
      //   "description" : this.description,
      //   "projectId" : issueObj.project.id,
      //   "statusId" : issueObj.status.id,
      // }


    }).catch((error) => {
      console.log(error);
    })

  },

  methods : {
    // 편집 버튼 클릭시 편집 영역 활성화
    editBtnClick(){

      // 편집 버튼을 다시 클릭하면 접힘
      this.isVisable == false ? this.isVisable = true : this.isVisable = false;



    },
    // 삭제 버튼 클릭시 alert로 확인함
    delIssue(){
      window.confirm('삭제하시겠습니까?');
    },

    formattingDate(param){

      let yy = param.substring(2,4)
      let mm = param.substring(5,7);
      let dd = param.substring(8,10);

      let formatData = yy + "/" + mm + "/" + dd
      
      return formatData;
    },

    setIssueFormComponentValue(){

    }


  },
}
</script>

<style>

.content-items-margin {
  margin-top:30px !important;
  margin-bottom:30px !important;
}

.content-items-space > div {
  margin-right:30px !important;
}

.badge-area {
  margin-top:1%;
}

.attachment-item {
  width:3%;
  height:3%;
  border-radius: 3px;
  cursor: pointer;
}


</style>