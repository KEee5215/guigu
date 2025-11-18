<template>
  <div class="layout-container">
    <div class="layout-slider">
      <logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#22272e"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据大屏</el-menu-item>

          <el-sub-menu index="3">
            <template #title>
              <el-icon><location /></el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><location /></el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="4-1">商品列表</el-menu-item>
            <el-menu-item index="4-2">商品分类</el-menu-item>
            <el-menu-item index="4-3">商品规格</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout-tabbar">这是头部</div>
    <div class="layout-main">
      <p style="height: 1000px; background-color: aquamarine">这是主体</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Location, User } from '@element-plus/icons-vue'
import Logo from './logo/index.vue'
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  width: 100%;
  background-color: aquamarine;
  .layout-slider {
    height: 100%;
    width: $layout-slider-width;
    background-color: $layout-slider-color;

    .scrollbar {
      //   padding: 20px;
      height: calc(100% - $layout-tabbar-height);
    }
  }
  .layout-tabbar {
    height: $layout-tabbar-height;
    width: calc(100% - $layout-slider-width);
    background-color: $layout-tabbar-color;
    position: fixed;
    top: 0;
    left: $layout-slider-width;
    color: #fcfcfc;
  }
  .layout-main {
    height: calc(100% - $layout-tabbar-height);
    width: calc(100% - $layout-slider-width);
    background-color: #fcfcfc;
    position: absolute;
    top: $layout-tabbar-height;
    left: $layout-slider-width;
    padding: 20px;
    overflow: auto;
  }
}
</style>
