import { $axios } from "~/logic/axios";
import { WalineResponse } from "./waline";

export interface CommentUserInfo {
  user_id: string
  nick: string
  ip: string
  mail: string
  link: string
}

export interface UserInfo {
  email: string
  github: string
  type: 'administrator' | 'guest'
  url: string
  display_name: string
}

/**
 * 注册用户
 * @param user 
 */
export async function register(user: UserInfo) {
  $axios.post('/user', user)
}

/**
 * 获取用户信息
 */
export async function getUserInfo(): Promise<WalineResponse<UserInfo>> {
  return $axios.get('/token')
}
