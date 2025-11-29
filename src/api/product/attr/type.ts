export interface responseData {
  code: number
  data: any
  message: string
}

export interface category {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}

export type categorys = category[]

export interface categoryResponseData extends responseData {
  data: categorys
}

export interface attrInfoListParams {
  c1Id: number
  c2Id: number
  c3Id: number
}

export interface attrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

export type attrValueList = attrValue[]

export interface attrInfo {
  id: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: attrValueList
}

export type attrInfoList = attrInfo[]

export interface attrInfoListResponseData extends responseData {
  data: attrInfoList
}

export interface attrParams {
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: attrValueList
  id?: number
}
