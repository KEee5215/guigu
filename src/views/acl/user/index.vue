<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input
            placeholder="请输入用户名"
            v-model="searchParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-popconfirm
        :title="`确定删除选中用户吗?`"
        width="250px"
        icon="Delete"
        @confirm="deleteSelectedUsers"
      >
        <template #reference>
          <el-button type="danger">批量删除</el-button>
        </template>
      </el-popconfirm>

      <!-- 表格 -->
      <el-table
        ref="TableRef"
        class="table"
        :data="userList"
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
        ></el-table-column>
        <el-table-column
          label="id"
          prop="id"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名"
          show-overflow-tooltip
          prop="name"
        ></el-table-column>
        <el-table-column
          label="用户昵称"
          show-overflow-tooltip
          prop="username"
        ></el-table-column>
        <el-table-column
          label="用户角色"
          prop="roleName"
          show-overflow-tooltip
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
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="editUser(row)"
            >
              编辑
            </el-button>

            <!--  -->
            <el-popconfirm
              :title="`确定删除${row.name}吗?`"
              width="250px"
              icon="Delete"
              @confirm="deleteUser(row.id)"
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
    <!-- 抽屉 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h2>{{ reqName }}用户</h2>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名" prop="name">
            <el-input
              placeholder="请输入用户姓名"
              v-model="userParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="username">
            <el-input
              placeholder="请输入用户昵称"
              v-model="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input
              placeholder="请输入用户密码"
              v-model="userParams.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>

    <!-- 角色分配: 抽屉 -->
    <el-drawer v-model="drawer1">
      <template #header>
        <h2>角色分配</h2>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户名">
            <el-input :disabled="true" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedRoles"
              @change="handleCheckedRolesChange"
            >
              <el-checkbox
                v-for="role in allRoles"
                :key="role"
                :label="role"
                :value="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="saveRole">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateUser,
  reqAssignRoles,
  reqGetUserPage,
  reqGetUserRoles,
  reqUserBatchRemove,
  reqUserRemove,
} from '@/api/acl/user'
import type {
  allRoleList,
  assignRoleParams,
  records,
  user,
  userListResponseData,
  userRolesResponseData,
} from '@/api/acl/user/type'
import { ElMessage, type CheckboxValueType } from 'element-plus'

import { ref, onMounted, computed, nextTick } from 'vue'

// 分页相关
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)

//用户数据
const userList = ref<records>([])

//收集数据
const userParams = ref<user>({
  username: '',
  password: '',
  name: '',
})

// 抽屉相关
const drawer = ref<boolean>(false)
const drawer1 = ref<boolean>(false)
//获取form组件实例
const formRef = ref<any>()

//全选框
const checkAll = ref<boolean>(false)
const isIndeterminate = ref(true)

//
const validateUsername = (rule: any, value: string, callback: any) => {
  if (value.trim().length > 2) {
    callback()
  } else {
    callback(new Error('用户名至少五位'))
  }
}

const validateName = (rule: any, value: string, callback: any) => {
  if (value.trim().length > 2) {
    callback()
  } else {
    callback(new Error('用户名至少五位'))
  }
}

const validatePassword = (rule: any, value: string, callback: any) => {
  if (10 <= value.trim().length && value.trim().length <= 30) {
    callback()
  } else {
    callback(new Error('密码在10-30位之间'))
  }
}

//表单校验
const rules = {
  // 用户名
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validateUsername,
    },
  ],
  // 用户昵称
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: validateName,
    },
  ],
  // 用户密码
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword,
    },
  ],
}

let reqName = computed(() => {
  return userParams.value.id ? '编辑' : '添加'
})

// 获取分页数据
async function getUserPage(
  page: number,
  limit: number,
  username: string | null,
) {
  let res: userListResponseData
  if (username) {
    res = await reqGetUserPage(page, limit, username)
  } else {
    res = await reqGetUserPage(page, limit, null)
  }

  if (res.code === 200) {
    total.value = res.data.total
    userList.value = res.data.records
  } else {
    ElMessage.error(res.message)
  }
}

