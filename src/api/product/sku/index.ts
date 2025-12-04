import request from '@/utils/requestHelper'
import type {
  saleAttr,
  saleAttrValueList,
  saveSkuInfoParams,
  skuHasSaleAttrValueList,
  skuInfoDate,
  supImgResponseData,
} from './type'

const API = {
  SPU_IMAGELIST_URL: '/admin/product/spuImageList/',
  GET_SALE_ATTR_LIST_URL: '/admin/product/spuSaleAttrList/',
  //新增SKU接口
  SAVE_SKU_INFO_URL: '/admin/product/saveSkuInfo',
  //根据spuId获取SKU列表
  GET_SKU_LIST_URL: '/admin/product/findBySpuId/',

  //获取已有的商品的数据-SKU
  SKU_URL: '/admin/product/list/',
  //上架
  SALE_URL: '/admin/product/onSale/',
  //下架的接口
  CANCELSALE_URL: '/admin/product/cancelSale/',
  //获取商品详情的接口
  SKUINFO_URL: '/admin/product/getSkuInfo/',
  //删除已有的商品
  DELETESKU_URL: '/admin/product/deleteSku/',
}

// 获取图片列表
export const reqSpuImageList = (spuId: number): Promise<supImgResponseData> =>
  request.get(API.SPU_IMAGELIST_URL + spuId)

// 获取销售属性
export const reqGetSaleAttrList = (
  spuId: number,
): Promise<skuHasSaleAttrValueList> =>
  request.get(API.GET_SALE_ATTR_LIST_URL + spuId)

export const reqSaveSkuInfo = (data: saveSkuInfoParams) =>
  request.post<any, any>(API.SAVE_SKU_INFO_URL, data)

export const reqGetSkuList = (spuId: number): Promise<skuInfoDate> =>
  request.get(API.GET_SKU_LIST_URL + spuId)

//获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, any>(API.SKU_URL + `${page}/${limit}`)
//上架
export const reqSaleSku = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId)
//下架
export const reqCancelSaleSku = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId)
//获取商品详情的接口
export const reqSkuInfo = (skuId: number) =>
  request.get<any, any>(API.SKUINFO_URL + skuId)
//删除已有的商品
export const reqDeleteSku = (skuId: number) =>
  request.delete<any, any>(API.DELETESKU_URL + skuId)
