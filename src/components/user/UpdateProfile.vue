<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { UserInfo } from '~/api/user'
import { getUserInfo, updateUser } from '~/api/user'
import { getAvatarUrl } from '~/utils'

const { t } = useI18n()

const loading = ref(true)

const userInfo = ref<UserInfo>({
  email: '',
  github: '',
  type: 'administrator',
  url: '',
  display_name: '',
})

onBeforeMount(async () => {
  const { data } = await getUserInfo()
  userInfo.value = data
  // console.log(userInfo.value)

  loading.value = false
})

const update = () => {
  updateUser({
    display_name: userInfo.value.display_name,
    url: userInfo.value.url,
    github: userInfo.value.github,
  }).then((res) => {
    if (res.errno === 0) {
      ElMessage.success({
        message: t('message.update_success'),
        showClose: true,
      })
    }
  })
}
</script>

<template>
  <div m="4">
    <img
      m="auto"
      p="1"
      class="rounded-full shadow-lg w-25 h-25"
      :src="getAvatarUrl(userInfo.email, 100)"
    >
  </div>

  <el-form v-loading="loading" :model="userInfo">
    <el-form-item>
      <el-input
        v-model="userInfo.email"
        placeholder="E-Mail"
        disabled
        style="--el-disabled-color-base: #666"
      >
        <template #prefix>
          <a
            class="el-input__icon"
            :class="userInfo.email && 'text-gray'"
            :href="`mailto:${userInfo.email}`"
            target="_blank"
            title="GitHub"
          >
            <el-icon>
              <div i-ri-mail-line />
            </el-icon>
          </a>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-input v-model="userInfo.display_name" :placeholder="t('user.name')">
        <template #prefix>
          <el-icon class="el-input__icon" :class="userInfo.display_name && 'text-gray'">
            <div i-ri-user-line />
          </el-icon>
        </template>
        <template #suffix>
          <span v-if="userInfo.type === 'administrator'" text="blue-500" class="mx-1">管理员</span>
          <span v-else-if="userInfo.type === 'guest'" text="green-600" class="mx-1">宾客</span>
          <span v-else>{{ userInfo.type }}</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="userInfo.github" :placeholder="t('user.github')">
        <template #prefix>
          <a
            class="el-input__icon"
            :class="userInfo.github && 'text-gray'"
            :href="`https://github.com/${userInfo.github}`"
            target="_blank"
            title="GitHub"
          >
            <el-icon>
              <div i-ri-github-line />
            </el-icon>
          </a>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-input v-model="userInfo.url" :placeholder="t('user.url')">
        <template #prefix>
          <a
            class="el-input__icon"
            :class="userInfo.url && 'text-gray'"
            :href="userInfo.url || '#'"
            :target="userInfo.url && '_blank'"
            :title="t('user.url')"
          >
            <el-icon>
              <div i-ri-link />
            </el-icon>
          </a>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="w-full" @click="update">
        {{ t('user.update_profile') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