// 分页
async function handleSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  //todo: 获取分页数据
  await getUserPage(currentPage.value, pageSize.value, null)
  console.log('执行了')
}

async function handleCurrentChange(page: number) {
  currentPage.value = page
  //todo: 获取分页数据
  await getUserPage(currentPage.value, pageSize.value, null)
  console.log('执行了')
}

onMounted(async () => {
  //todo: 获取分页数据
  await getUserPage(currentPage.value, pageSize.value, null)
})

function addUser() {
  // 重置表单数据
  userParams.value = {
    username: '',
    password: '',
    name: '',
  }

  nextTick(() => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  })

  drawer.value = true
}

function editUser(row: user) {
  Object.assign(userParams.value, row)

  nextTick(() => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  })
  drawer.value = true
}

function cancel() {
  drawer.value = false
  drawer.value = false
}
// 保存
async function save() {
  // 表单校验
  await formRef.value.validate()

  let res = await reqAddOrUpdateUser(userParams.value)

  if (res.code === 200) {
    getUserPage(currentPage.value, pageSize.value, null)
    ElMessage.success(`${reqName.value}成功`)
  } else {
    ElMessage.error(`${reqName.value}失败`)
  }
  drawer.value = false
  // await getUserPage(currentPage.value, pageSize.value)
  // 刷新
  window.location.reload()
}

const checkedRoles = ref<allRoleList>([])
const allRoles = ref<allRoleList>([])
//分配角色
async function setRole(row: user) {
  let res: userRolesResponseData = await reqGetUserRoles(row.id as number)
  allRoles.value = res.data.allRolesList
  checkedRoles.value = res.data.assignRoles
  console.log(res)
  Object.assign(userParams.value, row)
  drawer1.value = true
}

// 全选框
const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedRoles.value = val ? allRoles.value : [] //如果全部单选框被选中，则赋值true，否则为false
  isIndeterminate.value = false
}

// 单选框处理函数也相应调整
const handleCheckedRolesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoles.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoles.value.length
}

const assignRoleParams = ref<assignRoleParams>({
  roleIdList: [],
  userId: 0,
})

// 保存角色分配
async function saveRole() {
  //赋值
  assignRoleParams.value.roleIdList = checkedRoles.value.map(
    (item) => item.id,
  ) as number[]
  assignRoleParams.value.userId = userParams.value.id as number
  //发送请求
  let res = await reqAssignRoles(assignRoleParams.value)
  if (res.code === 200) {
    await getUserPage(currentPage.value, pageSize.value, null)
    ElMessage.success('分配角色成功')
  } else {
    ElMessage.error('分配角色失败')
  }
  drawer1.value = false
}

// 删除用户
async function deleteUser(id: number) {
  let res = await reqUserRemove(id as number)
  if (res.code === 200) {
    ElMessage.success('删除用户成功')
    await getUserPage(currentPage.value, pageSize.value, null)
  } else {
    ElMessage.error('删除用户失败')
  }
}

// 批量删除的数组
const Selection = ref<number[]>([])
async function handleSelectionChange(val: any) {
  Selection.value = val.map((item: any) => item.id) //获取选中的ids
  console.log(Selection.value)
}

async function deleteSelectedUsers() {
  if (Selection.value.length === 0) {
    ElMessage.warning('请选择要删除的用户')
    return
  }

  let res = await reqUserBatchRemove(Selection.value)
  if (res.code === 200) {
    ElMessage.success('批量删除用户成功')
    await getUserPage(currentPage.value, pageSize.value, null)
  } else {
    ElMessage.error('批量删除用户失败')
  }
}

//搜索
const searchParams = ref<{
  currentPage: number
  pageSize: number
  username: string | null
}>({
  currentPage: currentPage.value,
  pageSize: pageSize.value,
  username: null,
})

async function search() {
  await getUserPage(
    currentPage.value,
    pageSize.value,
    searchParams.value.username,
  )
  ElMessage.success('搜索成功')
}

//重置
async function reset() {
  searchParams.value = {
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    username: null,
  }
  await getUserPage(currentPage.value, pageSize.value, null)
  ElMessage.success('重置成功')
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table {
  margin-top: 20px;
}
</style>
