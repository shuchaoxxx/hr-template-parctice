// import request from '@/utils/request'
import request from '@/utils/request'

export function login(data) {
  request({
    url: '/sys/login',
    method: 'post',
    data // body参数
    // params 路径参数
  })
}

export function getInfo(token) {

}

export function logout() {

}
