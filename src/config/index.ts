export const config = {
  /** 用户名邮箱前端校验（譬如，只允许自己的邮箱登录） */
  enableValid: false,
  validUsernames: ['YunYouJun', 'admin', 'me@yunyoujun.cn'],

  /**
   * Enable recaptcha
   */
  enableRecaptcha: false,
  /**
   * google recaptcha v3 client key
   * You should config server key for server.
   */
  recaptchaV3Key: import.meta.env.VITE_RECAPTCHA_V3_KEY || '',
}
