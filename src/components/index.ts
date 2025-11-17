import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'

// console.log(SvgIcon, Pagination)
const allGlobalComponents = { SvgIcon, Pagination }

// console.log(allGlobalComponents)

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
  },
}
