// register vue composition api globally
import type { UserModule } from './types'
import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

// import '@unocss/reset/tailwind.css'

// your custom styles here
import 'star-markdown-css/src/scss/theme/yun.scss'
import 'element-plus/theme-chalk/src/dark/css-vars.scss'

import './styles/index.scss'
import './styles/waline.scss'
import './styles/main.css'

import 'uno.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    // history: createWebHashHistory(),
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
