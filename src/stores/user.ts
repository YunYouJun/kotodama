import { acceptHMRUpdate, defineStore } from 'pinia'
import { getNsName } from '~/utils'

export const useUserStore = defineStore('user', () => {
  /**
   * waline server url
   */
  const serverURL = useStorage(getNsName('serverURL'), '')
  const token = useStorage(getNsName('token'), '')
  const url = useStorage(getNsName('url'), '')
  const email = useStorage(getNsName('email'), '')

  const recaptchaV3Key = useStorage(getNsName('recaptchaV3Key'), '')

  return {
    token,

    serverURL,
    /**
     * user website url
     */
    url,

    email,
    recaptchaV3Key,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
