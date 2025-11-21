<template>
  <div class="container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24" class="login-form-col">
        <el-form
          :model="loginForm"
          :rules="rules"
          label-width="auto"
          class="login-form"
          ref="loginFormRef"
        >
          <!-- 欢迎图标 -->
          <svg-icon name="welcome" width="100" height="100"></svg-icon>
          <!-- username -->
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <!-- password -->
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              @click="onSubmit"
              style="width: 100%"
            >
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
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'

import { ref } from 'vue'
import { getTime } from '@/utils/getTimeHelper'
import { ro } from 'element-plus/es/locales.mjs'

const router = useRouter()
const route = useRoute()
let userStore = useUserStore()
// 登录表单引用
const loginFormRef = ref()

// 登录表单数据
const loginForm = ref({
  username: 'admin',
  password: '111111',
})
// 登录表单校验规则
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, message: '用户名长度必须大于4', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度必须大于6', trigger: 'blur' },
  ],
})
// 登录按钮loading状态
const loading = ref(false)

const onSubmit = async () => {
  // 校验表单
  console.log(loginFormRef.value.validate())
  await loginFormRef.value.validate()
  //   console.log(loginForm.value)
  loading.value = true
  // 登录逻辑
  try {
    await userStore.userLogin(loginForm.value)
    //登录成功 -> 跳转首页
    if (route.query.redirect) {
      router.push({ path: route.query.redirect as string })
    } else {
      router.push({ name: 'layout' })
    }
    //登录成功 -> 提示成功信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi!${getTime()}`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
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
