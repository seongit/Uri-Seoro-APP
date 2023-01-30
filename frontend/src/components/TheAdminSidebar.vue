<template>
  <!--eslint-disable-->
    <!-- Sidebar-->
    <div class="sidebar">
        <div class="border-end bg-white" id="sidebar-wrapper">
            <div class="sidebar-heading border-bottom bg-light">관리</div>
            <div class="list-group list-group-flush">
              <router-link
                    class="list-group-item list-group-item-action list-group-item-light p-3"
                    active-class="active"
                    exact
                    :to="{ name: 'users' }"
                >
                 사용자
                </router-link>
                <router-link
                    class="list-group-item list-group-item-action list-group-item-light p-3"
                    active-class="active"
                    exact
                    :to="{ name: 'adminProjects' }"
                >
                 프로젝트
                </router-link>
                <router-link
                    class="list-group-item list-group-item-action list-group-item-light p-3"
                    active-class="active"
                    exact
                    :to="{ name: 'issues' }"
                >
                 일감 유형 및 상태
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .sidebar {
    padding: 5px 10px 10px;
    background: #f3f3f3;
    border-radius: 4px;
  }

  .list-group-item.active {
    z-index: 2;
    color: #000000;
    text-decoration: none;
    background-color: #FCD842;
    border-color: #FCD842;
  }
</style>
