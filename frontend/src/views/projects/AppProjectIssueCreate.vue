<template>
  <!--eslint-disable-->
  <div>
    <the-main-menu :name="name"></the-main-menu>

    <div class="container page">
      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-9">
          <h2>새 일감 만들기</h2>
        </div>
      </div>

      <!--입력 폼-->
      <the-issue-form :issueDetailObj="issueDetailObj"></the-issue-form>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import TheMainMenu from "../../components/TheMainMenu.vue";
import TheIssueForm from "../../components/TheIssueForm.vue";
import apiProject from "../../api/project.js";
import apiMember from "../..//api/member.js";

export default {
  components: { TheMainMenu, TheIssueForm },
  data() {
    return {
      name: "",
      issueDetailObj: {
        issueId: 0,
        projectId: 0,
        trackerId: 0,
        trackerName: "",
        statusId: 0,
        statusName: "",
        priorityId: 0,
        priorityName: "",
        subject: "",
        description: "",
        assignedId: null,
        assignedName: null,
        authorId: 0,
        doneRatio: 0,
        issueCreateDate: "",
        issueStartDate: "",
        issueDueDate: "",
        projectMembersList: [{ name: "선택", value: 0, id: 0 }],
      },
    };
  },

  mounted() {
    // 프로젝트 이름을 메뉴에 Setting하기 위함
    this.getProjectDetail();
  },

  methods: {
    async getProjectDetail() {
      await apiProject
        .getProjectDetail(this.$route.params.id)
        .then((response) => {
          let resObj = response.data.project;
          this.name = resObj.name;
          this.issueDetailObj.projectId = resObj.id;
          this.setSelectBoxDataToAssignedMember(this.issueDetailObj.projectId);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 구성원 목록 조회 api 호출
    setSelectBoxDataToAssignedMember(projectId) {
      apiMember
        .getAllMembers(projectId)
        .then((response) => {
          // selectBox
          let res = response.data;
          let membershipArr = res.memberships;
          // 프로젝트별 구성원 조회
          membershipArr.forEach((item) => {
            // console.log(item.user);
            this.issueDetailObj.projectMembersList.push(item.user);
          });

          // console.log(this.issueDetailObj.projectMembersList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
