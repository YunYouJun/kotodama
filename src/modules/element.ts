// import ElementPlus from 'element-plus'
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElLoading,
  ElMenu,
  ElMenuItem,
  ElPagination,
  ElPopconfirm,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElTooltip,
} from 'element-plus'
import type { UserModule } from '~/types'

const components = [ElButton, ElForm, ElFormItem, ElIcon, ElInput, ElMenu, ElMenuItem, ElTabPane, ElTable, ElTableColumn, ElTabs, ElTooltip, ElPagination, ElPopconfirm, ElLoading, ElCheckbox]

export const install: UserModule = ({ app }) => {
  components.forEach(component => app.use(component))
  // app.use(ElementPlus)
}
