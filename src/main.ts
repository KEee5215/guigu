import { createApp } from 'vue'
//引入全局样式
import '@/styles/index.scss'
// import './style.css'
import App from '@/App.vue'
// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// if you just want to import css
import 'element-plus/theme-chalk/dark/css-vars.css'

// 注册Element Plus
//注册全局组件SVG
import 'virtual:svg-icons-register'
//自定义插件
import globalComponent from '@/components/index'
//引入路由
import router from '@/router'

//引入pinia
import pinia from '@/store'

import './permisstion'

//引入自定义指令
import { isHasButton } from '@/directive/has'

const app = createApp(App)

isHasButton(app)

app.use(ElementPlus).use(globalComponent).use(router).use(pinia).mount('#app')
