import request from '@/utils/request'

export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params // 路径参数使用parmas
  })
}
export function deleteRole(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
