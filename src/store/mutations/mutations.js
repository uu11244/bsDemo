import sStorage from '@/utils/sessionStorage.js'
//在这个文件中定义对状态值的操作，增删改查。
//这里要注意不要在mutations里面进行异步操作
export default {
  // 修改token 并将token存入sessionStorage
  setToken(state, token) {
    state.token = token;
    sStorage.set('token', token);
    console.log('store,sessionStorage保存token成功');
  },
  delToken(state) {
    state.token = '';
    sStorage.remove('token')
  }
}