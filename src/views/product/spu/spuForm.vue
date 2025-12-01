<template>
  <div>
    <el-form :form="spuParams" label-width="100px">
      <!-- 名称 -->
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName" />
      </el-form-item>
      <!-- 品牌 -->
      <el-form-item label="SPU品牌">
        <el-select
          placeholder="请你选择品牌"
          style="width: 240px"
          v-model="spuParams.tmId"
        >
          <el-option
            :value="item.id"
            :label="item.tmName"
            v-for="item in allTradeMark"
          />
        </el-select>
      </el-form-item>
      <!-- 描述 -->
      <el-form-item label="SPU描述">
        <el-input type="textarea" v-model="spuParams.description" />
      </el-form-item>
      <!-- 图片上传 -->
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="imgList"
          :headers="{ token: userStore.token }"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!-- 添加销售属性 -->
      <el-form-item label="SPU销售属性" class="spu-sale-attr">
        <el-select
          v-model="saleAttrIdAndValueName"
          :placeholder="`还有${unSelectSaleAttr.length}个选择`"
          style="width: 240px"
        >
          <el-option
            :value="`${item.id}:${item.name}`"
            :label="item.name"
            :key="item.id"
            v-for="(item, index) in unSelectSaleAttr"
          />
        </el-select>
        <el-button
          type="primary"
          :disabled="!saleAttrIdAndValueName ? true : false"
          @click="addSaleAttr"
        >
          + 添加添加销售属性
        </el-button>
        <el-table stripe border style="margin-top: 10px" :data="saleAttrList">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名"></el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                style="margin-right: 6px"
                closable
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-button
                class="button-new-tag"
                type="success"
                size="small"
                v-if="!row.flag"
                @click="row.flag = true"
              >
                +
              </el-button>
              <el-input
                v-if="row.flag"
                ref="InputRef"
                v-model="newInputAttrValue"
                style="width: 100px"
                placeholder="请输入属性值"
                size="small"
                @keyup.enter="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ $index, row }">
              <el-popconfirm
                :title="`你确定要删除${row.saleAttrName}吗？`"
                @confirm="saleAttrList.splice($index, 1)"
              >
                <template #reference>
                  <el-button type="danger" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible">
      <img style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqGetSaleAttrList, reqSpuImageList } from '@/api/product/sku'
import type {
  saleAttr,
  saleAttrValue,
  skuHasSaleAttrValueList,
  spuImg,
  spuImgList,
} from '@/api/product/sku/type'
import { reqAddOrUpdateSpuInfo, reqBaseSaleAttrList } from '@/api/product/spu'
import type { record, baseSaleAttrValue } from '@/api/product/spu/type'
import { reqGetAllTrademark } from '@/api/product/trademark'
import type { TradeMark } from '@/api/product/trademark/type'
import useUserStore from '@/store/modules/user'
import { ElMessage, type UploadProps, type UploadRawFile } from 'element-plus'
import { ref, computed } from 'vue'

const userStore = useUserStore()

const emit = defineEmits(['changeScene'])

let saleAttrIdAndValueName = ref<string>('')

defineExpose({ init })

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 添加销售属性暂时储存
const newInputAttrValue = ref<string>('')

function beforeUpload(rawFile: UploadRawFile) {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size < 1024 * 1024 * 5) {
      return true
    } else {
      ElMessage.error('上传图片不能大于5M')
    }
  } else {
    ElMessage.error('上传图片格式不正确')
  }
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const cancel = () => {
  emit('changeScene', 0)
}

const spuParams = ref<record>({
  spuName: '',
  description: '',
  category3Id: 0,
  tmId: 0,
  spuImageList: [],
  spuSaleAttrList: [],
})

const allTradeMark = ref<TradeMark[]>([])
const baseSaleAttrList = ref<baseSaleAttrValue[]>([])
const imgList = ref<spuImgList>([])
const saleAttrList = ref<saleAttr[]>([])

async function init(row: record) {
  // console.log(row)
  spuParams.value = row
  let res1 = await reqGetAllTrademark() // 获取所有品牌
  let res2 = await reqBaseSaleAttrList()
  let res3 = await reqSpuImageList(row.id as number)
  let res4: skuHasSaleAttrValueList = await reqGetSaleAttrList(row.id as number)

  allTradeMark.value = res1.data
  baseSaleAttrList.value = res2.data // 获取所有销售属性
  imgList.value = res3.data
  saleAttrList.value = res4.data

  // 将 imgList 中每个对象的 imgUrl 和 id 提取到 fileList 中
  imgList.value = res3.data.map((item: any) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })

  // console.log(saleAttrList.value)
}

//根据baseSaleAttrList数组和saleAttrList数组计算未选中的属性
let unSelectSaleAttr = computed(() => {
  let unSelectArr = baseSaleAttrList.value.filter((item) => {
    return !saleAttrList.value.some(
      (hasAttr) => hasAttr.baseSaleAttrId === item.id,
    )
  })
  return unSelectArr
})

function addSaleAttr() {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: saleAttr = {
    baseSaleAttrId: Number(baseSaleAttrId),
    saleAttrName: saleAttrName as string,
    spuSaleAttrValueList: [],
  }
  saleAttrList.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}

function handleInputConfirm(row: saleAttr) {
  row.flag = false
  if (newInputAttrValue.value.trim() === '') {
    ElMessage.warning('属性值不能为空')
    return
  }

  //去重
  let isRepeat = row.spuSaleAttrValueList.find(
    (item) => item.saleAttrValueName === newInputAttrValue.value,
  )
  if (isRepeat) {
    ElMessage.warning('属性值已存在')
    newInputAttrValue.value = ''
    return
  }

  if (newInputAttrValue.value) {
    row.spuSaleAttrValueList.push({
      saleAttrValueName: newInputAttrValue.value,
      // spuId: row.spuId,
      baseSaleAttrId: row.baseSaleAttrId,
    })
    newInputAttrValue.value = ''
  } else {
    ElMessage.warning('请输入属性值')
  }
}

async function save() {
  // 处理图片
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url, //兼容上传图片成功后的处理函数
    }
  })
  // 处理销售属性
  spuParams.value.spuSaleAttrList = saleAttrList.value

  // console.log(spuParams.value)

  let res = await reqAddOrUpdateSpuInfo(spuParams.value)

  if (res.code === 200) {
    ElMessage.success(spuParams.value.id ? '修改成功' : '添加成功')
    emit('changeScene', 0) //跳转到列表页
  } else {
    ElMessage.error(spuParams.value.id ? '修改失败' : '添加失败')
  }
}
</script>

<style scoped>
button {
  margin-left: 10px;
}
</style>
