import { login, getInfo} from '@/api/user'
const state = {
  // 从缓存读取token
  tokens: localStorage.getItem('tokens') || null,
  userInfo: {}

}
const mutations = {
  setTokens(state, tokens) {
    state.tokens = tokens
    localStorage.setItem('tokens', tokens)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeToken(state) {
    state.tokens = null
    localStorage.removeItem('tokens')
  },
  removeUserInfo(state) {
    state.userInfo = null
  }
}
const actions = {
  async login(context, data) {
    // 调用登录接口
    const res = await login(data)
    context.commit('setTokens', res)
  },
  async getUserInfo(context, data) {
    // 调用获取用户信息接口
    const res = await getInfo(data)
    context.commit('setUserInfo', res)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
