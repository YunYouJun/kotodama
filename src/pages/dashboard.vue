<script setup lang="ts">
const route = useRoute()
const pageUrl = computed(() => route.query.url?.toString() || '/')
</script>

<template>
  <div
    class="el-bg-overlay max-w-800px rounded hover:shadow-md"
    p="x-4 y-2"
    m="auto"
  >
    <CommentTable />
  </div>

  <WalineClient m="t-4 auto" :path="pageUrl" />
</template>
