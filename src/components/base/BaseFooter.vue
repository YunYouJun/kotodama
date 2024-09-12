<script lang="ts" setup>
import pkg from '~/../package.json'
</script>

<template>
  <div class="mx-auto mt-6 text-center text-sm opacity-70">
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
