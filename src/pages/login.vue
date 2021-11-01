<template>
  <main class="max-w-300px m-auto">
    <div class="login-container">
      <el-form
        ref="loginFormEl"
        :model="loginForm"
        :rules="loginRules"
        status-icon
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h2 text="2xl" p="10">{{ t('login.title') }}</h2>
        </div>

        <el-form-item prop="username">
          <el-input
            ref="usernameEl"
            v-model="loginForm.username"
            :placeholder="t('placeholder.username')"
            name="username"
            type="text"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="passwordEl"
            v-model="loginForm.password"
            :placeholder="t('placeholder.password')"
            name="password"
            type="password"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="checked">{{ t("login.message") }}</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="block w-full"
            @click="handleLogin"
          >{{ t('button.login') }}</el-button>
        </el-form-item>
      </el-form>

      <div class="flex justify-between">
        <router-link to="/register">
          <el-button>{{ t('button.register') }}</el-button>
        </router-link>
        <el-button class="flex" circle>
          <i-ri-github-line />
        </el-button>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { validUsername } from '~/utils/validate'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()

const loginForm = reactive({
  username: 'admin',
  password: '111111'
})

const loginFormEl = ref()
const usernameEl = ref()
const passwordEl = ref()
const checked = ref(false)

const validateUsername = (rule: any, value: string, callback: Function) => {
  if (!validUsername(value)) {
    callback(new Error(t('error.username')))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: string, callback: Function) => {
  if (value.length < 6) {
    callback(new Error(t('error.password')))
  } else {
    callback()
  }
}

const loginRules = {
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}

onMounted(() => {
  if (loginForm.username === '') {
    usernameEl.value.focus()
  } else if (loginForm.password === '') {
    passwordEl.value.focus()
  }
})

/**
 * 处理登录逻辑
 */
function handleLogin() {
  loginFormEl.value.validate((valid: boolean) => {
    if (valid) {
      router.push('/dashboard')
    }
  })
}
</script>
