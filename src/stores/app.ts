import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isCollapse = ref(false)

  /**
   * 切换侧边栏展开
   * @param value
   */
  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return {
    isCollapse,
    toggleCollapse,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
