<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main class="p-4 text-center text-teal-700 dark:text-gray-200">
    <div>
      <h2 class="text-4xl">
        <div i-carbon-warning class="inline-block" />
      </h2>
    </div>
    <router-view />
    <div>
      <button class="m-3 mt-8 text-sm btn" @click="router.back()">
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>
