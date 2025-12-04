<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SKU名称">
        <el-input
          placeholder="请输入SKU名称"
          type="text"
          v-model="skuParams.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="请输入SKU价格(元)"
          type="number"
          v-model="skuParams.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(g)">
        <el-input
          placeholder="请输入SKU重量(g)"
          type="number"
          v-model="skuParams.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          placeholder="请输入SKU描述"
          type="textarea"
          v-model="skuParams.skuDesc"
        ></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <el-form label-width="100px" :inline="true" :form="attrList">
          <el-form-item
            v-for="item in attrList"
            :label="item.attrName"
            :key="item.id"
          >
            <el-select
              style="width: 150px"
              placeholder="请选择"
              v-model="item.attrIdAndValueId"
            >
              <el-option
                :label="value.valueName"
                :value="`${item.id}:${value.id}`"
                :key="value.id"
                v-for="value in item.attrValueList"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-form label-width="100px" :inline="true" :form="saleAttrList">
          <el-form-item v-for="item in saleAttrList" :label="item.saleAttrName">
            <el-select
              style="width: 150px"
              placeholder="请选择"
              v-model="item.attrIdAndValueId"
            >
              <el-option
                :label="value.saleAttrValueName"
                :value="`${item.id}:${value.id}`"
                v-for="value in item.spuSaleAttrValueList"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 表格 -->
      <el-form-item>
        <el-table
          ref="table"
          empty-text="暂无数据"
          border
          stripe
          :data="imgList"
          @select-all="handleSelectAll"
          @select="handleSelect"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          ></el-table-column>
          <el-table-column label="图片">
            <template #="{ row, $index }">
              <el-image
                style="width: 100px; height: 100px"
                :src="row.imgUrl"
                :preview-src-list="[row.imgUrl]"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="warning" @click="handler(row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reqAttrInfoList } from '@/api/product/attr'
import type { attrInfo } from '@/api/product/attr/type'
import {
  reqGetSaleAttrList,
  reqSaveSkuInfo,
  reqSpuImageList,
} from '@/api/product/sku'
import type {
  saleAttr,
  saveSkuInfoParams,
  spuImgList,
} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

import { ref } from 'vue'

const emit = defineEmits(['changeScene'])
function cancel() {
  console.log('取消')
  emit('changeScene', 0)
}

const imgList = ref<spuImgList>([])
const saleAttrList = ref<saleAttr[]>([])
const attrList = ref<attrInfo[]>([])

const skuParams = ref<saveSkuInfoParams>({
  category3Id: '',
  id: 0,
  isSale: 0,
  //v-model:
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',

  //
  skuAttrValueList: [],
  skuDefaultImg: '',
  skuImageList: [],

  skuSaleAttrValueList: [],
  spuID: '',
  tmId: '',
})

//初始化
const initAddSku = async (c1Id: number, c2Id: number, spu: any) => {
  console.log('初始化')
  skuParams.value.category3Id = spu.category3Id
  skuParams.value.spuID = spu.id
  skuParams.value.tmId = spu.tmId

  let res = await reqAttrInfoList(c1Id, c2Id, spu.category3Id) //平台属性
  let res1 = await reqGetSaleAttrList(spu.id) //销售属性
  let res2 = await reqSpuImageList(spu.id as number) //图片
  attrList.value = res.data
  saleAttrList.value = res1.data
  imgList.value = res2.data
}

const table = ref<any>()

async function handler(row: any) {
  console.log(table.value)
  table.value.clearSelection()
  table.value.toggleRowSelection(row, true)
  skuParams.value.skuDefaultImg = row.imgUrl
}

function handleSelectAll(selection: any) {
  table.value.clearSelection()
  skuParams.value.skuDefaultImg = ''
  ElMessage.warning('请选择一张图片')
}

function handleSelect(selection: any) {
  // console.log(selection)
  table.value.clearSelection()
  skuParams.value.skuDefaultImg = ''
  ElMessage.warning('请使用操作按钮')
}

async function save() {
  // console.log(skuParams.value)
  skuParams.value.skuAttrValueList = attrList.value.reduce(
    (prev: any, next: any) => {
      if (next.attrIdAndValueId) {
        //分割字符串
        let [attrId, valueId] = next.attrIdAndValueId.split(':')
        // console.log(attrId, valueId)
        prev.push({
          attrId,
          valueId,
        })
      }
      return prev
    },
    [],
  )
  skuParams.value.skuSaleAttrValueList = saleAttrList.value.reduce(
    (prev: any, next: any) => {
      if (next.attrIdAndValueId) {
        //分割字符串
        let [attrId, valueId] = next.attrIdAndValueId.split(':')
        // console.log(attrId, valueId)
        prev.push({
          saleAttrId: attrId,
          saleAttrValueId: valueId,
        })
      }
      return prev
    },
    [],
  )

  // console.log(skuParams.value)
  let res = await reqSaveSkuInfo(skuParams.value)
  // console.log(res)
  if (res.code == 200) {
    ElMessage.success('添加成功')
    emit('changeScene', 0)
    cancel()
  } else {
    ElMessage.error('添加失败')
  }
}

defineExpose({
  initAddSku,
})
</script>

<style scoped></style>
