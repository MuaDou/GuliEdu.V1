import request from '@/utils/request'

export function login() {
  return request({
    url: '/serviceedu/user/login',
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: '/serviceedu/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/serviceedu/user/logout',
    method: 'post'
  })
}
