import type { WalineResponse } from './waline'
import { $axios } from '~/composables/axios'
import { useUserStore } from '~/stores/user'
import type { UserInfo } from '~/api/user'

export interface LoginParams {
  email: string
  password: string
  /**
   * 2FA TODO
   */
  code?: string
  /**
   * recaptcha v3 verify response
   */
  recaptchaV3?: string
}

export interface TokenData {
  createdAt: string
  updatedAt: string
  display_name: string
  email: string
  github: string
  mailMd5: string
  token: string
  type: 'administrator'
  url: string
}

/**
 * set bearer token authorization for axios
 * @param token
 */
export async function setAuthorization(token: string) {
  if (token)
    ($axios.defaults.headers as any).Authorization = `Bearer ${token}`
  else
    delete ($axios.defaults.headers as any).Authorization
}

/**
 * 登录
 * @param payload
 * @returns
 */
export async function login(payload: LoginParams, remember = true) {
  const res = await $axios.post<LoginParams, WalineResponse<TokenData>>('/token', payload)
  if (res && res.data && res.data.token) {
    const resToken = res.data.token
    setAuthorization(resToken)

    if (window.opener) {
      window.opener.postMessage(
        { type: 'userInfo', data: { remember, ...res } },
        '*',
      )
    }
  }
  else {
    setAuthorization('')
  }
  return res
}

/**
 * 退出
 */
export function logout() {
  const uStore = useUserStore()
  uStore.token = ''
  setAuthorization('')
}

export type RegisterParams = Omit<UserInfo, 'github' | 'type'> & { password: string }

/**
 * 注册
 */
export async function register(payload: RegisterParams) {
  const res = await $axios.post<RegisterParams, WalineResponse<TokenData>>('/user', payload)
  return res
}
