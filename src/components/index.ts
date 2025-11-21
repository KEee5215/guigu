import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// console.log(SvgIcon, Pagination)
const allGlobalComponents = { SvgIcon, Pagination }

// console.log(allGlobalComponents)
// console.log(ElementPlusIconsVue)

export default {
  install(app: any) {
    //务必要有此方法
    console.log('插件已安装')
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(
        key,
        allGlobalComponents[key as keyof typeof allGlobalComponents],
      )
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
