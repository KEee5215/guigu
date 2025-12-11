<template>
  <el-button icon="Refresh" circle @click="refresh" />
  <el-button :icon="iconName" circle @click="fullScreen" />
  <el-popover placement="bottom" title="主题设置" :width="200" trigger="click">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="setColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="switchValue"
          active-icon="Sunny"
          inactive-icon="Moon"
          inline-prompt
          @change="changeTheme"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" circle />
    </template>
  </el-popover>

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

// 暗黑模式
const switchValue = ref<boolean>(false)

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
async function userLogout() {
  //向服务器发送请求
  //暂时没有
  // 清除登录信息
  await userStore.userLogout()
  // 跳转登录页面

  router.push({ path: '/login', query: { redirect: route.path } })
}

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

function changeTheme() {
  const htmlElement = document.documentElement
  if (switchValue.value) {
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
  }
}

function setColor(color: string) {
  document.documentElement.style.setProperty('--el-color-primary', color)
}
</script>

<style scoped lang="scss">
.block {
  cursor: pointer;
  margin-left: 12px;
}
</style>
