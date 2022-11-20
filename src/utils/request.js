import axios from "axios"
import store from "@/store"
import router from "@/router"
import { Message } from 'element-ui'
import sStorage from '@/utils/sessionStorage.js'
// 只能create一次
const require = axios.create({
  baseURL: 'https://lianghj.top:8888/api/private/v1/',
  // 设置了在10秒内请求数据 如果没有请求成功就执行错误函数
  timeout: 10 * 1000
})
//请求拦截器
require.interceptors.request.use(
  (config) => {
    // !在发送请求之前做什么
    // 每次发送请求之前都检测vuex是否存有token,放在请求头发送给服务器
    // ?这里用store获取，没有添加到请求头里，是因为页面刷新了？
    // if (store.getters.getToken) {
    //   config.headers.Authorization = store.getters.getToken;
    // }
    if (sStorage.get('token')) {
      config.headers.Authorization = sStorage.get('token');
    }
    return config;
  }, (error) => {
    // !对请求错误做什么
    console.log('在request拦截器显示错误:', error.response);
    return Promise.reject(error);
  });

// 响应拦截器
require.interceptors.response.use((response) => {
  // ！对响应数据做点什么
  // 对服务器返回的数据
  if (response.status === 200) {
    // 1.接口成功 return数据
    return response;
  } else if (response.data.meta.status === 401) {
    // 2.token过期
    Message.error('token过期,请重新登录');
    router.push('/login');
    window.local.reload();
    return false;
  } else {
    Message.error(response.data.msg);
    // return false;
    return Promise.reject(response);
  }
}, (error) => {
  // ！对响应错误做点什么
  if (error) {
    Message.error('网络错误');
    console.log('在respone拦截器显示错误：', error.response);
    return Promise.reject(error);
  }
});

export default {
  require
}