import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import axios from 'axios'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = store.state.user.tokens
  if (hasToken) {
    if (to.path === '/' || to.path === '/dashboard') {
      // if is logged in, redirect to the home page
      await store.dispatch('user/getUserInfo')
      next()
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.userId 
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }    
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  // 获取请求者的IP地址
  const ip = to.meta.ip || 'unknown'; // 假设IP地址存储在meta中

  // 发送请求到服务器保存IP地址
  axios.post('http://localhost:3000/save-ip', { ip })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error saving IP address:', error);
    });
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
