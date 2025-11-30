import type { RouteRecordRaw } from 'vue-router'

export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface categoryState {
  data: {
    c1Id: number | null
    c2Id: number | null
    c3Id: number | null
  }
}
