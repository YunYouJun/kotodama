// import ElementPlus from 'element-plus'
import {
  ElButton, ElForm, ElFormItem, ElIcon, ElInput, ElLoading, ElMenu, ElMenuItem, ElPagination, ElPopconfirm, ElTabPane, ElTable, ElTableColumn, ElTabs, ElTooltip
} from 'element-plus'
import type { UserModule } from '~/types'

const components = [ElButton, ElForm, ElFormItem, ElIcon, ElInput, ElMenu, ElMenuItem, ElTabPane, ElTable, ElTableColumn, ElTabs, ElTooltip, ElPagination, ElPopconfirm, ElLoading]

export const install: UserModule = ({ app }) => {
  components.forEach(component => app.use(component))
  // app.use(ElementPlus)
}
