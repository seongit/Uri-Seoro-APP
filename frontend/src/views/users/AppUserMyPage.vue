<template>
  <!--eslint-disable-->
 <div>

    <!--페이지 메인 영역-->
    <div class="container page">
      <!--페이지 상단바-->
      <div class="row">
        <div class="col-md-9">
          <h2>내 페이지</h2>
        </div>
      </div>

      <!--전체 content 영역 -->
      <div class="row" >
        <div class="col-md-6 contents-area">
          <!--개별 content 영역--->
          <div class="content">
            <!--일감 전체 목록 페이지로 이동-->
            <router-link :to="{name:'issues'}">
              <p>내가 맡은 일감 (1)</p>
            </router-link>
            <div>
              <!--일감 전체 목록을 컴포넌트화하여 해당 영역에 추가 필요-->
            </div>
          </div>
        </div>
        <div class="col-md-6 contents-area">
          <!--개별 content 영역--->
          <div class="content">
            <router-link :to="{name:'issues'}">
              <p>보고한 일감 (2)</p>
            </router-link>
            <div> 
              <!--일감 전체 목록을 컴포넌트화하여 해당 영역에 추가 필요-->
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.row {
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: nowrap;
}

.contents-area p {
  font-size: 20px;
  font-weight: bold;
}

.contents-area {
  margin: 3px;
}

.content {
  margin-top: 2%;
  border: solid 1px #b5b4b4;
  border-radius: 3px;
  padding : 10px;
}

</style>
