import type { WalineResponse } from './waline'
import { $axios } from '~/composables/axios'

export interface CommentUserInfo {
  user_id: string
  nick: string
  ip: string
  mail: string
  link: string
}

interface BaseUserInfo {
  display_name: string
  url: string
  github: string
}

export interface UserInfo extends BaseUserInfo {
  email: string
  type: 'administrator' | 'guest'
}

export interface UserProfile extends BaseUserInfo {
  password: string
}

/**
 * 注册用户
 * @param user
 */
export async function register(user: UserProfile): Promise<WalineResponse<null>> {
  return $axios.post('/user', user)
}

/**
 * 更新用户信息
 * @param user
 * @returns
 */
export async function updateUser(user: Partial<UserProfile>): Promise<WalineResponse<null>> {
  return $axios.put('/user', user)
}

/**
 * 获取用户信息
 */
export async function getUserInfo(): Promise<WalineResponse<UserInfo>> {
  return $axios.get('/token')
}
