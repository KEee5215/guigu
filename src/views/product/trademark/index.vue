<template>
  <div>
    <el-card style="max-width: 100%">
      <!-- 按钮 -->
      <el-button
        type="primary"
        icon="CirclePlus"
        class="button"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
      <!-- 表格 -->
      <el-table :data="data" stripe style="width: 100%" border>
        <el-table-column
          prop="id"
          label="序号"
          width="120"
          type="index"
        ></el-table-column>
        <el-table-column prop="tmName" label="品牌名称"></el-table-column>
        <el-table-column prop="logoUrl" label="品牌LOGO">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              size="small"
              type="primary"
              icon="Edit"
              @click="updateTrademark(row)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`确定删除${row.tmName}吗?`"
              width="250px"
              icon="Delete"
              @confirm="deleteTrademark(row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 4, 5, 6]"
        layout="prev, pager, next, jumper,->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      width="500"
      :title="trademarkParams.id ? '修改品牌' : '新增品牌'"
    >
      <el-form :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="80px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
          <!-- 上传图片 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :headers="{ token: userStore.token }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
  reqHashTrademark,
} from '@/api/product/trademark'
import { useUserStore } from '@/store/modules/user'
import type {
  records,
  TradeMark,
  trademarkResponseData,
} from '@/api/product/trademark/type'
import { ElMessage, type FormRules, type UploadProps } from 'element-plus'

const userStore = useUserStore()

const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)
const data = ref<records>([])

const dialogFormVisible = ref<boolean>(false)

//收集新增品牌的数据
const trademarkParams = ref<TradeMark>({
  tmName: '',
  logoUrl: '',
})

const formRef = ref()

function handleSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  getHashTrademark(1, pageSize.value)
}

function handleCurrentChange(page: number) {
  currentPage.value = page
  getHashTrademark(currentPage.value, pageSize.value)
}

// 获取品牌列表分页
async function getHashTrademark(page: number, limit: number) {
  const res: trademarkResponseData = await reqHashTrademark(page, limit)
  try {
    if (res.code === 200) {
      data.value = res.data.records
      total.value = res.data.total
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getHashTrademark(currentPage.value, pageSize.value)
})

// 添加品牌
function addTrademark() {
  trademarkParams.value.id = 0
  trademarkParams.value.tmName = ''
  trademarkParams.value.logoUrl = ''
  dialogFormVisible.value = true
  formRef.value?.clearValidate()
}

// 修改品牌
function updateTrademark(row: TradeMark) {
  trademarkParams.value = row
  dialogFormVisible.value = true
}

// 取消
function cancel() {
  dialogFormVisible.value = false
}

// 确定
async function confirm() {
  await formRef.value.validate() //返回一个promise,全部校验成功后才会继续执行

  let res = await reqAddOrUpdateTrademark(trademarkParams.value)
  console.log(res)
  if (res.code === 200) {
    ElMessage.success(trademarkParams.value.id ? '修改成功' : '添加成功')

    dialogFormVisible.value = false
    getHashTrademark(currentPage.value, pageSize.value) //刷新,第一页
  } else {
    ElMessage.error(trademarkParams.value.id ? '修改失败' : '添加失败')
    dialogFormVisible.value = false
  }
}

// 上传图片前的约束函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传图片大小不能超过4M')
      return false
    }
  } else {
    ElMessage.error('上传图片格式不正确')
    return false
  }
}

// 上传图片成功后的处理函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  trademarkParams.value.logoUrl = response.data
  formRef.value.clearValidate()
}

// 表单验证
const validateTmName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入品牌名称'))
  } else {
    if (value.length < 2) {
      callback(new Error('品牌名称太短了'))
    }
    callback()
  }
}

const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请上传品牌LOGO'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<typeof trademarkParams.value>>({
  tmName: [{ required: true, validator: validateTmName, trigger: 'blur' }],
  logoUrl: [{ required: true, validator: validateLogoUrl }],
})

// 删除品牌
async function deleteTrademark(id: number) {
  let res = await reqDeleteTrademark(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getHashTrademark(currentPage.value, pageSize.value)
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped lang="scss">
.button {
  margin: 10px 0;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
