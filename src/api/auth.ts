import { AxiosResponse } from 'axios'
import { $axios } from '~/logic/axios'
import { WalineResponse } from './waline'

export interface LoginParams { email: string, password: string }

export interface TokenData {
  createdAt: string,
  updatedAt: string,
  display_name: string,
  email: string,
  github: string,
  mailMd5: string,
  token: string,
  type: 'administrator',
  url: string
}

export async function setAuthorization(token: string) {
  $axios.defaults.headers['common']['Authorization'] = `Bearer ${token}`
}

/**
 * 登录
 * @param payload 
 * @returns 
 */
export async function login(payload: LoginParams) {
  const { data } = await $axios.post<LoginParams, AxiosResponse<WalineResponse<TokenData>>>('/token', payload)
  if (data && data.data && data.data.token) {
    setAuthorization(data.data.token)
  }
  return data
}


