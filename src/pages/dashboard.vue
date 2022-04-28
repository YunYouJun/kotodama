<script lang="ts" setup>
import WalineClient from '../components/WalineClient.vue'
import { useWaline } from '~/composables/waline'
import { useAppStore } from '~/stores/app'

const app = useAppStore()

const route = useRoute()
const pageUrl = computed(() => route.query.url?.toString() || '/')

useWaline({
  serverURL: app.serverUrl,
  path: pageUrl.value,
})
</script>

<template>
  <div
    class="bg-white rounded hover:shadow-md transition duration-400 max-w-800px"
    p="1"
    m="auto"
    dark="bg-transparent"
  >
    <CommentTable />
  </div>

  <WalineClient m="t-4 auto" />
</template>
