<script lang="ts" setup>
import WalineClient from '../components/WalineClient.vue'
import { useWaline } from '~/composables/waline'
import { useAppStore } from '~/stores/app'

const app = useAppStore()

const route = useRoute()
const pageUrl = computed(() => route.query.url?.toString() || '/')

useWaline({
  serverURL: app.serverURL,
  path: pageUrl.value,
})
</script>

<template>
  <div
    class="comments-container rounded hover:shadow-md transition duration-400 max-w-800px"
    p="1"
    m="auto"
  >
    <CommentTable />
  </div>

  <WalineClient m="t-4 auto" />
</template>

<style>
.comments-container {
  background-color: var(--el-bg-color-overlay);
}
</style>
