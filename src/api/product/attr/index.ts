import request from '@/utils/requestHelper'
import type {
  attrInfoListParams,
  attrInfoListResponseData,
  attrParams,
  categoryResponseData,
} from './type'

const API = {
  ONE_CATEGORY_URL: '/admin/product/getCategory1',
  TWO_CATEGORY_URL: '/admin/product/getCategory2/',
  THREE_CATEGORY_URL: '/admin/product/getCategory3/',
  ATTRINFOLIST_URL: '/admin/product/attrInfoList/',
  ADD_OR_UPDATE_ATTR_URL: '/admin/product/saveAttrInfo',
  DELETE_ATTR_URL: '/admin/product/deleteAttr/',
}

export const reqOneCategory = (): Promise<categoryResponseData> =>
  request.get(API.ONE_CATEGORY_URL)

export const reqTwoCategory = (
  category1Id: number,
): Promise<categoryResponseData> =>
  request.get(API.TWO_CATEGORY_URL + category1Id)

export const reqThreeCategory = (
  category2Id: number,
): Promise<categoryResponseData> =>
  request.get(API.THREE_CATEGORY_URL + category2Id)

export const reqAttrInfoList = (
  c1Id: number,
  c2Id: number,
  c3Id: number,
): Promise<attrInfoListResponseData> =>
  request.get(API.ATTRINFOLIST_URL + `${c1Id}/${c2Id}/${c3Id}`)

export const reqAddOrUpdateAttrInfo = (data: attrParams) =>
  request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data)

export const reqDeleteAttr = (id: number) =>
  request.delete<any, any>(API.DELETE_ATTR_URL + id)
