import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { type LoginForm } from '@/api/user/type'
import type { userState } from './type/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/tokenHelper'

//  `defineStore()` 的返回值的命名是自由的
// 但最好含有 store 的名字，且以 `use` 开头，以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('User', {
  //存储用户信息
  state: (): userState => {
    return {
      token: GET_TOKEN() || '', //用户唯一标识
    }
  },
  // 操作state的方法
  actions: {
    // 登录方法
    async userLogin(data: LoginForm) {
      let result = await reqLogin(data)
      //200登录成功 ->token存储
      if (result.code === 200) {
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return 'ok'
      }
      //登录失败 ->提示错误信息
      else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  // 计算属性
  getters: {},
})

export default useUserStore
