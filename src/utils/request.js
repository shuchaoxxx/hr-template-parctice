import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// import router from '@/router'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 定义的超时时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 根据项目启动的命令来区分不同环境下的api
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时了*-*!'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // 必须返回config
  },
  error => {
    return Promise.reject(error)
  })

// 响应拦截器
service.interceptors.response.use(response => {
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    // 业务错误 要抛出错误 先提示
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  // token超时是使用了返回的错误信息里有返回code为10002
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候，表示后端token超时了
    store.dispatch('user/logout') // 删除token后，才能跳转
    router.push('/login')
  } else {
    Message.error(error.message) // 错误提示信息
  }
  return Promise.reject(error) // 执行reject，进入catch
}
)

// 检查token是否超时
export function IsCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  // console.log((currentTime - timeStamp) / 1000 > TimeOut)
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service
