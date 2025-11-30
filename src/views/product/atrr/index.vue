<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <!-- <div class="category">
        <span>一级分类</span>
        <el-select
          v-model="data.c1Id"
          placeholder="请选择一级分类"
          style="width: 240px"
          @focus="categoryOne"
          :disabled="scene === 1"
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
          v-model="data.c2Id"
          placeholder="请选择二级分类"
          style="width: 240px"
          @focus="categoryTwo"
          :disabled="scene === 1"
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
          v-model="data.c3Id"
          placeholder="请选择三级分类"
          style="width: 240px"
          @focus="categoryThree"
          :disabled="scene === 1"
        >
          <el-option
            v-for="item in category3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div> -->
      <Category :scene />
    </el-card>
    <!-- 第二个card -->
    <el-card style="max-width: 100%">
      <div v-if="scene === 0">
        <!-- 按钮 -->
        <el-button
          style="margin-bottom: 10px"
          type="primary"
          icon="CirclePlus"
          class="button"
          @click="addAttr"
          :disabled="!categoryStore.data.c3Id"
        >
          添加平台属性
        </el-button>
        <!-- 表格 -->
        <el-table
          :data="attrInfoList"
          stripe
          style="width: 100%"
          border
          empty-text="暂无数据"
        >
          <el-table-column prop="id" label="序号" width="80" type="index" />
          <el-table-column prop="attrName" label="属性名称" width="150" />
          <el-table-column prop="attrValueList" label="属性值名称">
            <template #default="scope">
              <div style="display: flex; align-items: center; gap: 10px">
                <el-tag type="primary" v-for="item in scope.row.attrValueList">
                  {{ item.valueName }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template #="{ row, $index }">
              <el-button
                size="small"
                type="primary"
                icon="Edit"
                @click="updateAttr(row)"
              >
                修改
              </el-button>
              <el-popconfirm
                :title="`确定删除${row.attrName}吗?`"
                width="250px"
                icon="Delete"
                @confirm="deleteAttr(row.id)"
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
      </div>
      <div v-if="scene === 1">
        <div class="attr-name">
          <span style="margin-right: 10px">属性名称</span>
          <el-input
            v-model="attrParams.attrName"
            placeholder="请输入属性内容"
            style="width: 240px"
          />
        </div>
        <div class="button-group-1">
          <el-button type="primary" @click="addAttrValue">
            + 添加属性值
          </el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
        <el-table
          :data="attrParams.attrValueList"
          stripe
          style="width: 100%"
          border
          empty-text="暂无数据"
        >
          <el-table-column prop="id" label="序号" width="80" type="index" />
          <el-table-column prop="valueName" label="属性值">
            <template #="{ row, $index }">
              <div style="display: flex; align-items: center" v-if="row.flag">
                <el-input
                  style="margin-left: 10px"
                  v-model="row.valueName"
                  placeholder="请输入属性值"
                  @blur="toLook(row, $index)"
                  :ref="(vc: any) => (inputArr[$index] = vc)"
                ></el-input>
              </div>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗?`"
                width="250px"
                icon="Delete"
                @confirm="deleteAttrValue($index)"
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
        <div class="button-group-2">
          <el-button type="primary" @click="confirm">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateAttrInfo,
  reqAttrInfoList,
  reqDeleteAttr,
} from '@/api/product/attr'
import type {
  attrInfoList,
  attrInfoListResponseData,
  attrParams,
  attrValue,
} from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
import Category from '@/components/Category/index.vue'
import { nextTick, ref, watch } from 'vue'
import { useCategoryStore } from '@/store/modules/category'

const categoryStore = useCategoryStore()

const attrInfoList = ref<attrInfoList>([])

const scene = ref<number>(0)

// const attrName = ref('')
// const attrValueList = ref<attrValueList>([])

const attrParams = ref<attrParams>({
  attrName: '',
  categoryId: 0,
  categoryLevel: 3,
  attrValueList: [],
})

let inputArr = ref<any>([])

// hook
async function useCategory() {
  if (
    categoryStore.data.c1Id &&
    categoryStore.data.c2Id &&
    categoryStore.data.c3Id
  ) {
    let res: attrInfoListResponseData = await reqAttrInfoList(
      categoryStore.data.c1Id,
      categoryStore.data.c2Id,
      categoryStore.data.c3Id,
    )
    if (res.code === 200) {
      attrInfoList.value = res.data
      attrParams.value.categoryId = categoryStore.data.c3Id
    } else {
      ElMessage.error(res.message)
    }
  }
}

//监听三级分类
watch(
  () => categoryStore.data.c3Id,
  async () => {
    attrInfoList.value = []

    await useCategory()
  },
)

//添加属性值列表
const addAttrValue = () => {
  // 检查是否已填写属性名
  if (!attrParams.value.attrName.trim()) {
    ElMessage.error('请先填写属性名')
    return
  }

  // 检查是否已填写三级分类ID
  if (!categoryStore.data.c3Id) {
    ElMessage.error('请选择三级分类')
    return
  }

  // 检查是否已有未填写的属性值
  const hasEmptyValue = attrParams.value.attrValueList.some(
    (item) => !item.valueName || !item.valueName.trim(),
  )

  if (hasEmptyValue) {
    ElMessage.error('请先填写所有属性值')
    return
  }

  // 添加新的空属性值
  attrParams.value.attrValueList.push({
    valueName: '',
    flag: true,
  })
}

//重置scene
const setScene = () => {
  scene.value = scene.value === 1 ? 0 : 1
}

//添加属性值大
const addAttr = async () => {
  scene.value = 1
  attrParams.value.attrName = ''
  attrParams.value.attrValueList = []
  attrParams.value.id = undefined
}
//修改大
const updateAttr = (row: any) => {
  scene.value = 1
  Object.assign(attrParams.value, JSON.parse(JSON.stringify(row)))
}

//取消大
const cancel = () => {
  attrParams.value.attrName = ''
  attrParams.value.attrValueList = []
  scene.value = 0
}

// 确认大
const confirm = async () => {
  if (attrParams.value.attrName == '') return ElMessage.error('请输入属性名称')
  let res = await reqAddOrUpdateAttrInfo(attrParams.value)
  if (res.code == 200) {
    scene.value = 0
    ElMessage.success(attrParams.value.id ? '添加成功' : '修改成功')
  } else {
    ElMessage.error(attrParams.value.id ? '添加失败' : '修改失败')
  }

  await useCategory()
}

// 删除属性
function deleteAttr(id: number) {
  if (!id) return ElMessage.error('请选择要删除的属性')
  reqDeleteAttr(id).then((res) => {
    if (res.code == 200) {
      ElMessage.success('删除成功')
      useCategory()
    } else {
      ElMessage.error('删除失败')
    }
  })
}

//tolook
function toLook(row: attrValue, index: number) {
  if (row.valueName.trim() == '') {
    attrParams.value.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性不能为空',
    })
    return
  }
  let res = attrParams.value.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (res) {
    attrParams.value.attrValueList.splice(index, 1)
    ElMessage({
      type: 'error',
      message: '属性不可以重复',
    })
    return
  }

  if (row.valueName) {
    row.flag = false
  } else {
    ElMessage.warning('请输入属性值')
  }
}

function toEdit(row: attrValue, index: number) {
  row.flag = true

  nextTick(() => {
    inputArr.value[index].focus()
    // console.log(inputArr.value[index])
  })
}

function deleteAttrValue(index: number) {
  attrParams.value.attrValueList.splice(index, 1)
}
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

.button-group-1 {
  margin: 10px 0;
}
.button-group-2 {
  margin: 10px 0;
}
</style>
