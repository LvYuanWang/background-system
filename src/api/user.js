import request from '@/utils/request'

// 管理员登录
export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

// 恢复登录状态
export function getInfoApi() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

// 更新管理员信息
export function updateInfoApi(data) {
  return request({
    url: '/api/admin',
    method: 'put',
    data
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
