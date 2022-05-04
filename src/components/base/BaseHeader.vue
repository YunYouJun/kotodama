<script setup lang="ts">
import { logout } from '~/api/auth'
import { isDark, toggleDark } from '~/composables'
import { token } from '~/stores/user'

const { t, availableLocales, locale } = useI18n()

const router = useRouter()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const exit = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <nav class="text-xl my-5">
    <router-link v-if="token" class="icon-btn mx-2" active-class="text-blue-500" to="/dashboard">
      <div i-ri-dashboard-line />
    </router-link>
    <router-link
      v-else
      active-class="text-blue-500"
      class="icon-btn mx-2"
      to="/"
      :title="t('button.home')"
    >
      <div i-ri-home-2-line />
    </router-link>

    <button
      class="icon-btn mx-2 !outline-none"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <div i-ri-moon-line v-if="isDark" />
      <div i-ri-sun-line v-else />
    </button>

    <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales">
      <div i-ri-translate />
    </a>

    <router-link
      class="icon-btn mx-2"
      active-class="text-blue-500"
      to="/about"
      :title="t('button.about')"
    >
      <div i-ri-file-info-line />
    </router-link>

    <a
      class="icon-btn mx-2"
      rel="noreferrer"
      href="https://github.com/YunYouJun/kotodama"
      target="_blank"
      title="GitHub"
    >
      <div i-ri-github-line />
    </a>

    <router-link v-if="token" class="icon-btn mx-2" to="/user">
      <div i-ri-user-line />
    </router-link>

    <router-link v-if="!token" class="icon-btn mx-2" to="/login" :title="t('button.login')">
      <div i-mdi-login />
    </router-link>

    <a v-else class="icon-btn mx-2" :title="t('button.exit')" @click="exit">
      <div i-mdi-exit-to-app />
    </a>
  </nav>
</template>
