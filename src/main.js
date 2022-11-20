import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 注意：版本不同echarts的引入方式不同
import * as echarts from 'echarts'
// 挂载到Vue原型上
Vue.prototype.$echarts = echarts

//引入quill-editor编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/css/global.css'
import './assets/css/base.css'
// import { MessageBox } from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.use(VueQuillEditor)

Vue.use(ElementUI)
Vue.config.productionTip = false

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

// // http request 拦截器
// axios.interceptors.request.use(config => {
//   console.log(config);
//   config.headers.Authorization = window.sessionStorage.getItem('token');
//   // 在最后必须return
//   return config
// })


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
