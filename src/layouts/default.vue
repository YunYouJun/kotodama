<script setup lang="ts">
import { isDark } from '~/composables'
</script>

<template>
  <main
    class="text-center text-gray-700 dark:text-gray-200"
    bg="cover center no-repeat fixed gradient-to-tl"
    :class="isDark ? [''] : ['from-blue-50', 'to-gray-200']"
  >
    <BaseHeader />
    <router-view />
    <BaseFooter />
  </main>
</template>
