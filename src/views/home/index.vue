<template>
  <div>
    <h1>首页</h1>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/store/modules/user'

onMounted(() => {
  useUserStore().getUserInfo()
})
</script>

<style lang="sass" scoped></style>
