<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { reqLogin } from './api/user'
</script>

<style scoped lang="scss"></style>
