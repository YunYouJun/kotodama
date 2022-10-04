<script lang="ts" setup>
import pkg from '~/../package.json'
</script>

<template>
  <div class="mt-6 mx-auto text-center opacity-70 text-sm">
    <div>
      <a :href="pkg.repository.url" target="_blank">Kotodama</a>
      <a class="mx-2" href="https://sponsors.yunyoujun.cn" target="_blank">☁️</a>
      <a href="https://github.com/YunYouJun" target="_blank">@YunYouJun</a>
    </div>
    <div m="y-2">
      v{{ pkg.version }}
    </div>
  </div>
</template>
