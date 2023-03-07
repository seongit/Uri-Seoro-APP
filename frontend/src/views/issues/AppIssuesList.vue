<template>
  <!--일감 전체 조회-->
  <!--eslint-disable-->

  <!--

    리팩토링 필요
    AppIssueList와 AppProjectIssueList는 90%이상 동일한 소스이며,
    AppProjectIssueList를 별도로 생성한 이유는 프로젝트 기준으로 일감을 조회하기 위해서 입니다.
    소스코드 변경시 AppIssueList를 염두에 두고 변경할 것
  -->

  <div>
    <!--메뉴 헤더-->
    <the-main-menu></the-main-menu>

    <!--메인 메뉴-->
    <div class="container page">
      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-9">
          <h2>일감</h2>
        </div>

        <div class="col-md-3">
          <div class="row" style="float: right">
            <div class="btn">
              <router-link :to="{ name: 'issueCreate' }" v-if="isAdmin">
                <font-awesome-icon icon="fa-solid fa-circle-plus" /> 새 일감 만들기
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!--검색 영역-->
      <fieldset class="form-group">
        <div class="custom-search-form border-radius">
          <div class="custom-search-form-area">
            <br />
            <b>검색 조건</b>
            <br />
            <div class="row">
              <div class="col-sm-3 searchUser">
                <div>
                  <label for="searchStatus">상태</label>
                </div>
                <div>
                  <select
                    class="form-control"
                    id="searchStatus"
                    v-model="defaultStatusId"
                    @change="setSelect($event)"
                  >
                    <option v-for="(item, index) in statusesList" :key="index" :value="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-sm-9" style="float: right">
                <div class="row" style="float: right">
                  <div class="btn searchBtn" @click="setSearchStatusId(selectedStatus)">
                    <!--검색 버튼 -->
                    <img src="../../../public/images/searchBtn.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <!--api_url 변경 시 vuetable의 api 경로 또한 변경해야함-->
      <vuetable
        ref="vuetable"
        :api-url="this.setURLPath()"
        :fields="fields"
        @vuetable:row-dblclicked="onRowDoubleClicked"
        data-path="issues"
        pagination-path=""
        class="table table-hover table-height"
        @vuetable:pagination-data="onPaginationData"
        @vuetable:loading="onLoading"
        @vuetable:loaded="onLoaded"
        :key="reloadIssueComponent"
      >
        <div slot="test-slot" slot-scope="props">
          <div v-if="isVisableEditBtn">
            <div
              class="btn"
              @click.prevent.stop="handleRowClick($event, props.rowData, userPermission)"
            >
              <font-awesome-icon icon="fa-solid fa-ellipsis" />
            </div>
          </div>
          <div v-else></div>
        </div>
      </vuetable>

      <!-- 페이징 영역 -->
      <vuetable-pagination
        ref="pagination"
        :css="css.pagination"
        class="row"
        @vuetable-pagination:change-page="onChangePage"
      >
      </vuetable-pagination>

      <!--사용자 권한에 따라 조회되는 context-menu 항목이 달라야함 - 추후 구현 필요 -->

      <!--관리자 contextMenu -->
      <vue-simple-context-menu
        element-id="firstContextMenu"
        :options="StatusItemArrayForAdmin"
        ref="firstContextMenu"
        @option-clicked="statusClicked($event)"
      >
      </vue-simple-context-menu>

      <!--개발자 contextMenu -->
      <vue-simple-context-menu
        element-id="mySecondMenu"
        :options="StatusItemArrayForEditor"
        ref="editorContextMenu"
        @option-clicked="statusClicked($event)"
      >
      </vue-simple-context-menu>

      <!--사용자 contextMenu -->
      <vue-simple-context-menu
        element-id="userContextMenu"
        :options="StatusItemArrayForUsers"
        ref="userContextMenu"
        @option-clicked="statusClicked($event)"
      >
      </vue-simple-context-menu>

      <!-- contextMenu의 하위 contextMenu-->
      <vue-simple-context-menu
        element-id="statusContextMenu"
        :options="statusesList"
        ref="statusContextMenu"
        @option-clicked="subStatusClicked($event)"
      >
      </vue-simple-context-menu>

      <!---->
      <vue-simple-context-menu
        element-id="trackerContextMenu"
        :options="trackerList"
        ref="trackerContextMenu"
        @option-clicked="subStatusClicked($event)"
      >
      </vue-simple-context-menu>

      <vue-simple-context-menu
        element-id="priorityContextMenu"
        :options="priorityList"
        ref="priorityContextMenu"
        @option-clicked="subStatusClicked($event)"
      >
      </vue-simple-context-menu>

      <vue-simple-context-menu
        element-id="doneRatioContextMenu"
        :options="doneRatioList"
        ref="doneRatioContextMenu"
        @option-clicked="subStatusClicked($event)"
      >
      </vue-simple-context-menu>

      <!--메인 메뉴 끝-->
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import TheMainMenu from "../../components/TheMainMenu.vue";
import FieldsDef from "../vueTableDef/IssueFiledsDef.js";

