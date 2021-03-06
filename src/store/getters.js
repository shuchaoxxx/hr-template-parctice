const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  name: (state) => state.user.userInfo.username, // 若userInfo设置成null，此处访问就是报错
  userId: (state) => state.user.userInfo.userId,
  staffPhoto: (state) => state.user.userInfo.staffPhoto,
  companyId: (state) => state.user.userInfo.companyId,
  routes: (state) => state.permission.routes // 建立权限模块下的快捷访问
}
export default getters
