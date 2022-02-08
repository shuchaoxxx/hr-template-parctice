import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { login } from '@/api/user'

const state = {
  token: getToken() // 初始化时就从缓存中获取token
}
const mutations = {
  setToken(state, token) {
    state.token = token // 给vuex设置token
    setToken() // 同步给缓存
  },
  removeToken(state, token) {
    state.token = null // 删除vuex的token
    removeToken() // 删除缓存的token
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data) // 调用api的方法
    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
