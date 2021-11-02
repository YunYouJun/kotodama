<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="text-xl my-3 flex flex-col items-center justify-center">
    <router-link class="icon-btn mx-2" to="/" :title="t('button.home')">
      <i-ri-home-2-line />
    </router-link>

    <router-link class="icon-btn mx-2" to="/dashboard">
      <i-ri-dashboard-line />
    </router-link>

    <button
      class="icon-btn mx-2 !outline-none"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <i-ri-moon-line v-if="isDark" />
      <i-ri-sun-line v-else />
    </button>

    <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales">
      <i-ri-translate />
    </a>

    <router-link class="icon-btn mx-2" to="/about" :title="t('button.about')">
      <i-ri-file-info-line />
    </router-link>

    <a
      class="icon-btn mx-2"
      rel="noreferrer"
      href="https://github.com/antfu/vitesse"
      target="_blank"
      title="GitHub"
    >
      <i-ri-github-line />
    </a>
  </nav>
</template>
