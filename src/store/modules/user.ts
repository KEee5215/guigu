import { defineStore } from 'pinia'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'

import type { userState } from './type/type'

import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'

import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/tokenHelper'

//引入静态路由数组
import { constantRoutes } from '@/router/routes'

//  `defineStore()` 的返回值的命名是自由的
// 但最好含有 store 的名字，且以 `use` 开头，以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('User', {
  //存储用户信息
  state: (): userState => {
    return {
      token: GET_TOKEN() || '', //用户唯一标识
      menuRoutes: constantRoutes, //用户菜单路由
      username: '',
      avatar: '',
    }
  },
  // 操作state的方法
  actions: {
    // 登录方法
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      // console.log(result)
      //200登录成功 ->token存储
      if (result.code === 200) {
        this.token = result.data
        SET_TOKEN(result.data)
        return 'ok'
      }
      //登录失败 ->提示错误信息
      else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      // console.log('获取用户信息')
      let result: userInfoResponseData = await reqUserInfo()
      console.log(result)
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 退出登录
    async userLogout() {
      let result: any = await reqLogout()
      console.log(result)
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  // 计算属性
  getters: {},
})

export default useUserStore
