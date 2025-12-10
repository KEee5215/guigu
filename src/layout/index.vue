<template>
  <div class="layout-container">
    <div
      class="layout-slider"
      :class="{ collapse: layOutsettingStore.isCollapse }"
    >
      <logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          class="el-menu"
          text-color="#fff"
          background-color="#22272e"
          active-text-color="#ffd04b"
          :default-active="route.path"
          :collapse="layOutsettingStore.isCollapse"
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 上边栏 -->
    <div
      class="layout-tabbar"
      :class="{ collapse: layOutsettingStore.isCollapse }"
    >
      <Tabbar />
    </div>
    <!-- 主内容 -->
    <div
      class="layout-main"
      :class="{ collapse: layOutsettingStore.isCollapse }"
    >
      <Main />
    </div>
  </div>
</template>
<script setup lang="ts" name="Layout">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useUserStore } from '@/store/modules/user'
import { useRoute } from 'vue-router'

import { useLayOutSettingStore } from '@/store/modules/setting'

let layOutsettingStore = useLayOutSettingStore()

const route = useRoute()

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  width: 100%;

  .layout-slider {
    height: 100%;
    width: $layout-slider-width;
    background-color: $layout-slider-color;
    transition: all 0.3s ease-in-out;
    .scrollbar {
      //   padding: 20px;
      height: calc(100% - $layout-tabbar-height);
      color: #fcfcfc;
      .el-menu {
        border-right: none;
        background-color: $layout-slider-color;
      }
    }
    &.collapse {
      width: $layout-slider-min-width;
    }
  }
  .layout-tabbar {
    height: $layout-tabbar-height;
    width: calc(100% - $layout-slider-width);
    // background-color: $layout-tabbar-color;
    position: fixed;
    top: 0;
    left: $layout-slider-width;
    color: #fcfcfc;
    transition: all 0.3s ease-in-out;

    &.collapse {
      width: calc(100vw - $layout-slider-min-width);
      left: $layout-slider-min-width;
    }
  }
  .layout-main {
    height: calc(100% - $layout-tabbar-height);
    width: calc(100% - $layout-slider-width);

    position: absolute;
    top: $layout-tabbar-height;
    left: $layout-slider-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s ease-in-out;

    &.collapse {
      width: calc(100vw - $layout-slider-min-width);

      left: $layout-slider-min-width;
    }
  }
}
</style>
