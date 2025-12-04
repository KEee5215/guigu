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
  attrIdAndValueId?: string
}

export interface skuHasSaleAttrValueList extends responseData {
  data: saleAttr[]
}

export interface skuSaleAttrValue {
  id: number
  saleAttrId: string
  saleAttrName: string
  saleAttrValueId: string
  saleAttrValueName: string
  skuId: number
}

export interface skuAttrValue {
  attrId: string
  attrName: string
  id: number
  skuId: number
  valueId: string
  valueName: string
}
export type skuAttrValueList = skuAttrValue[]

export type skuSaleAttrValueList = skuSaleAttrValue[]

export interface saveSkuInfoParams {
  category3Id: string
  id: number
  isSale?: number
  price: string
  skuAttrValueList: skuAttrValueList
  skuDefaultImg: string
  skuDesc: string
  skuImageList: spuImgList
  skuName: string
  skuSaleAttrValueList: skuSaleAttrValueList
  spuID: string
  tmId: string
  weight: string
}

export interface skuInfoDate extends responseData {
  data: saveSkuInfoParams[]
}
