import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import NotFound from '@/components/NotFound.vue'

import HomePage from '@/components/menus/home/HomePage.vue'
import Outsiders from '@/components/menus/region/Outsiders.vue'
import Information from '@/components/menus/region/Information.vue'
import Others from '@/components/menus/others/Others.vue'
import Users from '@/components/menus/user/Users.vue'
import Rights from '@/components/menus/power/Rights.vue'
import Roles from '@/components/menus/power/Roles.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/home/homepage',
      children: [
        { path: 'homepage', component: HomePage },
        { path: 'outsiders', component: Outsiders },
        { path: 'information', component: Information },
        { path: 'others', component: Others },
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'roles', component: Roles }
      ]
    },
    { path: '*', component: NotFound }
  ]
})
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  if (to.path !== '/login') {
    // 从sessionStorage中获取到保存的token
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) {
      return next('/login');
    }
    next();
  }
  next();
})

export default router