//路由鉴权

import useUserStore from './store/modules/user'
import pinia from '@/store/index'
import setting from './setting'

const userStore = useUserStore(pinia) //从pinia中获取token,通过是否有token来判断是否登录
// console.log('@@userStore', userStore)

import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

router.beforeEach(async (to, from) => {
  nprogress.start()

  document.title = `${setting.title}-${to.meta.title}`
  let token = userStore.token
  let username = userStore.username
  if (token) {
    // 已登录
    if (to.path === '/login') {
      // 已登录还想去登录页，跳转到首页
      return { path: '/' }
    } else {
      if (username) {
        // 其它页面正常放行
        return true
      } else {
        try {
          // 获取用户信息
          await userStore.getUserInfo()
        } catch (error) {
          //用户信息获取失败,因为是token过期了，需要重新登录
          //或者用户手动修改改token了
          userStore.userLogout()
          return { path: '/login', query: { redirect: to.path } }
        }
      }
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      // 去登录页，放行
      return true
    }
    // 其它页面跳转到登录页,但是要把当前页面的路径保存起来，登录成功后跳转回当前页面
    return { path: '/login', query: { redirect: to.path } }
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})

// 权限控制
//1.用户未登录,只能访问login,其余的页面都跳转到login

//2.用户已登录,不能访问login[跳转到HOME页面],其余的页面都正常显示
