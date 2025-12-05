import type { n } from 'node_modules/vite/dist/node/chunks/moduleRunnerTransport'

//统一返回类型
interface responseData {
  code: number
  message: string
  ok: boolean
}

//单个用户信息类型
export interface user {
  createTime?: ''
  updateTime?: ''
  id?: number
  username: string
  roleName?: string
  password: string
  name: string
  phone?: string
}

export type records = user[]

export interface userListResponseData extends responseData {
  data: {
    total: number
    size: number
    current: number
    pages: number
    records: records
  }
}

export interface role {
  id?: number
  roleName: string
  remarks: string
  createTime?: string
  updateTime?: string
}

export type allRoleList = role[]

export interface userRolesResponseData extends responseData {
  data: {
    allRolesList: allRoleList
    assignRoles: allRoleList
  }
}

//分配角色的参数类型
export interface assignRoleParams {
  roleIdList: number[]
  userId: number
}
