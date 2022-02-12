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
