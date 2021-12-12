<template>
  <div />
</template>

<script lang="ts" setup>import { token } from '~/stores/user'

const router = useRouter()
onBeforeMount(() => {
  if (token.value)
    router.push('/dashboard')
  else
    router.push('/login')
})
</script>
