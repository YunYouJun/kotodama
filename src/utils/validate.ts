import { config } from '~/config'

/**
 * 验证用户名（伪）
 * @param name
 */
export function validUsername(name: string) {
  if (config.enableValid)
    return config.validUsernames.includes(name.trim())
  else
    return true
}
