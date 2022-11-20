import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/views/Login.vue') },
    {
      path: '/home',
      component: () => import('@/views/Main.vue'),
      redirect: '/home/homepage',
      children: [
        { path: 'homepage', component: () => import('@/views/module/home/HomePage.vue') },
        { path: 'outsiders', component: () => import('@/views/module/region/Outsiders.vue') },
        { path: 'information', component: () => import('@/views/module/region/Information.vue') },
        { path: 'others', component: () => import('@/views/module/others/Others.vue') },
        { path: 'users', component: () => import('@/views/module/user/Users.vue') },
        { path: 'rights', component: () => import('@/views/module/power/Rights.vue') },
        { path: 'roles', component: () => import('@/views/module/power/Roles.vue') }
      ]
    },
    { path: '*', component: NotFound }
  ]
})
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  const token = window.sessionStorage.getItem('token');
  if (token) {
    if (to.path === '/login') {
      next('/home');
    } else {
      next();
    }
  } else {
    // 无token
    if (to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
  }
})

export default router