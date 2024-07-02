import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist 白名单

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  const hasGetUserInfo = store.getters.user

  if (to.meta.auth) {
    // 需要权限
    if (hasGetUserInfo) {
      // 有用户信息
      next()
    } else {
      // 没有用户信息
      const hasToken = localStorage.getItem('adminToken')
      if (hasToken) {
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || '登录信息已过期，请重新登录')
          next(`/login?redirect=${to.path}`) // 重定向到登录页
          NProgress.done()
        }
      } else {
        next(`/login?redirect=${to.path}`) // 重定向到登录页
        NProgress.done()
      }
    }
  } else {
    // 不需要权限
    if (to.path === '/login' && hasGetUserInfo) {
      // 是登录页面
      next({ path: '/' })
    } else {
      // 不是登录页面
      next()
    }
    NProgress.done()
  }

  // 以下是vue-element-admin的鉴权代码
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     // 进的不是login页面
  //     // 看一下是否有用户信息
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       // 进入else说明没有用户信息,但是你又有token,接下来就是获取localStorage里面的token,然后去服务器获取用户信息
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')
  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login: 删除令牌并转到登录页面以重新登录
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
