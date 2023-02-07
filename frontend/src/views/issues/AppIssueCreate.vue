<template>
  <!--eslint-disable-->
  <div>

    <the-main-menu></the-main-menu>

    
    <div class="container page">

      <!--페이지 상단바-->
      <div class="row">
          <div class="col-md-9">
            <h2>새 일감 만들기</h2>
          </div>
        </div> 

      <!--입력 폼-->
      <the-issue-form></the-issue-form>

    </div>

  </div>
</template>

<script>
/*eslint-disable */
import TheMainMenu from '../../components/TheMainMenu.vue';
import TheIssueForm from '../../components/TheIssueForm.vue'

export default {
  components : {TheMainMenu,TheIssueForm}

}
</script>

<style>

</style>