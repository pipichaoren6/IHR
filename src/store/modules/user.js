import { login } from '@/api/user'
const state = {
  // 从缓存读取token
  tokens: localStorage.getItem('tokens') || null


}
const mutations = {
  setTokens(state, tokens) {
    state.tokens = tokens
    localStorage.setItem('tokens', tokens)
  },
  removeToken(state) {
    state.tokens = null
    localStorage.removeItem('tokens')
  }

}
const actions = {
  async login(context, data) {
    // todo: 调用登录接口
    const res = await login(data)
    context.commit('setTokens', res)
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
