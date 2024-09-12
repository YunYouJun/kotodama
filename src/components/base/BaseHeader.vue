<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { logout } from '~/api/auth'
import { isDark, toggleDark } from '~/composables'
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

import { useUserStore } from '~/stores/user'

const uStore = useUserStore()
const router = useRouter()

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}

function exit() {
  logout()
  router.push('/login')
}
</script>

<template>
  <nav class="text-xl" py-5>
    <router-link v-if="uStore.token" class="mx-2 icon-btn" active-class="text-blue-500" to="/dashboard">
      <div i-ri-dashboard-line />
    </router-link>
    <router-link
      v-else
      active-class="text-blue-500"
      class="mx-2 icon-btn"
      to="/"
      :title="t('button.home')"
    >
      <div i-ri-home-2-line />
    </router-link>

    <button
      class="mx-2 icon-btn !outline-none"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <div v-if="isDark" i-ri-moon-line />
      <div v-else i-ri-sun-line />
    </button>

    <button
      class="mx-2 icon-btn"
      :title="t('button.toggle_langs')"
      :class="locale === 'en' ? '' : '-rotate-y-180'"
      @click="toggleLocales()"
    >
      <div i-ri-translate />
    </button>

    <router-link
      class="mx-2 icon-btn"
      active-class="text-blue-500"
      to="/about"
      :title="t('button.about')"
    >
      <div i-ri-file-info-line />
    </router-link>

    <a
      class="mx-2 icon-btn"
      rel="noreferrer"
      href="https://github.com/YunYouJun/kotodama"
      target="_blank"
      title="GitHub"
    >
      <div i-ri-github-line />
    </a>

    <router-link v-if="uStore.token" class="mx-2 icon-btn" to="/user">
      <div i-ri-user-line />
    </router-link>

    <router-link v-if="!uStore.token" class="mx-2 icon-btn" to="/login" :title="t('button.login')">
      <div i-mdi-login />
    </router-link>

    <a v-else class="mx-2 icon-btn" :title="t('button.exit')" @click="exit">
      <div i-mdi-exit-to-app />
    </a>
  </nav>
</template>
