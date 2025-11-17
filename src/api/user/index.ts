//统一管理用户相关接口
import request from '@/utils/request'
import { type LoginForm, type loginResponseData } from './type'

const API = {
  LOGIN_URL: '/user/login',
  USERINFO_URL: '/user/info',
}

export const reqLogin = (data: LoginForm) =>
  request.post<loginResponseData>(API.LOGIN_URL, data)

export const reqUserInfo = () =>
  request.get<loginResponseData>(API.USERINFO_URL)
