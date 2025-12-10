<template>
  <div class="box">
    <el-card>
      <div class="bos">
        <img :src="UserInfo.avatar" class="img" />
        <h3 class="h3">你好,{{ UserInfo.username }}</h3>
      </div>
    </el-card>
    <SvgIcon
      name="welcome"
      width="500px"
      height="300px"
      class="buttons"
    ></SvgIcon>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const UserInfo = ref({
  avatar: '',
  username: '',
})

onMounted(() => {
  UserInfo.value.avatar = userStore.avatar
  UserInfo.value.username = userStore.username
})
</script>
<style scoped>
.bos {
  display: flex;
  align-items: center;
  .h3 {
    font-size: 40px;
  }
}

.buttons {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0px 20px;
}
</style>
