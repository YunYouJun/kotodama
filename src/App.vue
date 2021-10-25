<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Kotodama 言灵',
  meta: [
    { name: 'description', content: '一个优雅的纯静态评论管理后台' },
  ],
})
</script>

<template>
  <router-view />
</template>
