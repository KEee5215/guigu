<template>
  <svg :style="{ width: width + 'px', height: height + 'px', color: color }">
    <use :xlink:href="prefix + name"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    // 图标前缀
    type: String,
    default: '#icon-',
  },
  name: String, // 图标名称
  color: {
    type: String,
    default: '',
  }, // 图标颜色
  width: {
    //宽
    type: [String, Number],
    default: 30,
  },
  height: {
    //高
    type: [String, Number],
    default: 30,
  },
})
</script>

<style scoped></style>
