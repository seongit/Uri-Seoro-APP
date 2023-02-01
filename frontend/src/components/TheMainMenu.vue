<template>
  <!--eslint-disable-->
  <!--메인 메뉴입니다.-->
  <!--전체 div -->
  <div> 
    <nav class="navbar navbar-light">
      <div class="container">

        <!--메임 메뉴 제목-->
        <div class="custom-form">
          <h1>{{ getPageTitle }}</h1>
        </div>

        <!--메인 메뉴 항목 -->
        <div id="menu-item">
          <ul class="nav navbar-nav">
            <li class="nav-item ">
              <router-link
                  class="nav-link selected"
                  active-class="active"
                  exact
                  :to="{ name: 'projects' }"
              >
                프로젝트
                </router-link>
            </li>

            <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    exact
                    :to="{ name: 'admin' }"
                >
                  일감
                </router-link>
            </li>

            <!--관리자만 해당 항목 보이도록 구현 필요-->
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    exact
                    :to="{ name: 'projectEdit' }"
                >
                  설정
                </router-link>
            </li>

          </ul>
        </div>
  
      </div>
    </nav>
  </div>
</template>

<script>
/*eslint-disable */
export default {

  computed : {
    getPageTitle() {
      if(this.$route.params.id) return "프로젝트명"
    	return "Redmine"
    }
  }
}
</script>

<style>

#menu-item {
  height: 32px;
  background: #F3F3F3;
  padding-left: 3px;
}

#menu-item li a.selected {
  background: white;
  border-radius: 12%;
  color : #555;
  font-weight: bold;
}

#menu-item li {
  width: 7%;
}

#menu-item li a {
  text-align: center;
}


</style>