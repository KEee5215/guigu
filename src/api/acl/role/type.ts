export interface role {
  id?: number
  roleName: string
  remark?: string
  createTime?: string
  updateTime?: string
}

export interface responseData {
  code: number
  message: string
  ok: boolean
}

export type records = role[]

export interface roleListResponseData extends responseData {
  data: {
    total: number
    size: number
    current: number
    pages: number
    searchCount: boolean
    records: records
  }
}
