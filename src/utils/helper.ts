import md5 from 'md5'

/**
 * 根据邮件地址获取头像
 * @param email 
 * @returns 
 */
export function getAvatarUrl(email: string, size = 40) {
  return `https://sdn.geekzu.org/avatar/${md5(email)}?s=${size}&r=G&d=`;
}
