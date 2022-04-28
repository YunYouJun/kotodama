import md5 from 'md5'

const avatarCDN = 'https://sdn.geekzu.org/avatar/'

/**
 * 根据邮件地址获取头像
 * @param email
 * @returns
 */
export function getAvatarUrl(email: string, size = 40) {
  return `${avatarCDN}${email.includes('@') ? md5(email) : email}?s=${size}&r=G&d=`
}
