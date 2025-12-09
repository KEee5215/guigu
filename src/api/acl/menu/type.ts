export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface menuDate {
  createTime: string
  updateTime: string
  id: number
  name: string
  pid: number
  code: string
  toCode: string
  type: number
  status: string
  level: number
  children?: menuDateList
  select: boolean
}

export type menuDateList = menuDate[]

export interface menuDateResponseData extends responseData {
  data: menuDateList
}
