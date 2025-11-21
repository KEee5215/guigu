<template>
  <!-- 折叠按钮 -->
  <el-icon>
    <component class="icon" :is="iconName" @click="changeIcon"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="arrow-right">
    <el-breadcrumb-item
      v-for="item in route.matched"
      :key="item.path"
      v-show="item.name !== 'layout'"
      :to="{ path: item.path }"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin-left: 5px">
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLayOutSettingStore } from '@/store/modules/setting'

const route = useRoute()
let layOutSettingStore = useLayOutSettingStore()

// console.log(route)

function changeIcon() {
  layOutSettingStore.isCollapse = !layOutSettingStore.isCollapse
}

const iconName = computed(() =>
  layOutSettingStore.isCollapse ? 'Expand' : 'Fold',
)
</script>

<style scoped>
.icon {
  color: #000000;
}
</style>
