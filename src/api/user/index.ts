//统一管理用户相关接口
import request from '@/utils/requestHelper'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'

const API = {
  LOGIN_URL: '/admin/acl/index/login',
  USER_INFO: '/admin/acl/index/info',
  LOGOUT_URL: '/admin/acl/index/logout',
}

export const reqLogin = (data: loginFormData): Promise<loginResponseData> =>
  request.post(API.LOGIN_URL, data)

export const reqLogout = (): Promise<userInfoResponseData> =>
  request.post(API.LOGOUT_URL)

export const reqUserInfo = (): any => request.get(API.USER_INFO)
