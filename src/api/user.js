import request from '@/utils/request'
import axios from 'axios';

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

export function saveUser(data) {
  //请求端口为3001 
  return axios.post('http://123.249.115.172:3001/test', data) 
}


// 更新密码
export function updatePassword(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data: data
  })
}
