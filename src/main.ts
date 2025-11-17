import { createApp } from 'vue'
//引入全局样式
import '@/styles/index.scss'
// import './style.css'
import App from '@/App.vue'
// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 注册Element Plus
app.use(ElementPlus)
//注册全局组件SVG
import 'virtual:svg-icons-register'
//自定义插件
import globalComponent from '@/components/index'
app.use(globalComponent)

//引入路由
import router from '@/router'
app.use(router)
//引入pinia
import pinia from '@/store'
app.use(pinia)
//挂载
app.mount('#app')
