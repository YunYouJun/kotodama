<script lang="ts" setup>
// @ts-expect-error vue waline component type
import { Waline } from '@waline/client/dist/component'
import { useAppStore } from '~/stores/app'
import { useUserStore } from '~/stores/user'

import { isDark } from '~/composables'
import '@waline/client/dist/waline.css'

defineProps<{ path: string }>()

const { locale } = useI18n()

const uStore = useUserStore()
const app = useAppStore()
const route = useRoute()
const curPath = computed(() => route.query.url?.toString() || '')

const cdnPrefix = 'https://unpkg.com/'
const emoji = [
  `${cdnPrefix}@waline/emojis/bilibili`,
  `${cdnPrefix}@waline/emojis/qq`,
  `${cdnPrefix}@waline/emojis/weibo`,
]

// 文章标题
const title = ref('')

watch(() => curPath.value, async (val) => {
  // 获取链接页面信息，转换为卡片，后续考虑可以封装为一个单独的 NPM 包
  const data = await fetch(uStore.url + val).then(res => res.text())
  const domParser = new DOMParser()
  const doc = domParser.parseFromString(data, 'text/html')

  title.value = doc.title
})
</script>

<template>
  <div id="waline-wrapper" class="el-bg-overlay shadow max-w-800px rounded" m="auto" p="4">
    <a
      class="inline-flex flex-col rounded shadow-md transition"
      hover="shadow-xl"
      m="auto t-1s b-3"
      p="2"
      :href="uStore.url + curPath"
      target="_blank"
    >
      <h2 m="1">{{ title }}</h2>
      <small class="flex justify-center items-center">
        <div i-ri-link class="mr-1" />
        {{ uStore.url + curPath }}
      </small>
    </a>
    <Waline :server-u-r-l="app.serverURL" :lang="locale" :path="path" :dark="isDark" :emoji="emoji" />
  </div>
</template>
