<template>
  <!--eslint-disable-->
  <div>
    <div class="container page">
      <!--모달 영역-->
      <the-memeber-modal @reloadModal="increaseReloadComponent"></the-memeber-modal>

      <!--메인 컨텐츠 영역-->
      <div class="row">
        <!--새 구성원 버튼-->
        <div class="col-md-12">
          <div class="row" style="float: right">
            <div class="btn" @click="$modal.show('member-modal')">
              <font-awesome-icon icon="fa-solid fa-circle-plus" /> 새 구성원
            </div>
          </div>
        </div>

        <!--구성원 조회 영역-->
        <div class="col-md-12">
          <vuetable
            ref="vuetable"
            :api-url="this.setURLPath()"
            :fields="fields"
            data-path="memberships"
            pagination-path=""
            class="table table-hover table-height"
            @vuetable:pagination-data="onPaginationData"
            @vuetable:row-dblclicked="onRowDoubleClicked"
            :key="reloadComponent"
          >
            <div slot="status-slot" slot-scope="props">
              <!-- <div class="btn" @click="editBtnClick()">
                <font-awesome-icon icon="fa-solid fa-pen" /> 편집
              </div> -->
              <div class="btn" @click.prevent.stop="handleRowClick(props.rowData)">
                <font-awesome-icon icon="fa-solid fa-trash" /> 삭제
              </div>
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
        </div>

        <!--구성원 조회 영역 종료-->
      </div>
      <!--메인 컨텐츠 영역-->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TheMainMenu from "@/components/TheMainMenu.vue";
import TheProjectForm from "@/components/TheProjectForm.vue";
import TheSubMenu from "@/components/TheSubMenu.vue";
import TheMemeberModal from "@/components/Modal/TheMemberModal.vue";

import FieldsDef from "../vueTableDef/MemberFiledsDef.js";
import Vuetable from "../../../node_modules/vuetable-2/src/components/Vuetable.vue";
import VuetablePagination from "../../components/VuetablePagination.vue";
import cssConfig from "../../VuetableCssConfig";

// api 호출
import apiMember from "../../api/member.js";

export default {
  components: {
    TheMainMenu,
    TheProjectForm,
    TheSubMenu,
    TheMemeberModal,
    Vuetable,
    VuetablePagination,
  },
  data() {
    return {
      css: cssConfig,
      fields: FieldsDef,
      reloadComponent: 0,
      ClickedRowData: {},
    };
  },
  methods: {
    increaseReloadComponent() {
      this.reloadComponent++;
    },

    // 삭제 아이콘 클릭 시 호출되는 메소드
    handleRowClick(rowData) {
      // rowData 담아줌
      this.ClickedRowData = rowData;
      if (confirm("구성원을 삭제하시겠습니까?")) {
        apiMember
          .deleteMember(this.ClickedRowData.id)
          .then((response) => {
            console.log(response);

            if (response.data == "200 OK") {
              this.reloadComponent++;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    setURLPath() {
      let projectId = this.$route.params.id;
      let str = `/member/getAllMembers?projectId=${projectId}`;
      return str;
    },

    // 편집 버튼 클릭시 편집 영역 활성화
    editBtnClick() {
      // 편집 버튼을 다시 클릭하면 접힘
      this.isVisable == false ? (this.isVisable = true) : (this.isVisable = false);
    },
    // 삭제 버튼 클릭시 alert로 확인함
    deleteMember(id) {
      console.log(`id====>${id}`);
    },

    createMembersClick() {
      this.$router.push({
        path: "/",
      });
    },

    showDynamicComponentModal() {
      this.$modal.show(DemoCustomComponent, {
        text: "This text is passed as a property",
      });
    },

    /**
     * 페이징 처리 관련
     */

    // 화면 로딩 시, 페이징 처리 데이터를 세팅하는 메소드
    onPaginationData(obj) {
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

    // 페이지바 클릭 시 해당 페이지 번호가 담김
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },

    /**
     * 전체 목록 그리드 더블 클릭시 호출되는 메소드
     * @param {*} dataItem
     */
    onRowDoubleClicked(dataItem) {
      this.$router.push({
        path: `/projects/${dataItem.data.id}/settings`,
      });
    },
  },
};
</script>

<style scoped>
.col-md-11 {
  max-width: 98.5%;
}
</style>
