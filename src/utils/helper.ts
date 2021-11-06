import md5 from 'md5'

/**
 * 根据邮件地址获取头像
 * @param email 
 * @returns 
 */
export function getAvatarUrl(email: string) {
  return `https://sdn.geekzu.org/avatar/${md5(email)}?s=40&r=G&d=`;
}
