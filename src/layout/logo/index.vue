<template>
  <div class="logo-container">
    <img
      :src="`../../../${setting.logo}`"
      alt=""
      :style="{ display: setting.hideLogo ? 'none' : 'block' }"
    />
    <p>{{ setting.title }}</p>
  </div>
</template>
<script setup lang="ts">
import setting from '@/setting'
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  align-items: center;

  p {
    margin-left: 10px;
    font-size: 30px;
    color: #fff;
  }
  img {
    // width: 50px;
    height: $layout-tabbar-height;
  }
}
</style>
