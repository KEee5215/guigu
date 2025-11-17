import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { type LoginForm, type loginResponseData } from '@/api/user/type'
import { ElMessage } from 'element-plus'

//  `defineStore()` 的返回值的命名是自由的
// 但最好含有 store 的名字，且以 `use` 开头，以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('User', {
  //存储用户信息
  state: () => {
    return {
      token: '',
    }
  },
  // 操作state的方法
  actions: {
    // 登录方法
    async userLogin(data: LoginForm) {
      let result = await reqLogin(data)
      console.log('@@result', result)
      //200登录成功 ->token存储
      if (result.data.code === 200) {
        this.token = result.data.data.token
        localStorage.setItem('token', result.data.data.token)
        console.log('登录成功')
      }
      //登录失败 ->提示错误信息
      else {
        console.log('shibai', result)
      }
    },
  },
  // 计算属性
  getters: {},
})

export default useUserStore
