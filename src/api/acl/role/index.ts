import request from '@/utils/requestHelper'
import type { role, roleListResponseData } from './type'

const API = {
  //获取角色分页列表
  GET_ROLE_PAGE: '/admin/acl/role',
  //添加
  ADD_ROLE: '/admin/acl/role/save',
  //修改
  UPDATE_ROLE: '/admin/acl/role/update',
  //删除
  REMOVE_ROLE: '/admin/acl/role/remove',
}

export const reqGetRolePage = (
  page: number,
  limit: number,
  roleName: string | null,
): Promise<roleListResponseData> =>
  request({
    url: `${API.GET_ROLE_PAGE}/${page}/${limit}`,
    method: 'get',
    params: { roleName },
  })

export const reqAddOrUpdateRole = (data: role): any =>
  request({
    url: data.id ? API.UPDATE_ROLE : API.ADD_ROLE,
    method: data.id ? 'put' : 'post',
    data,
  })

export const reqRemoveRole = (id: number) =>
  request({
    url: `${API.REMOVE_ROLE}/${id}`,
    method: 'delete',
  })
