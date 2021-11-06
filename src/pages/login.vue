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

        <el-form-item prop="serverUrl" required>
          <el-input
            ref="serverUrlEl"
            v-model="loginForm.serverUrl"
            :placeholder="t('placeholder.server_url')"
            name="serverUrl"
            type="text"
            autocomplete="on"
          />
        </el-form-item>

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
            :loading="loading"
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
import { login } from '~/api/auth'
import { ElMessage } from 'element-plus'
import { $axios, token } from '~/logic/axios'
import { url } from '~/stores/user'

const router = useRouter()
const { t } = useI18n()

const namespace = 'waline'
const serverUrl = useStorage(`${namespace}-serverUrl`, '')

const loading = ref(false)
const loginForm = reactive({
  serverUrl: serverUrl,
  username: '',
  password: ''
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
  loginFormEl.value.validate(async (valid: boolean) => {
    if (valid) {
      $axios.defaults.baseURL = loginForm.serverUrl

      loading.value = true

      try {
        await login({
          email: loginForm.username,
          password: loginForm.password
        }).then((res) => {
          console.debug(res.data)
          if (res && res.data && res.data.token) {
            // token
            token.value = res.data.token
            url.value = res.data.url

            router.push('/dashboard')
            ElMessage.success({
              message: '登录成功',
              showClose: true
            })
          } else {
            ElMessage.success({
              message: res.errmsg,
              showClose: true
            })
          }
        })
      } catch {

      }

      loading.value = false
    }
  })
}
</script>
