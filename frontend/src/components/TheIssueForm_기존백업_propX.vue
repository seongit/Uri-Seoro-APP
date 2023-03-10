<template>
  <!--eslint-disable-->
  <div>
    <!--압력 폼 영역-->
    <form @submit.prevent="onSubmitPostIssue">
      <fieldset class="form-group">
        <div class="custom-form border-radius">
          <div class="custom-form-area">
            <div class="row">
              <div class="col-md-2">
                <label for="selectBoxProject">프로젝트 * </label>
              </div>
              <div class="col-sm-3">
                <select class="form-control" id="selectBoxProject" @change="setSelect($event)">
                  <option v-for="(item, index) in projectList" :key="index" :value="item.value">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-2">
                <label for="selectBoxTracker">유형 * </label>
              </div>
              <div class="col-sm-3">
                <select class="form-control" id="selectBoxTracker" @change="setSelect($event)">
                  <option v-for="(item, index) in trackerList" :key="index" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-1"></div>

              <div class="col-md-2">
                <label for="selectBoxStatus">상태 * </label>
              </div>

              <div class="col-sm-3">
                <select class="form-control" id="selectBoxStatus" @change="setSelect($event)">
                  <option v-for="(item, index) in statusesList" :key="index" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-2">
                <label for="inputSubject">제목 * </label>
              </div>
              <div class="col-sm-10">
                <input
                  class="form-control border-radius"
                  type="text"
                  id="inputSubject"
                  v-model="subject"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-2">
                <label for="">설명 </label>
              </div>
              <!-- Toast-ui-Editor 영역-->
              <div class="col-sm-10 description-area">
                <div class="form-control border-radius">
                  <!-- Toast-ui-Editor -->
                  <!--에디터 기능 추후 구현 예정
                      <editor></editor>-->
                  <textarea
                    v-model="description"
                    class="form-control"
                    rows="10"
                    style="resize: none"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-2">
                <label>시작일자 </label>
              </div>
              <div class="col-sm-3">
                <!--캘린더-->
                <date-picker
                  v-model="issueStartDate"
                  value-type="format"
                  type="date"
                  placeholder="Start date"
                  >>
                </date-picker>
              </div>

              <div class="col-md-1"></div>

              <div class="col-md-3">
                <label>완료기한 </label>
              </div>
              <div class="col-sm-3">
                <!--캘린더-->
                <date-picker
                  v-model="issueDueDate"
                  value-type="format"
                  type="date"
                  placeholder="Close date"
                  >>
                </date-picker>
              </div>
            </div>

            <div class="row">
              <div class="col-md-2">
                <label for="priorityId">우선순위 * </label>
              </div>
              <div class="col-sm-3">
                <select class="form-control" id="selectBoxPriority" @change="setSelect($event)">
                  <option v-for="(item, index) in priorityList" :key="index" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-1"></div>

              <div class="col-md-3">
                <label for="selectBoxDoneRatio">진척도 </label>
              </div>
              <div class="col-sm-3">
                <select class="form-control" id="selectBoxDoneRatio" @change="setSelect($event)">
                  <option v-for="(item, index) in doneRatioList" :key="index" :value="item.value">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-2">
                <label for="assignedId">담당자</label>
              </div>
              <div class="col-sm-3">
                <select class="form-control" id="selectBoxAssignMember" @change="setSelect($event)">
                  <option
                    v-for="(item, index) in projectMembersList"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-1"></div>
            </div>

            <div class="row">
              <div class="col-md-2">
                <label for="">파일</label>
              </div>
              <div class="col-sm-5">
                <!--파일 업로드 시 생성됨-->
                <div class="row">
                  <!--첨부파일 업로드 시 반복적으로 생성되는 영역-->
                  <div
                    class="col-sm-11"
                    v-for="(item, index) in uploadFileList"
                    :key="index"
                    :value="item.id"
                  >
                    <div class="attachment-area">
                      <font-awesome-icon icon="fa-solid fa-paperclip" />
                      <span>{{ item.name }}</span>
                      <!--삭제 버튼-->
                      <font-awesome-icon
                        icon="fa-solid fa-trash"
                        class="btn"
                        @click="handleFileDelete(index)"
                      />
                    </div>
                  </div>
                  <!--첨부파일 업로드 시 반복적으로 생성되는 영역 끝-->
                </div>
                <!--파일 업로드 버튼 영역-->
                <div class="row">
                  <div class="col-sm-4 filebox">
                    <label for="file" class="btn btn-nomal">파일 찾기</label>
                    <input type="file" id="file" @change="handleFileChange" />
                  </div>
                  <div class="col-sm-8">
                    <p>(최대크기 : 5MB)</p>
                  </div>
                </div>
              </div>
            </div>

            <!--props 테스트 영역 -->
            <div>{{ test }}</div>
          </div>
        </div>
      </fieldset>

      <!--버튼 영역-->
      <div class="bottomBtn-area">
        <div class="bottomBtn">
          <div>
            <button type="submit" class="btn btn-nomal">확인</button>
            <!-- <button @click="onSubmitPostIssue" type="button" class="btn btn-nomal">확인</button>
                  <button @click="historyBackPage" type="button" class="btn">취소</button> -->
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/*eslint-disable */

