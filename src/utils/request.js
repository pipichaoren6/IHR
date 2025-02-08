import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
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
  error => {
    return Promise.reject(error)
  }
)

export default service
