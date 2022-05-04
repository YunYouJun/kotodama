<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/stores/app'
import { url } from '~/stores/user'

import { useWaline } from '~/composables/waline'
import { useCommentStore } from '~/stores/comment'

const app = useAppStore()
const cStore = useCommentStore()
const { curPath } = storeToRefs(cStore)

app.waline = useWaline({
  serverURL: app.serverURL,
})

// 文章标题
const title = ref('')

watch(curPath, async (val) => {
  // 获取链接页面信息，转换为卡片，后续考虑可以封装为一个单独的 NPM 包
  const data = await fetch(url.value + val).then(res => res.text())
  const domParser = new DOMParser()
  const doc = domParser.parseFromString(data, 'text/html')

  title.value = doc.title
})
</script>

<template>
  <div id="waline-wrapper" class="waline-wrapper shadow max-w-800px rounded" m="auto" p="x-2 y-4">
    <a
      class="inline-flex flex-col rounded shadow-md transition"
      hover="shadow-xl"
      m="auto t-1s b-3"
      p="2"
      :href="url + curPath"
      target="_blank"
    >
      <h2 m="1">{{ title }}</h2>
      <small class="flex justify-center items-center">
        <div i-ri-link class="mr-1" />
        {{ url + curPath }}
      </small>
    </a>
    <div id="waline" />
  </div>
</template>

<style>
.waline-wrapper {
  background-color: var(--el-bg-color-overlay);
}
</style>
