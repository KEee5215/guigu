//全部接口
export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
  createTime?: string
  updateTime?: string
}

export type records = TradeMark[]

export interface trademarkData {
  records: records
  total: number
  size: number
  current: number
  pages: number
  searchCount: boolean
}

export interface trademarkResponseData extends responseData {
  data: trademarkData
}

export interface trademarkListResponseData extends responseData {
  data: records
}
