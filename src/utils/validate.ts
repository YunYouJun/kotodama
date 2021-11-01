/**
 * 验证用户名（伪）
 * @param name 
 */
export function validUsername(name: string) {
  const validUsernames = ['YunYouJun', 'admin']
  return validUsernames.includes(name.trim())
}
