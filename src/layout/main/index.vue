<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts" name="Main">
import { useLayOutSettingStore } from '@/store/modules/setting'
import { nextTick, ref, watch } from 'vue'

let layOutSettingStore = useLayOutSettingStore()

const flag = ref(true)

watch(
  () => {
    return layOutSettingStore.refresh
  },
  () => {
    // 刷新页面
    flag.value = false

    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
