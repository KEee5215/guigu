<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <Category :scene />
    </el-card>
    <el-card>
      <div class="default" v-show="scene === 0">
        <el-button
          type="primary"
          @click="addSpu"
          :disabled="!categoryStore.data.c3Id"
        >
          + 添加SPU
        </el-button>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%; min-width: 600px"
          border
          empty-text="暂无数据"
        >
          <el-table-column prop="id" type="index" label="序号" width="80" />
          <el-table-column prop="spuName" label="SPU名称" width="280" />
          <el-table-column prop="description" label="SPU描述" width="320" />
          <el-table-column label="操作">
            <template #="{ $index, row }">
              <el-button
                type="primary"
                icon="Plus"
                title="新增SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="View"
                title="查看SKU列表"
              ></el-button>
              <el-popconfirm :title="`你确定删除${row.name}吗?`">
                <template #reference>
                  <el-button
                    type="danger"
                    icon="Delete"
                    title="删除SKU列表"
                  ></el-button>
                </template>
              </el-popconfirm>
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
      </div>
      <!-- SPU表单 -->
      <SpuForm ref="spu" v-show="scene === 1" @changeScene="changeScene" />
      <!-- SKU表单 -->
      <SkuForm ref="sku" v-show="scene === 2" @changeScene="changeScene" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import { ref, watch } from 'vue'
import { useCategoryStore } from '@/store/modules/category'
import { reqSpuPage } from '@/api/product/spu'
import { ElMessage } from 'element-plus'
import { type records } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import type { record } from '@/api/product/spu/type'
const categoryStore = useCategoryStore()

const tableData = ref<records>([])

// 场景切换
const scene = ref<number>(0) // 0: 列表  1:spu  2:  sku

function changeScene(num: number, addOrEdit: boolean) {
  scene.value = num

  if (addOrEdit) {
    // 添加,回到第一页
    getSpuPage(1, pageSize.value)
  } else {
    // 修改,回到当前页
    getSpuPage(currentPage.value, pageSize.value)
  }
}

const spu = ref<any>()
const sku = ref<any>()

// 分页相关
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)

function addSpu() {
  scene.value = 1
  spu.value.initAdd(categoryStore.data.c3Id)
}

function updateSpu(row: record) {
  scene.value = 1
  spu.value.initUpdate(row)
}

function addSku(row: record) {
  sku.value.initAddSku(categoryStore.data.c1Id, categoryStore.data.c2Id, row)
  scene.value = 2
}

async function getSpuPage(page: number, limit: number) {
  let res = await reqSpuPage(page, limit, categoryStore.data.c3Id as number)
  if (res.code === 200) {
    tableData.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error(res.message)
  }
}

watch(
  () => categoryStore.data.c3Id,
  async () => {
    if (!categoryStore.data.c3Id) {
      tableData.value = []
      // ElMessage.error('请选择三级分类')
      return
    }
    await getSpuPage(1, pageSize.value)
  },
)

// 分页
function handleSizeChange(size: number) {
  pageSize.value = size
  currentPage.value = 1
  getSpuPage(1, pageSize.value)
}

function handleCurrentChange(page: number) {
  currentPage.value = page
  getSpuPage(currentPage.value, pageSize.value)
}
</script>

<style scoped>
button {
  margin-bottom: 10px;
}
</style>
