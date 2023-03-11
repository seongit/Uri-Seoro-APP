<template>
  <!--eslint-disable-->

  <modal
    name="member-modal"
    :min-width="200"
    :min-height="200"
    :reset="true"
    width="600"
    height="550"
    class="modal-area"
  >
    <div style="background: #f3f3f3; height: 100%">
      <form @submit.prevent="submitCreateMemberForm">
        <div class="custom-form">
          <div class="custom-form-area">
            <div class="col-md-12">
              <div class="cancleBtn" @click="closeModal">
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </div>
              <div class="row">
                <!--모달 헤더-->
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-11"><h3>새 구성원</h3></div>
                    <div class="col-md-1" style="float: right"></div>
                  </div>
                </div>
                <!--모달 content 영역-->
                <div class="col-md-12">
                  <div style="margin-bottom: 10px">
                    <b>사용자 및 그룹 찾기</b>
                    <div class="row" style="justify-content: space-between">
                      <div class="col-md-7">
                        <input
                          class="form-control input-sm border-radius"
                          type="text"
                          @change="setTmpSearchWord($event)"
                        />
                      </div>
                      <div class="col-md-3">
                        <div @click="setSearchWord(tmpSearchWord)">
                          <!--검색 버튼 -->
                          <img src="../../../public/images/searchBtn.png" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 objects-selection">
                      <b>사용자 전체 목록</b>
                      <label
                        for="item.id"
                        v-for="(item, index) in usersArr"
                        :for="`user_${item.id}`"
                        :key="index + '1'"
                      >
                        <input
                          @click.prevent.stop="selectedMembers(index, item)"
                          :id="`user_${item.id}`"
                          :value="item.id"
                          type="checkbox"
                        />
                        <span>{{ item.lastname }} {{ item.firstname }}</span>
                      </label>
                    </div>

                    <div class="col-md-6 objects-selection">
                      <b>선택된 사용자</b>
                      <label
                        for="item.id"
                        v-for="(item, index) in requestMemberArr"
                        :for="`user_${item.id}`"
                        :key="index + '1'"
                      >
                        <span>{{ item.lastname }} {{ item.firstname }}</span>
                        <div
                          class="cancleBtn"
                          @click.prevent.stop="cancleRequestMember(index, item)"
                        >
                          <font-awesome-icon icon="fa-solid fa-xmark" style="margin: auto" />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-10">
              <b>역할 *</b>
              <div class="row">
                <div class="col-md-3" v-for="(item, index) in rolesArr">
                  <input
                    @click="selectRoles(item.id)"
                    :id="`role_${item.id}`"
                    :value="item.id"
                    type="checkbox"
                  />
                  <label :for="`role_${item.id}`" :key="index + '1'">{{ item.name }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--버튼 영역-->
        <div class="bottomBtn-area" style="margin-bottom: 3%">
          <div class="bottomBtn">
            <div>
              <button v-if="isRoleChecked" type="submit" class="btn btn-nomal">확인</button>
              <button v-else type="submit" class="btn disabledbtn btn-nomal" disabled>확인</button>
              <button @click="closeModal" type="button" class="btn">취소</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
/* eslint-disable */

import apiUser from "../../api/user.js";
import apiRoles from "../../api/roles.js";
import apiMember from "../../api/member.js";
import { of } from "rxjs";

export default {
  name: "MemberModal",
  emits: ["reloadModal"],
  data() {
    return {
      paragraphs: [null, null],
      timer: null,
      usersArr: [],
      membersArr: [],
      rolesArr: [],
      requestMemberArr: [],
      requestRolesArr: [],
      reloadModal: 0,
      isRoleChecked: false,
      tmpSearchWord: "",
      enteredSearchWord: "",
    };
  },

  mounted() {
    // 구성원 전체 목록 조회
    this.getAllMembers();
    // 사용자 전체 목록 조회
    this.getAllUsers();

    // 역할 목록 조회
    apiRoles
      .getRoles()
      .then((response) => {
        this.rolesArr = response.data.roles;
      })
      .catch((error) => {
        console.log(`ERROR:${error}`);
      });
  },

  methods: {
    closeModal() {
      this.$modal.hide("member-modal");
      // 요청 MEMber 초기화
      this.requestMemberArr = [];
      this.requestRolesArr = [];
      location.reload();
    },

    /**
     * 검색 조건 입력 후 change Event가 발생하면 tmpSearchWord 변수에 해당 값이 담김
     * @param {*} event
     */
    setTmpSearchWord(event) {
      this.tmpSearchWord = event.target.value;
    },

    /**
     * 검색 버튼 클릭 시, enteredSearchWord 변수에 tmpSearWord의 값이 담김
     * @param {*} param
     */
    setSearchWord(param) {
      this.enteredSearchWord = param;
      this.getAllUsers(this.enteredSearchWord);
    },

    // project Member 조회
    async getAllMembers() {
      let projectId = this.$route.params.id;

      await apiMember
        .getAllMembers(projectId)
        .then((response) => {
          let memberships = response.data.memberships;
          this.membersArr = memberships;
        })
        .catch((error) => {
          console.log(`ERROR:${error}`);
        });
    },

    async getAllUsers(params) {
      let searchWord = "";

      if (params != "") {
        searchWord = this.enteredSearchWord;
      }

      await apiUser
        .getAllUsers(searchWord)
        .then((response) => {
          // console.log(this.membersArr.length);

          // memberships의 데이터가 undefined일 경우를 대비하여 ?.length로 접근
          let countMember = this.membersArr?.length;
          let memberArr = this.membersArr;
          const usersArr = response.data.users;

          if (countMember > 0) {
            const uniqueUsersArr = []; // 새로운 배열 선언

            for (let j = 0; j < usersArr.length; j++) {
              let isDuplicate = false;
              for (let i = 0; i < memberArr.length; i++) {
                if (memberArr[i].user.id == usersArr[j].id) {
                  isDuplicate = true;
                  break;
                }
              }
              if (!isDuplicate) {
                uniqueUsersArr.push(usersArr[j]); // 중복되지 않은 요소만 새로운 배열에 추가
              }
            }
            // 사용자 중 해당 프로젝트의 구성원이 아닌 경우에만  this.usersArr에 세팅
            this.usersArr = uniqueUsersArr;
          } else {
            this.usersArr = usersArr;
          }
        })
        .catch((error) => {
          console.log(`ERROR:${error}`);
        });
    },

    //
    cancleRequestMember(idx, memberObj) {
      let temMemberArr = this.requestMemberArr;
      if (this.requestMemberArr.includes(memberObj)) {
        // 기존 데이터에 userId가 있다면 삭제
        const result = temMemberArr.filter((value, index, arr) => {
          if (index !== idx) return arr;
        });

        this.requestMemberArr = result;

        this.usersArr.push(memberObj);
      } else {
        this.requestMemberArr.push(memberObj);
      }
    },

    // 사용자 목록 check box 클릭 시 requestMemberArr 배열에 담김
    selectedMembers(idx, userObj) {
      // console.log(userObj.id);

      if (this.requestMemberArr.includes(userObj)) {
        // 기존 데이터에 userId가 있다면 삭제
        this.requestMemberArr.pop(userObj);
      } else {
        this.requestMemberArr.push(userObj);
      }

      if (this.usersArr.includes(userObj)) {
        const removeUserArr = this.usersArr;
        removeUserArr.splice(idx, 1);
      }
    },

    // 역할 check box 클릭 시 requestRolesArr 배열에 담김
    selectRoles(roleId) {
      if (this.requestRolesArr.includes(roleId)) {
        // 기존 데이터에 roleId가 있다면 삭제
        this.requestRolesArr.pop(roleId);
      } else {
        this.requestRolesArr.push(roleId);
      }
      this.setRolesCheckbox();
      console.log(`${this.requestRolesArr}`);
    },

    // 역할 (=필수값) 선택 여부에 따른 확인 버튼 화면 제어
    setRolesCheckbox() {
      if (this.requestRolesArr.length > 0) {
        this.isRoleChecked = true;
      } else {
        this.isRoleChecked = false;
      }
    },

    // 구성원 생성 api 호출
    async submitCreateMemberForm() {
      let requestMemberIdArr = [];

      this.requestMemberArr.forEach((element) => {
        requestMemberIdArr.push(element.id);
      });

      let requestData = {
        user_ids: requestMemberIdArr,
        role_ids: this.requestRolesArr,
      };

      let projectId = this.$route.params.id;

      apiMember
        .createMember(requestData, projectId)
        .then((response) => {
          // console.log(response);

          if (response.status == 200) {
            // 초기화
            this.requestMemberArr = [];
            this.requestRolesArr = [];
            alert(`구성원 등록을 완료하였습니다.`);

            this.$modal.hide("member-modal");
            //정상적으로 구성원 등록이 완료되었을 경우에만 reloadModal
            this.$emit("reloadModal", this.reloadModal);
            this.$modal.hide("member-modal");
          }
        })
        .catch((error) => {
          console.log(`ERROR:${error}`);
        });
    },
  },
};
</script>
<style scoped>
.objects-selection {
  height: 200px;
  overflow-y: scroll;
  margin-bottom: 5%;
}

.userList-area {
}

.objects-selection > label {
  display: flex;
}

.objects-selection > div {
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
</style>
>