import Vuetable from "../../../node_modules/vuetable-2/src/components/Vuetable.vue";
import VuetablePagination from "../../components/VuetablePagination.vue";
import cssConfig from "../../VuetableCssConfig";

import apiIssue from "../../api/issue.js";

export default {
  components: { TheMainMenu, Vuetable, VuetablePagination },
  data() {
    return {
      userPermission: 1, // 사용자 권한
      // 필드 항목 관리를 위해 별도의 파일로 구분하였음 (issueFiledsDef.js)
      fields: FieldsDef,
      // isVisableEditBtn : true => 버튼 조회
      // isVisableEditBtn : false => 버튼 미조회 (기본값) => 테스트를 위해 true로 변경하였음
      isVisableEditBtn: true,
      isDone: false,
      ClickedRowData: {},
      ClickedFirstContextMent: "",
      reloadIssueComponent: 0, // Issue 삭제 후 vuetable 컴포넌트만 업데이트하기 위해 사용하는 key 값
      selectedStatus: "",
      selectedSearchStatusID: "",
      defaultStatusId: 2,
      /**
       * 한계점 : 상위 context-menu에서 하위 context-menu를 갖도록 구현 필요
       * 현재는 각기 다른 context-menu를 호출하는 형식이기 때문에, 상위와 그에 따른 하위 항목들의 구분이 어려움
       * 또한, 하위 context의 menu는 db에서 조회하여 동적으로 구현할 필요가 있음 (e.g. 담당자등)
       *
       */
      StatusItemArrayForAdmin: [
        {
          name: "편집",
        },
        {
          name: "상태",
        },
        {
          name: "유형",
        },
        {
          name: "우선순위",
        },
        {
          name: "담당자",
        },
        {
          name: "진척도",
        },
        {
          name: "일감삭제",
        },
      ],

      StatusItemArrayForEditor: [
        {
          name: "편집",
        },
        {
          name: "일감삭제",
        },
      ],

      StatusItemArrayForUsers: [
        {
          name: "상세보기",
        },
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

      /** 페이징 처리 관련
       *  cssConfig : 페이징 처리 관련 css를 config 파일로 정의하였음
       */
      css: cssConfig,

      onLoading() {
        // console.log('loading... show your spinner here')
      },

      onLoaded() {
        // console.log('loaded! .. hide your spinner here')
      },
    };
  },

  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },

    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },

  mounted() {
    this.settingSelectBoxList();
  },

  methods: {
    setURLPath() {
      let str = "/issue/getIssues/test?";

      // vue-table에 조회할 데이터가 세팅되는 URL
      // 관리자 -> 전체 일감 조회됨
      // 개발자 -> 자신에게 할당된 일감 조회됨
      if (this.userPermission == 1) {
        str += "assigned_to_id=0";
      } else {
        str += "assigned_to_id=8";
      }

      // 검색 조건에 따라 검색 결과 변경
      if (this.selectedSearchStatusID == 5) {
        str += "&status_id=5";
      } else if (this.selectedSearchStatusID == 1) {
        str += "&status_id=1";
      } else {
        str += "&status_id=open";
      }

      // 프로젝트 내에서 일감 탭 선택 시
      if (!this.$route.params.id) {
        str += `&project_id=`;
      }

      return str;
    },

    // 검색조건 select박스에 change 이벤트마다 selectBox의 value 세팅하는 메서드
    setSelect(event) {
      // 이벤트가 발생한 타켓을 기준으로 하여 데이터 할당
      this.selectedStatus = parseInt(event.target.value);
    },

    // 검색 버튼 클릭시 검색 조건을 전역 변수에 세팅
    setSearchStatusId(param) {
      this.selectedSearchStatusID = param;
    },

    /**
     * 리팩터링 필요
     * 현재 TheIssueForm과 동일한 메서드를 중복으로 사용하고 있음
     */
    // 검색 조건 selectBox 세팅되는 메서드
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
          console.log(error);
        }),
        // 상태 전체 목록 조회
        apiIssue
          .getIssueStatusArr()
          .then((response) => {
            console.log(response);

            let res = response.data;

            // select box 세팅
            this.statusesList = res.issue_statuses;

            // select box 0번째 요소의 id를 초기값 설정
            this.statusId = res.issue_statuses[0].id;
          })
          .catch((error) => {
            console.log(error);
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
            console.log(error);
          });
    },

    // vuetable의 각 행을 클릭할 때 상세보기 페이지로 이동
    rowClicked(id) {
      this.$router.push({
        path: `/issues/${id}`,
      });
    },

    // 편집 아이콘 클릭 시 호출되는 메소드
    handleRowClick(event, rowData, userPermission) {
      // rowData 담아줌
      this.ClickedRowData = rowData;
      // context menu 팝업 출력됨

      // 사용자 권한별로 조회되는 context 항목 상이함
      // 1 == 관리자
      // 2 == 일감을 할당 받은 개발자 (본인 일감만 편집 가능)

      if (userPermission == 1) {
        this.$refs.firstContextMenu.showMenu(event);
      } else if (userPermission == 2) {
        this.$refs.editorContextMenu.showMenu(event);
      } else {
        this.$refs.userContextMenu.showMenu(event);
      }
    },

    /**
     * 리팩터링 필요
     * @param {} event
     */

    // 상위 context-menu 항목 클릭 시 호출되는 메소드
    statusClicked(event) {
      let clickedStatus = event?.option?.name;

      this.ClickedFirstContextMent = clickedStatus;

      // context-menu 중 어떤 항목을 체크 했는지 확인
      /**
       * 추후 리팩토링 필요
       * 한계점 : clickedStatus의 문구가 변경되었을 경우 해당 구문으로 들어오지 않음
       * */

      switch (clickedStatus) {
        case "상세보기":
          {
            this.$router.push({ path: `/issues/${this.ClickedRowData.id}` });
          }
          break;
        case "편집":
          {
            this.$router.push({ path: `/issues/${this.ClickedRowData.id}` });
          }
          break;
        case "상태":
          {
            //this.$refs.statusContextMenu.showMenu();
            let contextMenuEl = document.getElementById("firstContextMenu");
            contextMenuEl.addEventListener("click", this.showSubMenu(top, clickedStatus));
          }
          break;

        case "유형":
          {
            let contextMenuEl = document.getElementById("firstContextMenu");
            contextMenuEl.addEventListener("click", this.showSubMenu(top, clickedStatus));
          }
          break;

        case "우선순위":
          {
            let contextMenuEl = document.getElementById("firstContextMenu");
            contextMenuEl.addEventListener("click", this.showSubMenu(top, clickedStatus));
          }
          break;

        case "담당자":
          {
          }
          break;

        case "진척도":
          {
            let contextMenuEl = document.getElementById("firstContextMenu");
            contextMenuEl.addEventListener("click", this.showSubMenu(top, clickedStatus));
          }
          break;

        case "일감삭제":
          {
            if (confirm(`일감을 삭제하시겠습니까?`)) {
              apiIssue
                .deleteIssue(`${this.ClickedRowData.id}`)
                .then((response) => {
                  if (response.status == 200) {
                    this.reloadIssueComponent++;
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }

            this.hideAllMenu();
          }
          break;

        default:
          console.log("default 찍혔음");
      }

      // window.alert(JSON.stringify(this.ClickedRowData));
    },

    /**
     * 하위 context-menu 항목 클릭 시 호출되는 메소드
     * @param {*} params
     *
     */

    subStatusClicked(obj) {
      // console.log(obj);
      // console.log(obj?.option?.id);
      // console.log(obj?.option?.name);
      // console.log(params);

      let issue = {};

      let clickedOptionID = obj?.option?.id;

      let clickedOptionValue = obj?.option?.value;

      // 진척도의 경우 별도로 api를 호출하여 값을 세팅하는 형식이 아니기 때문에 value값을 세팅해야함

      switch (this.ClickedFirstContextMent) {
        case "상태":
          {
            issue.status_id = clickedOptionID;
          }
          break;

        case "유형":
          {
            issue.tracker_id = clickedOptionID;
          }
          break;

        case "우선순위":
          {
            issue.priority_id = clickedOptionID;
          }
          break;

        case "담당자":
          {
          }
          break;

        case "진척도":
          {
            issue.done_ratio = clickedOptionValue;
          }
          break;

        default:
          console.log("default 찍혔음");
      }

      let requestIssue = {
        issue,
      };

      apiIssue
        .editIssue(this.ClickedRowData.id, requestIssue)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            // 다음과 같이하면 에러남
            // Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/issues/227".
            // this.$router.push({
            //   path:`/issues/${this.$route.params.id}`
            // })

            // 뷰 테이블 새로 고침
            this.reloadIssueComponent++;
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // 하위 context-menu 항목 클릭 시, 하위를 포함한 상위 context-menu가 모두 사라진다.
      this.hideAllMenu(top);
    },

    /**
     * 상위 context-menu 클릭 시, 하위 context-menu 출력 메소드
     * @param {*} top
     */

    showSubMenu(top, clickedStatus) {
      this.hideAllSubMenu();

      console.log(top);
      console.log(clickedStatus);

      switch (clickedStatus) {
        case "편집":
          {
            this.$router.push({ path: `/issues/${this.ClickedRowData.id}` });
          }
          break;
        case "상태":
          {
            this.$refs.statusContextMenu.showMenu(top?.event);
          }
          break;

        case "유형":
          {
            this.$refs.trackerContextMenu.showMenu(top?.event);
          }
          break;

        case "우선순위":
          {
            this.$refs.priorityContextMenu.showMenu(top?.event);
          }
          break;

        case "담당자":
          {
          }
          break;

        case "진척도":
          {
            this.$refs.doneRatioContextMenu.showMenu(top?.event);
          }
          break;

        default:
          console.log("default 찍혔음");
      }
    },

    hideAllMenu() {
      this.$refs?.firstContextMenu.hideContextMenu();
      this.$refs?.editorContextMenu.hideContextMenu();
      this.hideAllSubMenu();
    },

    hideAllSubMenu() {
      this.$refs?.statusContextMenu.hideContextMenu();
      this.$refs?.trackerContextMenu.hideContextMenu();
      this.$refs?.statusContextMenu.hideContextMenu();
      this.$refs?.priorityContextMenu.hideContextMenu();
      this.$refs?.doneRatioContextMenu.hideContextMenu();
    },

    /**
     * 일감 전체 목록 그리드 더블 클릭시 호출되는 메소드
     * @param {*} dataItem
     */
    onRowDoubleClicked(dataItem) {
      console.log("데이터 : " + JSON.stringify(dataItem.data));
      console.log("이벤트 : " + JSON.stringify(dataItem.event));

      this.$router.push({
        path: `/issues/${dataItem.data.id}`,
      });
    },

    /**
     * 페이징 처리 관련
     */

    // 화면 로딩 시, 페이징 처리 데이터를 세팅하는 메소드
    onPaginationData(obj) {
      /*
      The pagination component assumes that the following information are available for its calculation
      total -- 사용 가능한 총 레코드 수
      per_page -- 각 페이지의 레코드 수(페이지 크기)
      current_page -- 이 데이터 청크의 현재 페이지 번호
      last_page -- 이 데이터의 마지막 페이지 번호
      next_page_url -- 다음 페이지의 URL
      prev_page_url -- 이전 페이지의 URL
      from --  페이지 크기와 관련하여 이 페이지의 시작 레코드
      to -- 페이지 크기와 관련하여 이 페이지의 끝 레코드
      */

      // vuetable-pagination에서 필요하는 데이터 형식에 맞게 가공
      let paginationData = {
        total: obj.total_count,
        per_page: obj.limit,
        current_page: obj.current_page,
        last_page: Math.ceil(obj.total_count / obj.limit) || 0,
        next_page_url: "/",
        prev_page_url: "/",
        from: 1,
        to: 10,
      };

      //console.log(paginationData);

      this.$refs.pagination.setPaginationData(paginationData);
    },

    /*
    
    totalPage-- 마지막 페이지 번호
    isOnFirstPage-- 현재 페이지 번호가 첫 번째 페이지인지 여부
    isOnLastPage-- 현재 페이지 번호가 마지막 페이지인지 여부
    notEnoughPages-- 모든 페이지가 슬라이딩 윈도우 크기보다 작은지 여부.
    windowSize-- 슬라이딩 페이지 매김 창의 크기. * 2 +1 로 계산됩니다 on-each-side.
    windowStart-- 이 슬라이딩 페이지 매김 창의 첫 번째 페이지 번호입니다.

    */

    // 페이지바 클릭 시 해당 페이지 번호가 담김
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
  },
};
</script>

<style scoped>
.context-menu-absolute {
  position: absolute;
  left: 1000px;
  top: 70px;
}
</style>
