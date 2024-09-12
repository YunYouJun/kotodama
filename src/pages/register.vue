<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { register } from '~/api/auth'
import { $axios } from '~/composables/axios'
import { useUserStore } from '~/stores/user'
import { useCheckPass, validUsername } from '~/utils/validate'

const router = useRouter()
const { t } = useI18n()

const uStore = useUserStore()
const loading = ref(false)
const registerForm = reactive({
  serverURL: uStore.serverURL,
  display_name: '',
  email: '',
  password: '',
  checkPass: '',
  url: '',
})

const registerFormEl = ref()
const emailEl = ref()
const passwordEl = ref()

const serverURLEl = ref()
const displayNameEl = ref()
const urlEl = ref()

function validateUsername(_rule: any, value: string, callback: (error?: Error) => void) {
  if (!validUsername(value))
    callback(new Error(t('error.username')))
  else
    callback()
}

const { validatePass, validatePass2 } = useCheckPass(registerFormEl, registerForm)

const registerRules = {
  email: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePass }],
  checkPass: [{ required: true, trigger: 'blur', validator: validatePass2 }],
  url: [{ required: true, trigger: 'blur' }],
}

onMounted(() => {
  if (registerForm.email === '')
    emailEl.value.focus()
  else if (registerForm.password === '')
    passwordEl.value.focus()
})

/**
 * 处理注册逻辑
 */
function handleRegister() {
  registerFormEl.value.validate(async (valid: boolean) => {
    if (valid) {
      $axios.defaults.baseURL = registerForm.serverURL

      loading.value = true

      try {
        const { serverURL, checkPass, ...payload } = registerForm
        const res = await register(payload)
        // 1000 USER_EXIST
        if (res && res.errno !== 1000) {
          ElMessage.success({
            message: t('message.register_success'),
            showClose: true,
          })
          router.push('/login')
        }
      }
      catch {
        // token.value = ''
      }

      loading.value = false
    }
  })
}
</script>

<template>
  <main class="m-auto max-w-300px">
    <div class="register-container">
      <el-form
        ref="registerFormEl"
        :model="registerForm"
        :rules="registerRules"
        status-icon
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h2 text="2xl" p="10">
            {{ t('register.title') }}
          </h2>
        </div>

        <el-form-item prop="serverURL" required>
          <el-input
            ref="serverURLEl"
            v-model="registerForm.serverURL"
            :placeholder="t('placeholder.server_url')"
            name="serverURL"
            type="text"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="display_name">
          <el-input
            ref="displayNameEl"
            v-model="registerForm.display_name"
            :placeholder="t('placeholder.nickname')"
            name="display_name"
            type="text"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            ref="emailEl"
            v-model="registerForm.email"
            :placeholder="t('placeholder.email')"
            name="email"
            type="text"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="url">
          <el-input
            ref="urlEl"
            v-model="registerForm.url"
            :placeholder="t('user.url')"
            name="url"
            type="text"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="passwordEl"
            v-model="registerForm.password"
            :placeholder="t('placeholder.password')"
            name="password"
            type="password"
            autocomplete="on"
            show-password
          />
        </el-form-item>

        <el-form-item prop="checkPassword">
          <el-input
            ref="passwordEl"
            v-model="registerForm.password"
            :placeholder="t('message.input_password_again')"
            name="password"
            type="password"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="block w-full"
            :loading="loading"
            @click="handleRegister"
          >
            {{ t('button.register') }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="flex justify-between">
        <router-link to="/login">
          <el-button>{{ t('button.login') }}</el-button>
        </router-link>
        <WithGithub />
      </div>
    </div>
  </main>
</template>
