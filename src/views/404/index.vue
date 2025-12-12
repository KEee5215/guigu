<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">页面未找到</h2>
      <p class="error-description">抱歉，您访问的页面不存在或已被删除</p>
      <button class="back-button" @click="goHome">返回首页</button>
    </div>
    <div class="astronaut">
      <div class="helmet"></div>
      <div class="body"></div>
      <div class="pack"></div>
      <div class="flag"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #66eadb 0%, rgb(75, 162, 111) 100%);
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
}

.not-found-content {
  text-align: center;
  color: white;
  z-index: 1;
  padding: 2rem;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  line-height: 1;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.error-title {
  font-size: 2rem;
  margin: 1rem 0;
  font-weight: normal;
}

.error-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.back-button {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
}

.astronaut {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 120px;
  height: 180px;
  animation: float 3s ease-in-out infinite;
}

.helmet {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: 30px;
  top: 0;
  box-shadow: inset -5px -5px 10px rgba(0, 0, 0, 0.1);
}

.body {
  width: 80px;
  height: 100px;
  background: #ff6b6b;
  border-radius: 40px 40px 10px 10px;
  position: absolute;
  top: 50px;
  left: 20px;
}

.pack {
  width: 50px;
  height: 70px;
  background: #4ecdc4;
  border-radius: 10px;
  position: absolute;
  top: 60px;
  left: 70px;
}

.flag {
  width: 30px;
  height: 20px;
  background: #ffd166;
  position: absolute;
  top: 70px;
  left: 85px;
  transform-origin: left center;
  animation: wave 2s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

@media (max-width: 768px) {
  .astronaut {
    display: none;
  }

  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-description {
    font-size: 1rem;
  }
}
</style>
