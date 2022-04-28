import { acceptHMRUpdate, defineStore } from 'pinia'

const namespace = 'waline'

export const useAppStore = defineStore('app', () => {
  const waline = ref()

  const isCollapse = ref(false)
  /**
   * waline server url
   */
  const serverUrl = useStorage(`${namespace}-serverUrl`, '')

  /**
   * 切换侧边栏展开
   * @param value
   */
  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return {
    waline,

    isCollapse,
    serverUrl,

    toggleCollapse,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
