<script setup lang="ts">
import { token } from '~/stores/user'

const { t } = useI18n()
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

    <div class="m-5" text="sm">
      （适配
      <a class="text-blue-500" href="https://github.com/walinejs/waline" target="_blank">Waline</a> 后台评论接口）开发中……（又不是不能用）
    </div>

    <blockquote m="2">
      More info see
      <a
        class="text-blue-500"
        href="https://github.com/walinejs/waline/issues/552"
        target="_blank"
      >Waline #552.</a>
    </blockquote>

    <router-link v-if="token" class="btn m-1" to="/dashboard">
      {{ t('dashboard.title') }}
    </router-link>

    <router-link v-else class="btn m-1" to="/login">
      {{ t('button.login') }}
    </router-link>
  </div>
</template>
