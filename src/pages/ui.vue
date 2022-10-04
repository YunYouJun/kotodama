<script lang="ts" setup>
import { useUserStore } from '~/stores/user'

const uStore = useUserStore()
const router = useRouter()

onBeforeMount(() => {
  if (uStore.token)
    router.push('/dashboard')
  else
    router.push('/login')
})
</script>

<template>
  <div />
</template>
