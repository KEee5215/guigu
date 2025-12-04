import request from '@/utils/requestHelper'
import type { userListResponseData } from './type'

const API = {
  //获取用户分页列表
  GET_USER_PAGE_URL: '/admin/acl/user/',
}

export const reqGetUserPage = (
  page: number,
  limit: number,
  username: string | null,
): Promise<userListResponseData> => {
  if (username) {
    return request.get(
      API.GET_USER_PAGE_URL + `${page}/${limit}?username=${username}`,
    )
  } else {
    return request.get(API.GET_USER_PAGE_URL + `${page}/${limit}`)
  }
}
