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
    <div style="background: #f3f3f3">
      <form @submit.prevent="submitCreateMemberForm">
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
                    <div class="col-md-1" style="float: right"></div>
                  </div>
                </div>
                <!--모달 content 영역-->
                <div class="col-md-11" style="height: 400px">
                  <!-- <div style="margin-bottom: 10px">
                    <b>사용자 및 그룹 찾기</b>
                    <input class="form-control input-sm border-radius" type="text" />
                  </div> -->
                  <div class="objects-selection">
                    <!--div1 개에 label 4개씩 분리할 것-->
                    <div>
                      <label
                        for="item.id"
                        v-for="(item, index) in usersArr"
                        :for="`user_${item.id}`"
                        :key="index + '1'"
                      >
                        <input
                          @click="selectedMembers(item.id)"
                          :id="`user_${item.id}`"
                          :value="item.id"
                          type="checkbox"
                        />
                        <span>{{ item.lastname }} {{ item.firstname }}</span>
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
        <div class="bottomBtn-area">
          <div class="bottomBtn">
            <div>
              <button v-if="isRoleChecked" type="submit" class="btn btn-nomal">확인</button>
              <button v-else type="submit" class="btn disabledbtn btn-nomal" disabled>확인</button>
              <button @click="$modal.hide('member-modal')" type="button" class="btn">취소</button>
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

export default {
  name: "MemberModal",
  emits: ["reloadModal"],
  data() {
    return {
      paragraphs: [null, null],
      timer: null,
      usersArr: [],
      rolesArr: [],
      requestMemberArr: [],
      requestRolesArr: [],
      reloadModal: 0,
      isRoleChecked: false,
    };
  },

  mounted() {
    // 사용자 전체 목록 조회
    apiUser
      .getAllUsers()
      .then((response) => {
        this.usersArr = response.data.users;
      })
      .catch((error) => {
        console.log(error);
      }),
      // 역할 목록 조회
      apiRoles
        .getRoles()
        .then((response) => {
          this.rolesArr = response.data.roles;
        })
        .catch((error) => {
          console.log(error);
        });
  },

  methods: {
    // 사용자 목록 check box 클릭 시 requestMemberArr 배열에 담김
    selectedMembers(userId) {
      if (this.requestMemberArr.includes(userId)) {
        // 기존 데이터에 userId가 있다면 삭제
        this.requestMemberArr.pop(userId);
      } else {
        this.requestMemberArr.push(userId);
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
    },

    // 역할 (=필수값) 선택 여부에 따른 확인 버튼 화면 제어
    setRolesCheckbox() {
      if (this.requestRolesArr.length > 0) {
        this.isRoleChecked = true;
      } else {
        this.isRoleChecked = false;
      }

      console.log();
    },

    // 구성원 생성 api 호출
    async submitCreateMemberForm() {
      let requestData = {
        user_ids: this.requestMemberArr,
        role_ids: this.requestRolesArr,
      };

      let projectId = this.$route.params.id;

      apiMember
        .createMember(requestData, projectId)
        .then((response) => {
          console.log(response);

          if (response.status == 200) {
            alert(`구성원 등록을 완료하였습니다.`);

            this.$modal.hide("member-modal");
            //정상적으로 구성원 등록이 완료되었을 경우에만 reloadModal
            this.$emit("reloadModal", this.reloadModal);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.objects-selection label {
  display: block;
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
