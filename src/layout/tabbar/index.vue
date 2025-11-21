<template>
  <div class="tabbar-container">
    <!-- 左侧 -->
    <div class="tabbar-left">
      <breadcrumb />
    </div>
    <!-- 右侧设置选项 -->
    <div class="tabbar-right">
      <setting />
    </div>
  </div>
</template>

<script setup lang="ts" name="Tabbar">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //   color: #fff;

  .tabbar-left {
    // width: 50px;
    cursor: pointer;
    // color: #fff;
    display: flex;

    gap: 20px;
  }

  .tabbar-right {
    display: flex;
    align-items: center;
  }
}
</style>
