/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AppLogin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/AppRegister.vue'),
  },

  {
    path: '/board',
    name: 'board',
    component: () => import('../views/board/AppBoardList.vue'),
  },
  {
    path: '/board/detail/:id',
    name: 'boardDetail',
    component: () => import('../views/board/AppBoardDetail.vue'),
  },
  {
    path: '/board/write/:id?',
    name: 'boardWrite',
    component: () => import('../views/board/AppBoardWrite.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/projects/AppAllProjectsList.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AppAdminPage.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/users/AppUserList.vue'),
  },
  {
    path: '/users/new',
    name: 'userCreate',
    component: () => import('../views/users/AppUserManager.vue'),
  },
  {
    path: '/users/:id/edit',
    name: 'userEdit',
    component: () => import('../views/users/AppUserManager.vue'),
  },
  {
    path: '/users/delete',
    name: 'userDelete',
    component: () => import('../views/users/AppUserDelete.vue'),
  },


];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
