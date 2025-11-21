<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.meta.hidden">
      <el-menu-item v-if="!item.children" :index="item.path" @click="goRouter">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>
            {{ item.meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="!item.meta.hidden">
      <el-menu-item
        v-if="item.children && item.children.length === 1"
        :index="item.children[0].path"
        @click="goRouter"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>
            {{ item.children[0].meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="!item.meta.hidden">
      <el-sub-menu
        v-if="item.children && item.children.length > 1"
        :index="item.path"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>
            {{ item.meta.title }}
          </span>
        </template>
        <Menu :menuList="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts" name="Menu">
import router from '@/router'

defineProps(['menuList'])

//路由跳转
const goRouter = (vc: any) => {
  // console.log(vc.index)
  router.push(vc.index)
}
</script>
<!-- <script lang="ts">
export default {
  name: 'Menu',
}
</script> -->

<style lang="scss" scoped></style>
