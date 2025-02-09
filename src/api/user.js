import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: {
      mobile: data.mobile,
      password: data.password
    }
  })


}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
