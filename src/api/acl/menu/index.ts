import request from '@/utils/requestHelper'
import type { menuDateResponseData } from './type'

const API = {
  //根据角色id获取角色菜单列表
  GET_ROLE_MENU: '/admin/acl/permission/toAssign',
  //给角色分配权限
  ASSIGN_ROLE: '/admin/acl/permission/doAssign',
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