/* calendar api  */
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

/* Editor api */
import TheToastUIEditor from "./TheToastUIEditor.vue";

// api 호출
import apiIssue from "../api/issue.js";
import { zip } from "rxjs";
import { fas } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable */
export default {
  components: {
    editor: TheToastUIEditor,
    DatePicker,
  },
  props: {
    test: String,
    objTest: Object,
  },
  data() {
    return {
      projectId: 0,
      trackerId: 0,
      statusId: 0,
      priorityId: 0,
      subject: "",
      description: "",
      assignedId: null, // 초기값이 0인 경우 api -> webclient -> 레드마인 api 호출 시, 422 에러 발생
      authorId: 0, // 작성자 seq No로 세팅 되도록 구현 필요
      doneRatio: 0,
      issueStartDate: "",
      issueDueDate: "",
      // api DB 상에서 조회되는 항목들로 구성 되도록 개발 필요
      projectList: [
        { name: "프로젝트 선택", value: 0 },
        { name: "테스트 레드마인입니다", value: 1 },
        { name: "Example name", value: 3 },
      ],
      trackerList: [],
      priorityList: [],
      statusesList: [],
      doneRatioList: [
        { name: "0%", value: 0 },
        { name: "10%", value: 10 },
        { name: "20%", value: 20 },
        { name: "30%", value: 30 },
        { name: "40%", value: 40 },
        { name: "50%", value: 50 },
        { name: "60%", value: 60 },
        { name: "70%", value: 70 },
        { name: "80%", value: 80 },
        { name: "90%", value: 90 },
        { name: "100%", value: 100 },
      ],

      // api DB 상에서 조회되는 항목들로 구성 되도록 개발 필요
      projectMembersList: [
        { name: "선택", value: 0 },
        { name: "Redmine", value: 1 },
        { name: "dev", value: 2 },
      ],
      uploadFileList: [],

      uploads: [],
    };
  },

  mounted() {
    this.settingSelectBoxList();
  },

  methods: {
    settingSelectBoxList() {
      // 유형 전체 목록 조회
      apiIssue
        .getTrackerList()
        .then((response) => {
          let res = response.data;
          // select box 세팅
          this.trackerList = res.trackers;

          // select box 0번째 요소의 id를 초기값 설정
          this.trackerId = res.trackers[0].id;
        })
        .catch((error) => {
          console.log(`ERROR:${error}`);
        }),
        // 상태 전체 목록 조회
        apiIssue
          .getIssueStatusArr()
          .then((response) => {
            let res = response.data;

            // select box 세팅
            this.statusesList = res.issue_statuses;

            // select box 0번째 요소의 id를 초기값 설정
            this.statusId = res.issue_statuses[0].id;
          })
          .catch((error) => {
            console.log(`ERROR:${error}`);
          }),
        // 우선 순위 전체 목록 조회
        apiIssue
          .getPrioritiesArr()
          .then((response) => {
            let res = response.data;

            // select box 세팅
            this.priorityList = res.issue_priorities;

            // select box 0번째 요소의 id를 초기값 설정
            this.priorityId = res.issue_priorities[0].id;
          })
          .catch((error) => {
            console.log(`ERROR:${error}`);
          });
    },

    // 폼 작성 완료 이후 확인 버튼 클릭 시 호출되는 메서드
    async onSubmitPostIssue() {
      /**
       * 일감 생성 시 다음과 같은 타입으로 POST 요청 보내기
       * "uploads": [
          {"token": "12.3cb5e4dcabd0133717a0d39eb83512d8ed34ba8abaa17c29f0d61139ff382c1c", "filename": "image.png", "content_type": "image/png"}
        ]
       */

      // 입력값 검증 후 JSONObject에 데이터 담기
      if (this.formValidation()) {
        // let IssueData =
        //             {
        //             "project_id" :  this.projectId,
        //             "tracker_id" : this.trackerId,
        //             "status_id" : this.statusId,
        //             "priority_id": this.priorityId,
        //             "subject" : this.subject,
        //             "description" : this.description,
        //             "assigned_to_id" : this.assignedId,
        //             "author_id" : this.authorId,
        //             "done_ratio" : this.doneRatio,
        //             "start_date" : this.issueStartDate,
        //             "due_date" : this.issueDueDate,
        //             "uploads" : this.uploads
        //           }

        let IssueData = {
          project_id: this.projectId,
          tracker_id: this.trackerId,
          status_id: this.statusId,
          priority_id: this.priorityId,
          subject: this.subject,
          description: this.description,
          assigned_to_id: this.assignedId,
          author_id: this.authorId,
          done_ratio: this.doneRatio,
          start_date: this.issueStartDate,
          due_date: this.issueDueDate,
          uploads: this.uploads,
        };

        apiIssue
          .postIssue(IssueData)
          .then((response) => {
            if (response.status == 200) {
              alert("일감 등록에 성공하였습니다.");
              this.IssuesListPage();
            } else {
              console.log(response);
            }
          })
          .catch((e) => {
            console.log(`ERROR:${e}`);
          });
      } else {
        // axios 500 에러 방지하기 위해 필수 입력값 미입력 시 alert
        return alert("필수값을 입력해주세요");
      }
    },

    // 필수값 입력 확인 메서드
    formValidation() {
      let result = false;

      // 필수값 모두 입력 시 result = true;

      if (
        this.projectId != 0 &&
        this.trackerId != 0 &&
        this.statusId != 0 &&
        this.subject != "" &&
        this.priorityId != 0
      ) {
        result = true;
      }

      return result;
    },

    // 정상적으로 등록 되었을 경우 일감 전체 목록 페이지로 이동 관리자 목록으로 이동
    IssuesListPage() {
      this.$router.push({
        path: "/issues",
      });
    },

    // 이전 페이지로 이동
    historyBackPage() {
      this.$router.go(-1);
    },

    // change 이벤트마다 selectBox의 value 세팅하는 메서드
    setSelect(event) {
      // 이벤트가 발생한 div의 id값을 기준으로 하여 데이터 할당
      let divId = event.target.id;
      let value = parseInt(event.target.value);

      switch (divId) {
        case "selectBoxProject":
          {
            this.projectId = value;
          }
          break;
        case "selectBoxTracker":
          {
            this.trackerId = value;
            console.log(value);
          }
          break;
        case "selectBoxPriority":
          {
            this.priorityId = value;
          }
          break;
        case "selectBoxStatus":
          {
            this.statusId = value;
          }
          break;
        case "selectBoxDoneRatio":
          {
            this.doneRatio = value;
          }
          break;
        case "selectBoxAssignMember":
          {
            // assignedId가 0일 경우 500 에러 발생
            // 만약 담당자 지정을 하지 않을 경우 null로 초기화
            value == 0 ? (this.assignedId = null) : (this.assignedId = value);
          }
          break;
      }
    },

    // 삭제 아이콘 클릭 시 - 특정 첨부파일 삭제
    handleFileDelete(idx) {
      // 화면단에서 첨부파일 삭제
      const removeFileList = this.uploadFileList;
      removeFileList.splice(idx, 1);

      // 해당 토큰 배열 삭제
      const removeToken = this.uploads;
      removeToken.splice(idx, 1);
    },

    // 첨부파일 세팅하는 메서드
    handleFileChange(event) {
      // 동일한 파일명이 연속으로 엽로드 될 경우, 화면단에는 1개만 조회됨
      // 파일명(1).확장자와 같은 형식으로 추후 구현 필요
      console.log(event.target.files[0].name);

      // 레드마인 관리자 페이지에서 첨부파일 최대 크기 변경 가능
      if (event.target.files[0].size > 5120000) {
        return alert("첨부파일의 최대크기는 5MB 입니다.");
      }

      this.uploadFileList.push(event.target.files[0]);

      // 자바스크립트로 직접 form 태그를 생성
      let formData = new FormData();

      // key : file - value : fileData 로 담아 form-Data 형식으로 api 호출
      formData.append("file", event.target.files[0]);

      //5120KB

      for (let key of formData.keys()) {
        console.log(key, ":", formData.get(key));
      }

      //api 호출해서 첨부파일 토큰 받아오기
      apiIssue
        .postFileUploadCreateToken(formData)
        .then((response) => {
          if (response.status == 200) {
            // 토큰 값 세팅하기 위해 json object 선언
            let setUploadObj = { id: "", token: "" };

            // response된 데이터 세팅
            setUploadObj.id = response.data.id;
            setUploadObj.token = response.data.token;

            // setUploadObj를 uploads 배열에 담아줌
            this.uploads.push(setUploadObj);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
/* eslint-disable */

.col-sm-9 {
  margin: auto;
}

.col-md-1 {
  padding-left: 0px;
}

.col-sm-4 span {
  font-size: 12px;
}

.filebox input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
</style>
