<script lang="ts" setup>
import { getUserInfo, UserInfo } from '~/api/user';
import { getAvatarUrl } from '~/utils';

const { t } = useI18n()

const userInfo = ref<UserInfo>({
  email: '',
  github: '',
  type: 'administrator',
  url: '',
  display_name: ''
})

onBeforeMount(async () => {
  const { data } = await getUserInfo()
  userInfo.value = data
  // console.log(userInfo.value)
})
</script>

<template>
  <div class="shadow bg-white p-5 max-w-100 m-auto">
    <h2 m="2">用户信息</h2>

    <div m="4">
      <img
        m="auto"
        p="1"
        class="rounded-full shadow-lg w-25 h-25"
        :src="getAvatarUrl(userInfo.email, 100)"
      />
    </div>

    <el-form :model="userInfo">
      <el-form-item>
        <el-input v-model="userInfo.email" placeholder="E-Mail">
          <template #prefix>
            <a
              class="el-input__icon"
              :class="userInfo.email && 'text-black'"
              :href="'mailto:' + userInfo.email"
              target="_blank"
              title="GitHub"
            >
              <el-icon>
                <i-ri-mail-line />
              </el-icon>
            </a>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="userInfo.display_name" :placeholder="t('user.name')">
          <template #prefix>
            <el-icon class="el-input__icon" :class="userInfo.display_name && 'text-black'">
              <i-ri-user-line />
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
        <el-input v-model="userInfo.github" placeholder="GitHub Username">
          <template #prefix>
            <a
              class="el-input__icon"
              :class="userInfo.github && 'text-black'"
              :href="'https://github.com/' + userInfo.github"
              target="_blank"
              title="GitHub"
            >
              <el-icon>
                <i-ri-github-line />
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
              :class="userInfo.url && 'text-black'"
              :href="userInfo.url || '#'"
              :target="userInfo.url && '_blank'"
              :title="t('user.url')"
            >
              <el-icon>
                <i-ri-link />
              </el-icon>
            </a>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="w-full" disabled>{{ t('user.update') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
