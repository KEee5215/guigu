import { type saleAttr, type spuImgList } from '../sku/type'
// import { type saleAttrValueList } from '../sku/type'
export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface record {
  id?: number
  spuName: string
  description: string
  category3Id: number
  tmId: number | null
  spuImageList: null | spuImgList
  spuSaleAttrList: null | saleAttr[]
}
export type records = record[]

export interface data {
  records: records
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

export interface spuPage extends responseData {
  data: data
}

//全部销售属性用这个
export interface baseSaleAttrValue {
  id: number
  name: string
}
export type baseSaleAttrValueList = baseSaleAttrValue[]

export interface spuSaleAttr extends responseData {
  data: baseSaleAttrValueList
}

//发请求的对象
