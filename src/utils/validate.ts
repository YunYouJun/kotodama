import type { Ref } from 'vue'
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

export function useCheckPass<T extends {
  password: string
  checkPass: string
}>(pwdFormRef: Ref<any>, pwdForm: T) {
  const { t } = useI18n()

  const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error(t('message.input_new_password')))
    }
    else if (value.length < 6) {
      callback(new Error(t('error.password')))
    }
    else {
      if (pwdForm.checkPass !== '')
        pwdFormRef.value.validateField('checkPass')

      callback()
    }
  }

  const validatePass2 = (rule: any, value: string, callback: any) => {
    if (value === '')
      callback(new Error(t('message.input_password_again')))
    else if (value.length < 6)
      callback(new Error(t('error.password')))
    else if (value !== pwdForm.password)
      callback(new Error(t('message.password_not_same')))
    else
      callback()
  }

  return {
    validatePass,
    validatePass2,
  }
}
