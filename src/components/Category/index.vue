<template>
  <div>
    <div class="category">
      <span>一级分类</span>
      <el-select
        v-model="categoryStore.data.c1Id"
        placeholder="请选择一级分类"
        style="width: 240px"
        @focus="categoryOne"
        :disabled="scene !== 0"
      >
        <el-option
          v-for="item in category1"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <span>二级分类</span>
      <el-select
        v-model="categoryStore.data.c2Id"
        placeholder="请选择二级分类"
        style="width: 240px"
        @focus="categoryTwo"
        :disabled="scene !== 0"
      >
        <el-option
          v-for="item in category2"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <span>三级分类</span>
      <el-select
        v-model="categoryStore.data.c3Id"
        placeholder="请选择三级分类"
        style="width: 240px"
        @focus="categoryThree"
        :disabled="scene !== 0"
      >
        <el-option
          v-for="item in category3"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reqOneCategory,
  reqThreeCategory,
  reqTwoCategory,
} from '@/api/product/attr'
import type { categorys } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
import { onUnmounted, ref } from 'vue'
import { useCategoryStore } from '@/store/modules/category'

// const data = ref({
//   c1Id: null,
//   c2Id: null,
//   c3Id: null,
// })

defineProps({
  scene: {
    type: Number,
    default: 0,
  },
})

const categoryStore = useCategoryStore()

const category1 = ref<categorys>([])
const category2 = ref<categorys>([])
const category3 = ref<categorys>([])

async function categoryOne() {
  categoryStore.data.c2Id = null
  categoryStore.data.c3Id = null
  let res = await reqOneCategory()
  if (res.code === 200) {
    category1.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}
async function categoryTwo() {
  categoryStore.data.c3Id = null
  if (!categoryStore.data.c1Id) {
    ElMessage.error('请选择一级分类')
    return
  }

  let res = await reqTwoCategory(categoryStore.data.c1Id)
  if (res.code === 200) {
    category2.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}

async function categoryThree() {
  if (!categoryStore.data.c2Id) {
    ElMessage.error('请选择二级分类')
    return
  }

  let res = await reqThreeCategory(categoryStore.data.c2Id)
  if (res.code === 200) {
    category3.value = res.data
  } else {
    ElMessage.error(res.message)
  }
}

// 组件卸载时清空 store 中的 data
onUnmounted(() => {
  categoryStore.clearData()
})
</script>

<style scoped lang="scss">
.category {
  display: flex;
  justify-content: center;
  gap: 20px;

  align-items: center;
  span {
    font-size: 14px;
    color: #626060;
  }
}

span {
  font-size: 14px;
  color: #626060;
}
</style>
