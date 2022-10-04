import { acceptHMRUpdate, defineStore } from 'pinia'

const namespace = 'kotodama'

export const useUserStore = defineStore('user', () => {
  const token = useStorage(`${namespace}-token`, '')
  const url = useStorage(`${namespace}-url`, '')

  return {
    token,
    /**
     * user website url
     */
    url,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
