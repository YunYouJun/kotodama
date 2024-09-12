import md5 from 'md5'

export const avatarCDN = {
  geekzu: 'https://sdn.geekzu.org/avatar/',
  v2ex: 'https://cdn.v2ex.com/gravatar/',
  loli: 'https://gravatar.loli.net/avatar/',
  cravatar: 'https://cravatar.cn/avatar/',
}

/**
 * 根据邮件地址获取头像
 * @param email
 */
export function getAvatarUrl(email: string, size = 40, host: keyof (typeof avatarCDN) = 'cravatar') {
  return `${avatarCDN[host]}${email.includes('@') ? md5(email) : email}?s=${size}&r=G&d=`
}
