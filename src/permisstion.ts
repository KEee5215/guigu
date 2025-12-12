//路由鉴权

import useUserStore from './store/modules/user'
import pinia from '@/store/index'
import setting from './setting'

import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

// 创建一个标志，避免重复添加路由
let isAddedRoutes = false

router.beforeEach(async (to, from, next) => {
  nprogress.start()

  document.title = `${setting.title}-${to.meta.title || ''}`

  // 每次都重新获取最新的 store 实例
  const userStore = useUserStore(pinia)
  let token = userStore.token
  let username = userStore.username

  if (token) {
    // 已登录
    if (to.path === '/login') {
      // 已登录还想去登录页，跳转到首页
      next({ path: '/' })
    } else {
      if (username && isAddedRoutes) {
        // 用户信息存在且路由已添加，正常放行
        next()
      } else {
        try {
          // 获取用户信息
          await userStore.getUserInfo()

          // 标记路由已添加
          isAddedRoutes = true

          // 使用 replace 避免重复导航
          next({ ...to, replace: true })
        } catch (error) {
          //用户信息获取失败,因为是token过期了，需要重新登录
          //或者用户手动修改改token了
          console.error('获取用户信息失败:', error)
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 未登录
    isAddedRoutes = false // 重置路由添加状态

    if (to.path === '/login') {
      // 去登录页，放行
      next()
    } else {
      // 其它页面跳转到登录页,但是要把当前页面的路径保存起来，登录成功后跳转回当前页面
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})
