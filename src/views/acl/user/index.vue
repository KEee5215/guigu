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
      <el-button type="primary">添加</el-button>
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
          label="用户名字"
          show-overflow-tooltip
          prop="username"
        ></el-table-column>
        <el-table-column
          label="用户名称"
          show-overflow-tooltip
          prop="name"
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
            <el-button type="warning" size="small" icon="Edit">编辑</el-button>
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
  </div>
</template>

<script setup lang="ts">
import { reqGetUserPage } from '@/api/acl/user'
import type { records, user, userListResponseData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'

// 分页相关
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)

//用户数据
const userList = ref<records>([])

// 获取分页数据
async function getUserPage(page: number, limit: number) {
  let res: userListResponseData = await reqGetUserPage(page, limit, null)
  if (res.code === 200) {
    total.value = res.data.total
    return res.data
  } else {
    ElMessage.error(res.message)
    return { records: [] }
  }
}

// 分页
async function handleSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  //todo: 获取分页数据
  await getUserPage(currentPage.value, pageSize.value)
}

async function handleCurrentChange(page: number) {
  currentPage.value = page
  //todo: 获取分页数据
  await getUserPage(currentPage.value, pageSize.value)
}

onMounted(async () => {
  //todo: 获取分页数据
  let res = await getUserPage(currentPage.value, pageSize.value)
  console.log(res)
  userList.value = res.records
  // console.log(res)
})
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
