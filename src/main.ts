// register vue composition api globally
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import { createWebHashHistory } from 'vue-router'
import App from './App.vue'
import type { UserModule } from './types'

// import '@unocss/reset/tailwind.css'

// your custom styles here
import 'star-markdown-css/src/scss/theme/yun.scss'
import 'element-plus/theme-chalk/src/dark/css-vars.scss'

import './styles/index.scss'
import './styles/waline.scss'
import './styles/main.css'

import 'uno.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { history: createWebHashHistory(), routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
