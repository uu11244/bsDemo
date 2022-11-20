import sStorage from '@/utils/sessionStorage.js'
export default {
  //将我们在states中定义的值暴露在store.getters对象中，便于我们在组件中可以通过store.getters.getToken访问数据
  getToken(state) {
    return state.token || sStorage.get('token') || '';
  }
}