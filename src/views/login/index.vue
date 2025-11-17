<template>
  <div class="container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24" class="login-form-col">
        <el-form :model="loginForm" label-width="auto" class="login-form">
          <!-- 欢迎图标 -->
          <svg-icon name="welcome" width="100" height="100"></svg-icon>
          <!-- username -->
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <!-- password -->
          <el-form-item>
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="width: 100%">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'

import { ref } from 'vue'

let userStore = useUserStore()

const loginForm = ref({
  username: 'admin',
  password: '111111',
})

const onSubmit = () => {
  //   console.log(loginForm.value)
  // 登录逻辑
  userStore.userLogin(loginForm.value)
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/login.png') no-repeat center center;
  background-size: cover;
}
.login-form-col {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  width: 450px;
}
</style>
