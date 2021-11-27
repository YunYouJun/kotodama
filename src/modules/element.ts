import ElementPlus from 'element-plus'
import { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(ElementPlus)
}
