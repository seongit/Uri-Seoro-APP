<template>
  <!--eslint-disable-->
  <div>
    <!--압력 폼 영역-->
    <form @submit.prevent="onSubmitCreateProject">
      <fieldset class="form-group">
        <div class="custom-form border-radius">
          <div class="custom-form-area">
            <div class="row">
              <div class="col-sm-1">
                <label for="" style="margin-left: -40px; margin-top: 5px">프로젝트명 * </label>
              </div>
              <div class="col-sm-4">
                <input
                  class="form-control border-radius"
                  type="text"
                  v-model="resObj.name"
                  @keyup="setIdentifierData()"
                  maxlength="60"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-sm-1">
                <label for="">설명 </label>
              </div>
              <!-- Toast-ui-Editor 영역-->
              <div class="col-sm-10 description-area">
                <div class="form-control border-radius">
                  <!-- Toast-ui-Editor -->
                  <!--에디터 기능 추후 구현 예정
                        <editor></editor> -->
                  <textarea
                    v-model="resObj.description"
                    class="form-control"
                    rows="10"
                    style="resize: none; width: 100%"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-1">
                <label for="">식별자 * </label>
              </div>
              <div class="col-sm-4">
                <input
                  class="form-control border-radius"
                  type="text"
                  id="inputIdentifier"
                  v-model="resObj.identifier"
                  @keyup="onKeyupIdentifier()"
                />
                <span>
                  1에서 100글자 소문자(a-z),숫자,대쉬(-)와 밑줄(_)만 가능합니다. 식별자는 저장후에는
                  수정할 수 없습니다.
                </span>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-1">
                <label for="">공개</label>
              </div>
              <div class="col-sm-4">
                <input
                  type="checkbox"
                  v-model="resObj.is_public_checked"
                  @click="setPublicTrueOrFalse()"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-sm-1">
                <label for="">모듈</label>
              </div>
              <div class="col-sm-4"><input type="checkbox" /> 일감관리</div>
            </div>
          </div>
        </div>
      </fieldset>

      <!--버튼 영역-->
      <div class="bottomBtn-area">
        <div class="bottomBtn">
          <div>
            <button type="submit" class="btn btn-nomal">확인</button>
            <button @click="historyBackPage" type="button" class="btn">취소</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import TheToastUIEditor from "./TheToastUIEditor.vue";

// api 호출
import apiProject from "../api/project.js";

export default {
  components: {
    editor: TheToastUIEditor,
  },
  props: {
    resObj: Object,
  },
  data() {
    return {
      name: "",
      identifier: "",
      description: "",
      is_public: false,
      is_public_checked: false,
    };
  },

  watch: {},

  // mounted(){

  //   // 사용자 상세 정보 조회
  //   if(this.$route.params.id > 0){
  //     this.getProjectDetail();
  //   }

  // },

  computed: {},

  methods: {
    // 식별자 inputbox에 직접 입력할 경우 validation check
    onKeyupIdentifier() {
      let identifier = this.resObj.identifier;

      // 한국어 입력 불가
      let customRegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

      if (customRegExp.test(identifier)) {
        console.log(customRegExp.test(identifier));
        identifier = identifier.replace(customRegExp, "");
      }

      identifier = identifier.replace(/[^a-z0-9_]+/gi, "-"); // remaining non-alphanumeric => hyphen
      identifier = identifier.toLowerCase(); // to lower
      identifier = identifier.substr(0, 100); // max characters

      this.resObj.identifier = identifier;
    },

    // 관리자 목록으로 이동
    projectsListPage() {
      this.$router.push({
        path: "/admin/projects",
      });
    },

    // 이전 페이지로 이동
    historyBackPage() {
      this.$router.go(-1);
    },

    // 체크박스 선택시 값 세팅
    setPublicTrueOrFalse() {
      if (this.resObj.is_public == true) {
        this.resObj.is_public = false;
      } else if (this.resObj.is_public == false) {
        this.resObj.is_public = true;
      }
    },

    // 폼 작성 완료 이후 확인 버튼 클릭 시 호출되는 메서드
    async onSubmitCreateProject() {
      if (this.formValidation()) {
        let project = {
          name: this.resObj.name,
          identifier: this.resObj.identifier,
          description: this.resObj.description,
          is_public: this.resObj.is_public,
        };

        console.log(this.$route.params.id);

        if (this.$route.params.id) {
          let requestProject = {
            project,
          };

          // 프로젝트 수정
          apiProject
            .editProject(this.$route.params.id, requestProject)
            .then((response) => {
              console.log(response);

              alert(`프로젝트 정보 수정 완료`);

              this.$router.push({
                path: "/admin/projects",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // 프로젝트 생성
          apiProject
            .createProject(project)
            .then((response) => {
              if (response.status == 200) {
                alert(`${response.data.project.name}이 정상적으로 생성 되었습니다.`);
                this.$router.push({
                  path: "/admin/projects",
                });
              }
            })
            .catch((error) => {
              alert(`${error.response.data.message}`);
            });
        }
      } else {
        return alert("필수값을 입력해주세요");
      }
    },

    // 필수값 입력 확인 메서드
    formValidation() {
      let result = false;

      let identifier = this.resObj.identifier;

      // 식별자에 한국어 입력 불가
      let customRegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

      if (customRegExp.test(identifier)) {
        // 식별자 초기화
        this.resObj.identifier = "";
        return result;
      }

      // 필수값 모두 입력 시 result = true;
      if (this.resObj.name != "" && this.resObj.identifier != "") {
        result = true;
      } else {
        console.log(this.name);
      }

      return result;
    },

    // 프로젝트명 Input 입력 데이터를 바탕으로 식별자 세팅
    // 1에서 100글자 소문자(a-z),숫자,대쉬(-)와 밑줄(_)만 가능합니다.
    setIdentifierData() {
      // 프로젝트 수정 시, 프로젝트명이 변경됨에 따라 식별자 또한 변경되지 않도록 처리함
      if (this.$route.params.id) {
      } else {
        let identifier = this.resObj.name;
        identifier = identifier.replace(/[^a-z0-9_]+/gi, "-"); // remaining non-alphanumeric => hyphen
        identifier = identifier.replace(/^[-_\d]*|[-_]*$/g, ""); // remove hyphens/underscores and numbers at beginning and hyphens/underscores at end
        identifier = identifier.toLowerCase(); // to lower
        identifier = identifier.substr(0, 100); // max characters

        this.resObj.identifier = identifier;
      }
    },
  },
};
</script>

<style scoped>
/* eslint-disable */
.col-md-1 {
  padding-left: 0px;
}

.col-sm-4 span {
  font-size: 12px;
}
</style>
