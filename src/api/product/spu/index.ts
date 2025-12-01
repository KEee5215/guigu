import request from '@/utils/requestHelper'
import type { record, spuSaleAttr } from './type'

const API = {
  SPU_PAGE_URL: '/admin/product/',
  BASE_SALE_ATTR_LIST_URL: '/admin/product/baseSaleAttrList',
  //新增SPU接口
  SAVE_SPU_INFO_URL: '/admin/product/saveSpuInfo',
  //更新SPU接口
  UPDATE_SPU_INFO_URL: '/admin/product/updateSpuInfo',
}

export const reqSpuPage = (
  page: number,
  limit: number,
  category3Id: number,
): any => {
  return request.get(
    API.SPU_PAGE_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}

export const reqBaseSaleAttrList = (): Promise<spuSaleAttr> => {
  return request.get(API.BASE_SALE_ATTR_LIST_URL)
}

export const reqAddOrUpdateSpuInfo = (data: record): any => {
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU_INFO_URL, data) //修改
  } else {
    return request.post<any, any>(API.SAVE_SPU_INFO_URL, data) //新增
  }
}
