<template>
  <el-button icon="Refresh" circle @click="refresh" />
  <el-button :icon="iconName" circle @click="fullScreen" />
  <el-button icon="Setting" circle />
  <div class="block">
    <el-avatar :size="32" :src="userStore.avatar" />
  </div>

  <!-- 下拉菜单 -->
  <el-dropdown class="block" size="small">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="Setting">
import { useLayOutSettingStore } from '@/store/modules/setting'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

let layOutSettingStore = useLayOutSettingStore()
const userStore = useUserStore()

// 刷新
function refresh() {
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}

const isFullScreen = ref(false)
// 全屏
function fullScreen() {
  if (!isFullScreen.value) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
  isFullScreen.value = !isFullScreen.value
}
// const iconName = ref('FullScreen')

const iconName = computed(() => {
  if (isFullScreen.value === true) {
    return 'Close'
  } else {
    return 'FullScreen'
  }
})

// 退出登录
function userLogout() {
  //向服务器发送请求
  //暂时没有
  // 清除登录信息
  userStore.userLogout()
  // 跳转登录页面

  router.push({ path: '/login', query: { redirect: route.path } })
}
</script>

<style scoped lang="scss">
.block {
  cursor: pointer;
  margin-left: 12px;
}
</style>
