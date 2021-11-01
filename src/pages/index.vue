<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <p class="text-4xl">
      <i-carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/YunYouJun/kotodama" target="_blank">Kotodama</a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button class="m-3 text-sm btn" :disabled="!name" @click="go">{{ t('button.go') }}</button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
