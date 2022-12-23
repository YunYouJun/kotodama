import { ElMessage } from 'element-plus'
import type { Ref } from 'vue'
import type { LoginParams } from '~/api/auth'
import { login } from '~/api/auth'
import { $axios } from '~/composables/axios'
import { useUserStore } from '~/stores/user'

export interface LoginForm extends LoginParams {
  serverURL: string
  /**
   * recaptcha v3 key
   */
  recaptchaV3Key?: ''
}

export function useLogin(loginFormEl: Ref<HTMLFormElement>, loginForm: LoginForm) {
  const { t } = useI18n()

  const router = useRouter()
  const uStore = useUserStore()

  const loading = ref(false)
  const remember = ref(true)

  /**
   * 处理登录逻辑
   */
  function handleLogin() {
    loginFormEl.value.validate(async (valid: boolean) => {
      if (valid) {
        uStore.serverURL = loginForm.serverURL
        $axios.defaults.baseURL = loginForm.serverURL

        loading.value = true

        try {
          const res = await login({
            email: loginForm.email,
            password: loginForm.password,
            recaptchaV3: loginForm.recaptchaV3,
          }, remember.value)
          if (res && res.data && res.data.token) {
            uStore.url = res.data.url

            if (remember.value) {
              uStore.token = res.data.token
              uStore.email = loginForm.email
            }

            router.push('/dashboard')
            ElMessage.success({
              message: t('message.login_success'),
              showClose: true,
            })
          }
          else {
            ElMessage.error({
              message: `${res.errno ? `${res.errno}: ` : ''}${res.errmsg || '未知错误'}`,
              showClose: true,
            })
          }
        }
        catch {
          uStore.token = ''
        }

        loading.value = false
      }
    })
  }

  return {
    loading,

    handleLogin,
  }
}
