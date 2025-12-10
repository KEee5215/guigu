import request from '@/utils/requestHelper'
import type { menuDateResponseData } from './type'

const API = {
  //根据角色id获取角色菜单列表
  GET_ROLE_MENU: '/admin/acl/permission/toAssign',
  //给角色分配权限
  ASSIGN_ROLE: '/admin/acl/permission/doAssign',

  //获取所有菜单
  GET_ALL_MENU: '/admin/acl/permission',

  //新增菜单
  ADD_MENU: '/admin/acl/permission/save',

  //修改菜单
  UPDATE_MENU: '/admin/acl/permission/update',

  //删除菜单
  DELETE_MENU: '/admin/acl/permission/remove',
}

export const reqGetRoleMenu = (roleId: number): Promise<menuDateResponseData> =>
  request({
    url: `${API.GET_ROLE_MENU}/${roleId}`,
    method: 'get',
  })

export const reqDoAssign = (
  roleId: number,
  permissionId: number[],
): Promise<any> => {
  console.log(roleId, permissionId)
  return request.post(
    API.ASSIGN_ROLE + '?roleId=' + roleId + '&permissionId=' + permissionId,
  )
}

// 获取所有菜单
export const reqAllPermisstion = (): Promise<any> =>
  request.get(API.GET_ALL_MENU)

// 新增或修改菜单
export const reqAddOrUpdateMenu = (data: any): Promise<any> => {
  if (data.id) {
    return request.put(API.UPDATE_MENU, data)
  } else {
    return request.post(API.ADD_MENU, data)
  }
}

// 删除菜单
export const reqRemoveMenu = (id: number): Promise<any> =>
  request.delete(API.DELETE_MENU + '/' + id)
