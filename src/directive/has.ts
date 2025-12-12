import pinia from '@/store'

import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore(pinia)
export function isHasButton(app: any) {
  app.directive('has', {
    mounted(el: any, options: any) {
      //   console.log(options)
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
