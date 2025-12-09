<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="角色名称">
          <el-input
            placeholder="请输入角色名称"
            v-model="searchParams.roleName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="card">
      <el-button type="primary" @click="addRole">添加</el-button>
      <el-popconfirm :title="`正在开发中`" width="250px" icon="Delete">
        <template #reference>
          <el-button type="danger">批量删除</el-button>
        </template>
      </el-popconfirm>

      <!-- 表格 -->
      <el-table
        ref="TableRef"
        class="table"
        :data="roleList"
        border
        stripe
        empty-text="暂无数据"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          show-overflow-tooltip
          width="100px"
        ></el-table-column>
        <el-table-column
          label="id"
          prop="id"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="角色名称"
          show-overflow-tooltip
          prop="roleName"
        ></el-table-column>

        <el-table-column
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="assignAcl(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="editRole(row)"
            >
              编辑
            </el-button>

            <!--  -->
            <el-popconfirm
              :title="`确定删除${row.roleName}吗?`"
              width="250px"
              icon="Delete"
              @confirm="deleteRole(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
            <!--  -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top: 10px"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 4, 5, 6]"
        layout="prev, pager, next, jumper,->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 弹窗 -->
    <el-dialog v-model="isShow" :title="addOrEdit" width="500">
      <el-form :model="roleParam">
        <el-form-item label="角色名称">
          <el-input v-model="roleParam.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分配权限抽屉 -->

    <el-drawer v-model="drawer">
      <template #header>
        <h4>权限分配</h4>
      </template>
      <template #default>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="menuData"
          show-checkbox
          empty-text="暂无数据"
          node-key="id"
          default-expand-all
          :default-checked-keys="checkedMenu"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reqDoAssign, reqGetRoleMenu } from '@/api/acl/menu'
import type { menuDateList } from '@/api/acl/menu/type'
import { reqAddOrUpdateRole, reqGetRolePage } from '@/api/acl/role'
import type { records, roleListResponseData } from '@/api/acl/role/type'
import type { role } from '@/api/acl/role/type'
import { reqAssignRoles, reqUserRemove } from '@/api/acl/user'
import { ElMessage } from 'element-plus'

import { ref, onMounted, computed, useTemplateRef } from 'vue'
//抽屉
const drawer = ref<boolean>(false)

// 分页相关
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)

//弹窗显示
const isShow = ref<boolean>(false)

// 分页
async function handleSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  //todo: 获取分页数据
  await getRolePage(currentPage.value, pageSize.value, null)
}

async function handleCurrentChange(page: number) {
  currentPage.value = page
  //todo: 获取分页数据
  await getRolePage(currentPage.value, pageSize.value, null)
}

const Selection = ref<any>([])

const roleList = ref<records>([])
async function getRolePage(
  currentPage: number,
  pageSize: number,
  roleName: string | null,
) {
  let res: roleListResponseData

  if (roleName) {
    res = await reqGetRolePage(currentPage, pageSize, roleName)
  } else {
    res = await reqGetRolePage(currentPage, pageSize, null)
  }
  if (res.code === 200) {
    total.value = res.data.total
    roleList.value = res.data.records
  } else {
    ElMessage.error(res.message)
  }
}

onMounted(async () => {
  let res = await getRolePage(currentPage.value, pageSize.value, null)

  console.log(res)
})
const handleSelectionChange = (val: any) => {
  Selection.value = val
}

const roleParam = ref<role>({
  roleName: '',
})

const addOrEdit = computed(() => {
  return roleParam.value.id ? '编辑' : '添加'
})

const addRole = () => {
  roleParam.value = { roleName: '' }
  isShow.value = true
}

const editRole = (row: any) => {
  roleParam.value = row
  isShow.value = true
}

const deleteRole = (id: number) => {
  reqUserRemove(id).then((res) => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      getRolePage(currentPage.value, pageSize.value, null)
    } else {
      ElMessage.error('删除失败')
    }
  })
}

async function save() {
  let res = await reqAddOrUpdateRole(roleParam.value)
  if (res.code === 200) {
    ElMessage.success(`${addOrEdit.value}成功`)
    isShow.value = false
    await getRolePage(currentPage.value, pageSize.value, null)
  } else {
    ElMessage.error(`${addOrEdit.value}失败`)
  }
  isShow.value = false
}

//搜索
const searchParams = ref<{
  roleName: string | null
  currentPage: number
  pageSize: number
}>({
  currentPage: 1,
  pageSize: pageSize.value,
  roleName: null,
})
async function search() {
  if (searchParams.value.roleName) {
    searchParams.value.roleName = searchParams.value.roleName.trim()
  }

  if (searchParams.value.roleName === '') {
    searchParams.value.roleName = null
  }
  await getRolePage(1, pageSize.value, searchParams.value.roleName)
}

function reset() {
  searchParams.value = {
    currentPage: 1,
    pageSize: pageSize.value,
    roleName: null,
  }
  getRolePage(1, pageSize.value, null)
}

const defaultProps = {
  children: 'children',
  label: 'name',
}

//存储菜单数据
const menuData = ref<menuDateList>([])
//存储选中的菜单
const checkedMenu = ref<number[]>([])

//函数,过滤选中的四级菜单
const filterMenu = (allData: any, initData: any) => {
  allData.forEach((item: any) => {
    if (item.level === 4 && item.select) {
      initData.push(item.id)
    }
    if (item.children) {
      filterMenu(item.children, initData)
    }
  })
}

// 分配权限
const assignAcl = async (row: role) => {
  checkedMenu.value = []
  Object.assign(roleParam.value, row)
  let res = await reqGetRoleMenu(row.id as number)
  console.log(res)
  if (res.code === 200) {
    menuData.value = res.data
    filterMenu(menuData.value, checkedMenu.value)
  } else {
    ElMessage.error('获取权限菜单失败')
  }
  drawer.value = true
}

function cancelClick() {
  drawer.value = false
}

//获取被选中的组件的key数组
const TreeRef = useTemplateRef('treeRef')
async function confirmClick() {
  const roleId = roleParam.value.id as number
  const checkedKeys = TreeRef.value.getCheckedKeys()
  //半选
  const halfCheckedKeys = TreeRef.value.getHalfCheckedKeys()
  //合并
  checkedKeys.push(...halfCheckedKeys)

  let res = await reqDoAssign(roleId, checkedKeys)
  if (res.code === 200) {
    ElMessage.success('分配权限成功')
  } else {
    ElMessage.error('分配权限失败')
  }
  drawer.value = false
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.el-card {
  margin-top: 20px;
}
</style>
