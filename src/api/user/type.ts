//登录接口需要的参数类型
export interface LoginForm {
  username: string
  password: string
}

export interface dataType {
  token?: string
  message?: string
}
//登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}
//用户信息接口返回数据类型
export interface checkUser {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

export interface user {
  checkUser?: checkUser
  message?: string
}

export interface userResponseData {
  code: number
  data: user
}
