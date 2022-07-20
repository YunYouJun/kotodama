declare interface Window {
  // extend the window
  Waline: any
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module '@waline/client/dist/component' {
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}
