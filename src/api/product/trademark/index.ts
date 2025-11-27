import request from '@/utils/requestHelper'
import type { trademarkResponseData } from './type'

const API = {
  //分页获取品牌
  TRADEMARK_URL: '/admin/product/baseTrademark/',
  //添加品牌
  ADD_TRADEMARK_URL: '/admin/product/baseTrademark/save',
  //修改品牌
  UPDATE_TRADEMARK_URL: '/admin/product/baseTrademark/update',
}

//获取品牌
export const reqHashTrademark = (
  page: number,
  limit: number,
): Promise<trademarkResponseData> =>
  request.get(API.TRADEMARK_URL + `${page}/${limit}`)

export const reqAddOrUpdateTrademark = (data: any) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  }
}
