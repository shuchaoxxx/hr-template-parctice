import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  token: getToken(), // 初始化时就从缓存中获取token
  userInfo: {} // 必须设置成{}，不能设置成null，因为访问null的属性会报错
}
const mutations = {
  setToken(state, token) {
    state.token = token // 给vuex设置token
    setToken(token) // 同步给缓存
  },
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 删除缓存的token
  },
  // 获取用户信息
  getUserInfo(state, result) {
    state.userInfo = result
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data) // 调用api的方法 拿到token

    context.commit('setToken', result)

    setTimeStamp() // 设置当前的时间戳
  },
  // 退出登录的操作
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    resetRouter() // 重置路由，当登出时删除addRouter添加的路由
    // vuex中子模块调用子模块的方法
    // 登出时，重新设置setRoutes为[]
    // 子模块调用子模块的mutations可以将commit的第三个参数设置成{root：true}就表示当前的context不是子模块了，而是父模块了
    context.commit('permission/setRoutes', [], { root: true })
  },
  async getUserInfo(context) {
    const result = await getUserInfo() // 返回经过响应拦截器处理后的数据
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('getUserInfo', { ...result, ...baseInfo })
    return result // 后面要使用 做动态权限要使用里面的menus
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
