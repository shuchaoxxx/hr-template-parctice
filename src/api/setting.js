import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // axios的路径参数使用params
  })
}

export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * 获取角色接口详情数据
 */

export function getRoleDteail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 更新角色详情数据
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 * 新增角色接口
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
