import request from '@/utils/requestHelper'
import type {
  saleAttr,
  saleAttrValueList,
  saveSkuInfoParams,
  skuHasSaleAttrValueList,
  supImgResponseData,
} from './type'

const API = {
  SPU_IMAGELIST_URL: '/admin/product/spuImageList/',
  GET_SALE_ATTR_LIST_URL: '/admin/product/spuSaleAttrList/',
  //新增SKU接口
  SAVE_SKU_INFO_URL: '/admin/product/saveSkuInfo',
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
