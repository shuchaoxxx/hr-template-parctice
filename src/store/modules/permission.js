import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  // 静态路由
  routes: constantRoutes
}
const mutations = {
  // 在静态的路由上添加动态路由（权限）
  setRoutes(state, newRoutes) {
    // state.routes = [...state.routes, ...newRoutes] 不能在state的routes中添加，因为states有持久性
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
// 筛选出动态的路由
const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach((key) => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    // 设置给vuex中路由
    context.commit('setRoutes', routes)
    // 返回出去，给左侧的菜单显示使用
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
