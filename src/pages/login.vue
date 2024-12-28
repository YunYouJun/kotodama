<script lang="ts" setup>
import type { LoginForm } from '~/composables/login'
import { useI18n } from 'vue-i18n'
import { VueRecaptcha } from 'vue-recaptcha'
import { useLogin } from '~/composables/login'
import { config } from '~/config'
import { useUserStore } from '~/stores/user'
import { getNsName } from '~/utils'

import { validUsername } from '~/utils/validate'

const { t } = useI18n()

const uStore = useUserStore()

const loginForm = useStorage<LoginForm>('kotodama:login-form', {
  serverURL: uStore.serverURL,
  code: '',
  email: uStore.email,
  password: '',
  recaptchaV3: '',
  recaptchaV3Key: '',
})

const loginFormEl = ref()
const emailEl = ref()
const passwordEl = ref()

const serverURLEl = ref()

const { handleLogin, loading } = useLogin(loginFormEl, loginForm)

function validateUsername(_rule: any, value: string, callback: (error?: Error) => void) {
  if (!validUsername(value))
    callback(new Error(t('error.username')))
  else
    callback()
}

function validatePassword(_rule: any, value: string, callback: (error?: Error) => void) {
  if (value.length < 6)
    callback(new Error(t('error.password')))
  else
    callback()
}

const loginRules = {
  email: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
}

onMounted(() => {
  if (loginForm.value.email === '')
    emailEl.value.focus()
  else if (loginForm.value.password === '')
    passwordEl.value.focus()
})

/**
 * google recaptcha res
 * @param res
 */
function onVerify(res: string) {
  if (!res)
    return
  loginForm.value.recaptchaV3 = res
  handleLogin()
}

const enableRecaptcha = useStorage(getNsName('enableRecaptcha'), config.enableRecaptcha)
</script>

<template>
  <main class="m-auto max-w-xs">
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
          <h2 text="2xl" p="10">
            {{ t('login.title') }}
          </h2>
        </div>

        <el-form-item prop="serverURL" required>
          <el-input
            ref="serverURLEl"
            v-model="loginForm.serverURL"
            :placeholder="t('placeholder.server_url')"
            name="serverURL"
            type="text"
            autocomplete
          />
        </el-form-item>

        <el-form-item prop="email" required>
          <el-input
            ref="emailEl"
            v-model="loginForm.email"
            :placeholder="t('placeholder.email')"
            name="email"
            type="text"
            autocomplete
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="passwordEl"
            v-model="loginForm.password"
            :placeholder="t('placeholder.password')"
            name="password"
            type="password"
            autocomplete
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="enableRecaptcha">
            {{ t("login.use_recaptcha") }}
          </el-checkbox>
        </el-form-item>

        <el-form-item v-if="enableRecaptcha" prop="serverURL" required>
          <el-input
            ref="serverURLEl"
            v-model="loginForm.recaptchaV3Key"
            :placeholder="t('placeholder.recaptcha_v3_key')"
            name="serverURL"
            type="text"
            autocomplete="on"
          />
        </el-form-item>

        <!-- <el-form-item>
          <el-checkbox v-model="remember">{{ t("login.message") }}</el-checkbox>
        </el-form-item> -->

        <el-form-item>
          <VueRecaptcha
            v-if="enableRecaptcha" class="w-full"
            size="invisible"
            :sitekey="config.recaptchaV3Key"
            @verify="onVerify"
          >
            <el-button
              type="primary"
              class="block w-full"
              :loading="loading"
            >
              {{ t('button.login') }}
            </el-button>
          </VueRecaptcha>

          <el-button
            v-else
            type="primary"
            class="block w-full"
            :loading="loading"
            @click="handleLogin"
          >
            {{ t('button.login') }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="flex justify-between">
        <router-link to="/register">
          <el-button>{{ t('button.register') }}</el-button>
        </router-link>
        <WithGithub />
      </div>
    </div>
  </main>
</template>
