//统一管理用户相关接口
import request from '@/utils/requestHelper'
import {
  type LoginForm,
  type loginResponseData,
  type userResponseData,
} from './type'

const API = {
  LOGIN_URL: '/user/login',
  USERINFO_URL: '/user/info',
}

export const reqLogin = (data: LoginForm): Promise<loginResponseData> =>
  request.post(API.LOGIN_URL, data)

export const reqUserInfo = (): Promise<userResponseData> =>
  request.get(API.USERINFO_URL)
