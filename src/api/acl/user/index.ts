import request from '@/utils/requestHelper'
import type {
  assignRoleParams,
  user,
  userListResponseData,
  userRolesResponseData,
} from './type'

const API = {
  //获取用户分页列表
  GET_USER_PAGE_URL: '/admin/acl/user/',
  //新增
  SAVE_USER_URL: '/admin/acl/user/save',
  //修改
  UPDATE_USER_URL: '/admin/acl/user/update',
  //用户角色分配
  GET_USER_ROLES_URL: '/admin/acl/user/toAssign',
  //分配角色
  ASSIGN_ROLES_URL: '/admin/acl/user/doAssignRole',

  //删除
  DELETE_USER_URL: '/admin/acl/user/remove',
  //批量删除
  DELETE_USERS_URL: '/admin/acl/user/batchRemove',
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

export const reqAddOrUpdateUser = (data: user) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, data)
  } else {
    return request.post<any, any>(API.SAVE_USER_URL, data)
  }
}

export const reqGetUserRoles = (
  userId: number,
): Promise<userRolesResponseData> => {
  return request.get(API.GET_USER_ROLES_URL + `/${userId}`)
}

export const reqAssignRoles = (data: assignRoleParams) => {
  return request.post<any, any>(API.ASSIGN_ROLES_URL, data)
}

export const reqUserRemove = (id: number) => {
  return request.delete<any, any>(API.DELETE_USER_URL + `/${id}`)
}

export const reqUserBatchRemove = (ids: number[]) => {
  return request.delete<any, any>(API.DELETE_USERS_URL, { data: ids })
}
