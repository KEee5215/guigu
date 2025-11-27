export interface loginFormData {
  username: string
  password: string
}

//全部接口
export interface responseData {
  code: number
  message: string
  ok: boolean
}

//登录接口返回数据类型
export interface loginResponseData extends responseData {
  data: string
}

//用户信息接口返回数据类型
export interface userInfoResponseData extends responseData {
  data: {
    name: string
    avatar: string
    routes: string[]
    buttons: string[]
  }
}
