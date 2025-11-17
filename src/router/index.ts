import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    // 滚动行为
    return {
      top: 0,
      left: 0,
    }
  },
})

export default router
