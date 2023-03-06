<template>
  <!--eslint-disable-->
  <div>
    <div class="row tabs">
      <ul class="col-md-6">
        <li>
          <!--해당 프로젝트 내의 settings 폴더로 이동할 것-->
          <router-link :to="{ name: '' }" class="selected"> 프로젝트 설정 </router-link>
        </li>
        <li>
          <!--해당 프로젝트 내의 settings 폴더로 이동할 것-->
          <router-link :to="{ name: 'projectMembers' } "> 구성원 </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  props: {
    name: String,
  },
  data() {
    return {
      projectName: "",
    };
  },
};
</script>
