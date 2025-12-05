<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button type="danger">批量删除</el-button>
      <!-- 表格 -->
      <el-table
        class="table"
        :data="userList"
        border
        stripe
        empty-text="暂无数据"
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
            <el-button type="primary" size="small" icon="User">
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
            <el-button type="danger" size="small" icon="Delete">删除</el-button>
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
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateUser, reqGetUserPage } from '@/api/acl/user'
import type { records, user, userListResponseData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
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

//获取form组件实例
const formRef = ref<any>()

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
async function getUserPage(page: number, limit: number) {
  let res: userListResponseData = await reqGetUserPage(page, limit, null)
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
  await getUserPage(currentPage.value, pageSize.value)
  console.log('执行了')
}

async function handleCurrentChange(page: number) {
  currentPage.value = page
  //todo: 获取分页数据
  await getUserPage(currentPage.value, pageSize.value)
  console.log('执行了')
}

onMounted(async () => {
  //todo: 获取分页数据
  await getUserPage(currentPage.value, pageSize.value)
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
}
// 保存
async function save() {
  // 表单校验
  await formRef.value.validate()

  let res = await reqAddOrUpdateUser(userParams.value)

  if (res.code === 200) {
    getUserPage(currentPage.value, pageSize.value)
    ElMessage.success(`${reqName.value}成功`)
  } else {
    ElMessage.error(`${reqName.value}失败`)
  }
  drawer.value = false
  // await getUserPage(currentPage.value, pageSize.value)
  // 刷新
  window.location.reload()
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
