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
    class="el-bg-overlay rounded hover:shadow-md max-w-800px"
    p="1"
    m="auto"
  >
    <CommentTable />
  </div>

  <WalineClient m="t-4 auto" />
</template>
