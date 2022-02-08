import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 根据项目启动的命令来区分不同环境下的api
  timeout: 5000
})

service.interceptors.request.use()

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
  Message.error(error.message) // 错误提示信息
  return Promise.reject(error) // 执行reject，进入catch
}
)

export default service
