import Vue from 'vue'
import Vuex from 'vuex'
import states from './states/state.js'
import mutations from './mutations/mutations.js'
import getters from './getters/getters.js'
import actions from './actions/actions.js'

Vue.use(Vuex)
export default new Vuex.Store({
  states,
  mutations,
  getters,
  actions
});

// export default new Vuex.Store({
//   state: {
//     token:'',
//   },
//   getters: {
//     getToken(state) {
//       return state.token || sStorage.get('token') || '';
//     }
//   },
//   mutations: {
//     // 修改token 并将token存入sessionStorage
//     setToken(state, token) {
//       state.token = token;
//       sStorage.set('token', token);
//       console.log('store,sessionStorage保存token成功');
//     },
//     delToken(state) {
//       state.token = '';
//       sStorage.remove('token')
//     }
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
