<template>
  <!--eslint-disable-->
  <div class="container page">
    <div class="row">
      <div class="col-md-2" style="height: 1000px">
        <h2>사이드바</h2>

        <strong>Languages</strong>
        <div class="left-layout-css">
          <div v-for="(item, index) in languagesList" :key="index" :value="item.id">
            <!-- <label>{{ item.val }} {{ item.count }}</label> -->
            <span>{{ item.val }} </span>
            <span style="float: right">{{ item.count }}</span>
          </div>
        </div>

        <hr />

        <strong>Type</strong>
        <div class="left-layout-css">
          <div v-for="(item, index) in typeList" :key="index" :value="item.id">
            <span>{{ item.val }} </span>
            <span style="float: right">{{ item.count }}</span>
          </div>
        </div>

        <hr />

        <strong>Tag</strong>
        <div class="left-layout-css">
          <div v-for="(item, index) in tagList" :key="index" :value="item.id">
            <span>{{ item.val }} </span>
            <span style="float: right">{{ item.count }}</span>
          </div>
        </div>

        <hr />

        <strong>Repository</strong>
        <div class="left-layout-css">
          <div v-for="(item, index) in repositoryList" :key="index" :value="item.id">
            <span>{{ item.val }} </span>
            <span style="float: right">{{ item.count }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <h2>목록</h2>
        <div style="overflow-y: scroll; height: 1000px">
          <!--api_url 변경 시 vuetable의 api 경로 또한 변경해야함-->
          <vuetable
            ref="vuetable"
            :api-url="this.setURLPath()"
            :fields="fields"
            data-path="rules"
            pagination-path=""
            class="table table-hover table-height"
            @vuetable:pagination-data="onPaginationData"
          >
            <div slot="sonar-rule-slot" slot-scope="props">
              {{ props.rowData.name }}
            </div>
          </vuetable>

          <!--html 테스트용 
          <div>
            <ul>
              <li v-for="(item, index) in allRulesList">{{ item.name }}></li>
            </ul>
          </div>-->
        </div>
      </div>
      <vuetable-pagination
        ref="pagination"
        :css="css.pagination"
        class="row"
        style="margin: 0 auto"
        @vuetable-pagination:change-page="onChangePage"
      >
      </vuetable-pagination>

      <!-- <div class="col-md-1" @click="clickedShowMoreBtn">Show More</div> -->
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import Vuetable from "../../../node_modules/vuetable-2/src/components/Vuetable.vue";
import VuetablePagination from "../../components/VuetablePagination.vue";
import cssConfig from "../../VuetableCssConfig";

import FieldsDef from "../vueTableDef/SonarRuleFiledsDef.js";

import apiSonar from "../../api/sonar.js";

export default {
  components: { Vuetable, VuetablePagination },
  data() {
    return {
      /** 페이징 처리 관련
       *  FieldsDef : vue table에 대한 정의를 별도의 파일로 하였음
       *  cssConfig : 페이징 처리 관련 css를 config 파일로 정의하였음
       */
      fields: FieldsDef,
      css: cssConfig,
      allRulesList: [], // 테스트용
      languagesList: [],
      typeList: [],
      tagList: [],
      repositoryList: [],
    };
  },

  mounted() {
    this.getRulesList();
    this.getRulefacets();
  },

  methods: {
    /**
     * Rules List vue table
     * @param {*} page
     */
    setURLPath(page) {
      let str = "";
      if (page != undefined) {
        str = `/sonar/rules/search?page=${page}`;
        console.log("page ===> " + page);
      } else {
        str = `/sonar/rules/search`;
      }

      return str;
    },

    /**
     * 테스트
     */

    async getRulesList() {
      await apiSonar
        .getRulesList()
        .then((response) => {
          this.allRulesList = response.data.rules;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * get All Languages List
     */
    getRulefacets() {
      apiSonar
        .getRulefacets()
        .then((response) => {
          //console.log("[LOG] : " + JSON.stringify(response));

          let res = response.data.facets;
          this.languagesList = res[0].values;
          this.typeList = res[1].values;
          this.tagList = res[2].values;
          this.repositoryList = res[3].values;

          console.log(res[3]);
        })
        .catch((error) => {
          console.error(`[ERROR] : ${error}`);
        });
    },

    /**
     * 페이징 처리 관련
     */

    // 화면 로딩 시, 페이징 처리 데이터를 세팅하는 메소드
    onPaginationData(obj) {
      //console.log(obj);

      // vuetable-pagination에서 필요하는 데이터 형식에 맞게 가공
      let paginationData = {
        total: obj.total,
        per_page: obj.ps,
        current_page: obj.p,
        last_page: Math.ceil(obj.total / obj.ps) || 0,
        next_page_url: "/",
        prev_page_url: "/",
        from: 1,
        to: 100,
      };

      //console.log(paginationData.last_page);

      this.$refs.pagination.setPaginationData(paginationData);
    },

    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
  },
};
</script>

<style>
.left-layout-css {
  overflow-y: scroll;
  height: 20%;
  margin-bottom: 10px;
}
</style>
