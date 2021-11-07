import { acceptHMRUpdate, defineStore } from 'pinia'

const namespace = 'kotodama'
export const token = useStorage(`${namespace}-token`, '')
export const url = useStorage(`${namespace}-url`, '')

export const useUserStore = defineStore('user', () => {
  return {
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
