<template>
  <el-card>
    <el-table
      :data="permisstionArr"
      bordered
      style="width: 100%; margin: 10px 0"
      row-key="id"
      border
    >
      <el-table-column label="名称" prop="name" width="200px"></el-table-column>
      <el-table-column
        label="权限值"
        prop="code"
        width="200px"
      ></el-table-column>
      <el-table-column
        label="修改时间"
        prop="updateTime"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="addMenu(row)"
            :disabled="row.level == 4 ? true : false"
          >
            添加
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="editMenu(row)"
            :disabled="row.level == 1 ? true : false"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="delMenu(row)"
            :disabled="row.level == 1 ? true : false"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 添加或修改的弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    :title="dialogtitle"
    @closed="cancelDialog"
  >
    <el-form label-width="100px">
      <el-form-item label="菜单名称:">
        <el-input
          v-model="menuData.name"
          placeholder="请输入菜单名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单权限值:">
        <el-input
          v-model="menuData.code"
          placeholder="请输入菜单权限值"
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="cancelDialog">取消</el-button>
      <el-button type="primary" @click="confirmDialog">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateMenu,
  reqAllPermisstion,
  reqRemoveMenu,
} from '@/api/acl/menu/index'
import type {
  MenuParams,
  Permisstion,
  PermisstionList,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
//存储菜单的数据
let permisstionArr = ref<PermisstionList>([])
//菜单数据
let menuData = reactive<MenuParams>({
  name: '',
  code: '',
  pid: 0,
  level: 0,
})
//获取菜单数据的方法
const getHasPermission = async () => {
  //获取菜单数据
  let res = await reqAllPermisstion()

  if (res.code === 200) {
    permisstionArr.value = res.data
  }
}
onMounted(() => {
  getHasPermission()
})
//弹窗的标题
let dialogtitle = ref<string>('')
//弹窗的显示与隐藏
let dialogVisible = ref<boolean>(false)
//弹窗的确认按钮
const confirmDialog = async () => {
  let res = await reqAddOrUpdateMenu(menuData)
  if (res.code === 200) {
    dialogVisible.value = false
    ElMessage({ message: '操作成功', type: 'success' })
    getHasPermission()
  } else {
    ElMessage({ message: res.message, type: 'error' })
  }
}
//弹窗的取消按钮
const cancelDialog = () => {
  menuData.name = ''
  menuData.code = ''
  dialogVisible.value = false
}
//添加meun
const addMenu = (row: Permisstion) => {
  dialogtitle.value = '添加菜单'
  menuData.pid = row.id as number
  menuData.level = (row.level as number) + 1
  dialogVisible.value = true
}
//修改meun
const editMenu = (row: Permisstion) => {
  dialogtitle.value = '修改菜单'
  menuData.id = row.id as number
  menuData.name = row.name as string
  menuData.code = row.code as unknown as string
  menuData.level = row.level as number
  menuData.pid = row.pid as number
  dialogVisible.value = true
}

//删除meun
const delMenu = async (row: Permisstion) => {
  let res = await reqRemoveMenu(row.id as number)
  if (res.code === 200) {
    ElMessage({ message: '删除成功', type: 'success' })
    getHasPermission()
  } else {
    ElMessage({ message: res.message, type: 'error' })
  }
}
</script>
<style scoped lang="scss"></style>
