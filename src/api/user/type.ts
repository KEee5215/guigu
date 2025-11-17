//登录接口需要的参数类型
export interface LoginForm {
  username: string
  password: string
}

interface dataType {
  token: string
}
//登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}
//用户信息接口返回数据类型
interface checkUser {
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

interface user {
  checkUser: checkUser
}

export interface userResponseData {
  code: number
  data: user
}
