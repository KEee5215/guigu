//折叠菜单,重新计算布局的小仓库store
import { defineStore } from 'pinia'

export const useLayOutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      isCollapse: false,
      refresh: false,
      isDark: false,
    }
  },
})
