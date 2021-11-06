# kotodama 言灵

[![GitHub Pages](https://github.com/YunYouJun/kotodama/actions/workflows/gh-pages.yml/badge.svg?branch=main)](https://github.com/YunYouJun/kotodama/actions/workflows/gh-pages.yml)

> 💬 掌控言灵的魔法，一个优雅的纯静态评论管理后台（开发中...）

[Demo 预览](https://kotodama.yunyoujun.cn)

kotodama 是一个纯静态的站点，您可以使用 fork 其自行部署，也可以直接使用已部署的 `kotodama.yunyoujun.cn` 站点。

> `kotodama.yunyoujun.cn` 纯静态托管于 GitHub Pages，代码将始终保持开源，不会也无法获取您的用户名密码，请放心使用。

## Features

- 目前只适配 Waline
- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [element-plus](https://github.com/element-plus/element-plus) - ([vitesse](https://github.com/antfu/vitesse/))born for future

## Waline

- 适配 [Waline](https://github.com/walinejs/waline) 后台管理（开发中...）
  - 已实现基础的登录、评论预览、删除功能
  - Todo: 编辑评论、细节优化、注册、GitHub 登录

## FAQ

### 403 Authorization 错误

如果您无法正常连接您的 Waline 后台 API，您可能需要配置一下安全域名。
将 `kotodama.yunyoujun.cn` 添加至您的安全域名中。

> [secureDomains](https://waline.js.org/reference/server.html#securedomains)
