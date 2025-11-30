import { defineStore } from 'pinia'
import type { categoryState } from './type/type'

export const useCategoryStore = defineStore('categoryStore', {
  state: (): categoryState => {
    return {
      data: {
        c1Id: null,
        c2Id: null,
        c3Id: null,
      },
    }
  },
  actions: {
    clearData() {
      this.data.c1Id = null
      this.data.c2Id = null
      this.data.c3Id = null
    },
  },
})
