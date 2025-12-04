<template>
  <el-card>
    <el-table border style="margin: 10px 0px" :data="skuArr">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="250px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="250px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="250px">
        <template #default="{ row }">
          <img :src="row.skuDefaultImg" height="100" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        width="250px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格"
        width="250px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #default="{ row }">
          <el-button
            @click="updataSale(row)"
            :type="row.isSale ? 'info' : 'primary'"
            size="small"
            :icon="row.isSale ? 'Bottom' : 'Top'"
          ></el-button>
          <el-button
            type="success"
            size="small"
            icon="Edit"
            @click="updataSku()"
          ></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="getSkuInfo(row)"
          ></el-button>

          <el-popconfirm
            :title="`确定删除${row.skuName}吗？`"
            @confirm="deleteSku(row)"
          >
            <template #reference>
              <el-button type="warning" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 50]"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <div>
          <el-row style="margin: 10px 0px">
            <el-col :span="6">名称</el-col>
            <el-col :span="18">
              {{ skuInfo?.skuName }}
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0px">
            <el-col :span="6">描述</el-col>
            <el-col :span="18">
              {{ skuInfo?.skuDesc }}
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0px">
            <el-col :span="6">价格</el-col>
            <el-col :span="18">{{ skuInfo?.price }}</el-col>
          </el-row>
          <el-row style="margin: 10px 0px">
            <el-col :span="6">平台属性</el-col>
            <el-col :span="18">
              <el-tag
                v-for="lime in skuInfo?.skuAttrValueList"
                :key="lime"
                type="info"
                style="margin: 5px 5px"
              >
                {{ lime.attrName }}
              </el-tag>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0px">
            <el-col :span="6">销售属性</el-col>
            <el-col :span="18">
              <el-tag
                v-for="lime in skuInfo?.skuSaleAttrValueList"
                style="margin: 5px 5px"
                :key="lime.id"
                type="info"
              >
                {{ lime.saleAttrValueName }}
              </el-tag>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0px">
            <el-col :span="6">商品图片</el-col>
            <el-col :span="18">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item
                  v-for="item in skuInfo?.skuImageList"
                  :key="item"
                >
                  <img :src="item.imgUrl" width="200" />
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>
<script setup lang="ts">
import {
  reqCancelSaleSku,
  reqDeleteSku,
  reqSaleSku,
  reqSkuInfo,
  reqSkuList,
} from '@/api/product/sku/index'
import type { saveSkuInfoParams } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

import { onMounted, ref } from 'vue'

//当前页数
let pageNo = ref<number>(1)
//每页显示多少条
let pageSize = ref<number>(10)
//总条数
let total = ref<number>(0)
let skuArr = ref<saveSkuInfoParams[]>([])
//是否显示抽屉
let drawer = ref<boolean>(false)
//当前的sku信息
let skuInfo = ref<saveSkuInfoParams>()
//获取已有的sku数据
const getHasSku = async (page: number = 1) => {
  pageNo.value = page
  let res = await reqSkuList(page, pageSize.value)
  if (res.code === 200) {
    skuArr.value = res.data.records
    total.value = res.data.total
  }
}
//商品的上架和下架
const updataSale = async (row: saveSkuInfoParams) => {
  //如果是上架
  if (row.isSale == 0) {
    //调用接口修改商品的上架状态
    let res = await reqSaleSku(row.id as number)
    if (res.code == 200) {
      ElMessage({
        type: 'success',
        message: '上架成功',
      })
      getHasSku(pageNo.value)
    } else if (res.code == 400) {
      ElMessage({
        type: 'error',
        message: '上架失败',
      })
    }
    //如果是下架
  } else {
    let res = await reqCancelSaleSku(row.id as number)
    if (res.code == 200) {
      ElMessage({
        type: 'success',
        message: '下架成功',
      })
      getHasSku(pageNo.value)
    } else if (res.code == 400) {
      ElMessage({
        type: 'error',
        message: '下架失败',
      })
    }
    //调用接口修改商品的下架状态
  }
}
//修改sku
const updataSku = () => {
  ElMessage({
    type: 'info',
    message: '努力更改中',
  })
}
//当前页码变化时改变
const handleCurrentChange = (page: number) => {
  getHasSku(page)
}

//分页器发生变化
const handleSizeChange = () => {
  getHasSku()
}
//组件挂载时获取已有的sku数据
onMounted(() => {
  getHasSku()
})
//获取sku的详情
const getSkuInfo = async (row: saveSkuInfoParams) => {
  let res = await reqSkuInfo(row.id as number)
  drawer.value = true
  if (res.code == 200) {
    skuInfo.value = res.data
  }
}
//删除sku
const deleteSku = async (row: saveSkuInfoParams) => {
  let res = await reqDeleteSku(row.id as number)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSku(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>
<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
