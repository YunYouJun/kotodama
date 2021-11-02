<script setup lang="ts">
const { t } = useI18n()

const pages = [
  {
    name: '登录',
    path: '/login'
  }
]
</script>

<template>
  <div>
    <p class="text-6xl" m="t-10 b-5">
      <i-ri-discuss-line />
    </p>
    <p class="my-4">
      <a
        class="text-xl font-bold"
        href="https://github.com/YunYouJun/kotodama"
        target="_blank"
      >Kotodama</a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <h2 class="py-5" text="sm" font="bold">已完成页面</h2>

    <div v-for="page in pages">
      <router-link :to="page.path">
        <div class="btn">{{ page.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
