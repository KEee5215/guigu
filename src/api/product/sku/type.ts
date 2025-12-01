export interface responseData {
  code: number
  message: string
  ok: boolean
}

export interface spuImg {
  id?: number
  imgName?: string
  imgUrl?: string
  spuId?: number
  createTime?: string
  updateTime?: string
  name?: string
  url?: string
}

export type spuImgList = spuImg[]

export interface supImgResponseData extends responseData {
  data: spuImgList
}

export interface saleAttrValue {
  id?: number
  // createTime?: string
  // updateTime?: string
  spuId?: number
  baseSaleAttrId: number
  saleAttrValueName: string
  // saleAttrName: string
  // isChecked?: number
}
export type saleAttrValueList = saleAttrValue[]

export interface saleAttr {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: saleAttrValueList
  flag?: boolean
}

export interface skuHasSaleAttrValueList extends responseData {
  data: saleAttr[]
}
