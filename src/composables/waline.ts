import { isClient, useScriptTag } from '@vueuse/core'
import { onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCommentStore } from '~/stores/comment'

const cdnPrefix = 'https://cdn.jsdelivr.net/'

export function useWaline(options: {} = {}) {
  const cStore = useCommentStore()

  useHead({
    link: [
      { rel: 'stylesheet', href: `${cdnPrefix}npm/@waline/client/dist/waline.css` },
    ],
  })

  const { locale } = useI18n()

  let waline: any

  // 直接使用 CDN
  useScriptTag(`${cdnPrefix}npm/@waline/client/dist/waline.js`, () => {
    if (!isClient)
      return

    const defaultOptions = {
      el: '#waline',
      lang: locale.value,
      dark: 'html.dark',
      emoji: [
        `${cdnPrefix}gh/walinejs/emojis@1.0.0/bilibili`,
        `${cdnPrefix}gh/walinejs/emojis@1.0.0/qq`,
        `${cdnPrefix}gh/walinejs/emojis@1.0.0/weibo`,
      ],
      path: cStore.curPath,
    }
    const walineOptions = Object.assign(defaultOptions, options)
    waline = window.Waline.init(walineOptions)
  })

  watch(() => cStore.curPath, (path) => {
    if (!waline)
      return
    waline.update({
      path,
    })
  })

  watch(locale, (lang) => {
    if (!waline)
      return
    waline.update({
      lang,
    })
  })

  onUnmounted(() => {
    if (!waline)
      return
    waline.destroy()
  })

  return waline
}
