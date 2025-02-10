import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: '/api',
  timeout: 50000
})

service.interceptors.request.use(
  config => {
    const token = store.state.user.tokens
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { data, success, message } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(message)
    }
  },
  async error => {    
    if(error.response.status === 401){
      await store.dispatch('user/logout')
      Message.error('登录过期，请重新登录')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default service
