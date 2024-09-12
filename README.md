# kotodama 言灵

[![GitHub Pages](https://github.com/YunYouJun/kotodama/actions/workflows/gh-pages.yml/badge.svg?branch=main)](https://github.com/YunYouJun/kotodama/actions/workflows/gh-pages.yml)

> 💬 掌控言灵的魔法，一个优雅的纯静态评论管理后台

- Demo 预览: <https://kotodama.yunyoujun.cn>
- 备用1：<https://kotodama.elpsy.cn>
- 备用2：<https://kotodama.vercel.app>（国内已被污染）

kotodama 是一个纯静态的站点，您可以 fork 其自行部署，也可以直接使用已部署的 `kotodama.yunyoujun.cn` | `kotodama.elpsy.cn` 站点。

> `kotodama.yunyoujun.cn` 纯静态托管于 GitHub Pages，代码将始终保持开源，不会也无法获取您的用户名密码，请放心使用。

## Features

- 💬 目前只适配 [Waline](https://github.com/walinejs/waline)（~~未来可能适配更多评论系统，假的~~）
- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite), [pnpm](https://pnpm.js.org/), [element-plus](https://github.com/element-plus/element-plus) - ([vitesse](https://github.com/antfu/vitesse/)) born for future

## Waline

- 适配 [Waline](https://github.com/walinejs/waline) 后台管理
  - 已实现基础的登录、评论预览、翻页、删除功能
  - Todo: 编辑评论、细节优化、GitHub 登录、批量删除、审核

> More info see [#552 | Waline](https://github.com/walinejs/waline/issues/552)

## 自行部署

> 推荐直接使用 [kotodama.yunyoujun.cn](https://kotodama.yunyoujun.cn) 或 [kotodama.elpsy.cn](https://kotodama.elpsy.cn)。如果您不放心，也可以自行部署，但可能需要自己记得更新。

```bash
# fork 或直接 clone 本项目
git clone https://github.com/YunYouJun/kotodama

cp .env.example .env
```

配置 `.env` 中的 `VITE_API_BASE_URL` 环境变量为您的 Waline 后台地址，例如 `https://waline.xxx.xxx`。

### 自行构建

```bash
# 安装依赖
npm install

# 构建产物
npm run build
```

将 `dist` 下的静态文件托管于您的服务器。

### GitHub Actions

Fork 本项目。

进入 `Settings/Pages` Source 设置 Branch 为 `gh-pages`，以启用 GitHub Pages。

进入 `Actions`，触发 GitHub Page Workflow run。

> `.github/workflows/gh-pages.yml` 文件将会自动触发构建，并将构建产物推送至 `gh-pages` 分支。

如果您需要自定义域名，请修改项目中 `public/CNAME` 文件内容为您自己的域名。

## FAQ

### Waline 403 Authorization 错误

如果您无法正常连接您的 Waline 后台 API，您可能需要配置一下安全域名。
将 `kotodama.yunyoujun.cn` 添加至您的安全域名中。

> [secureDomains | Waline](https://waline.js.org/reference/server.html#securedomains)

More info see [README.md](https://github.com/YunYouJun/kotodama/blob/main/README.md).

## [Sponsors](https://sponsors.yunyoujun.cn)

<p align="center">
  <a href="https://sponsors.yunyoujun.cn">
    <img src='https://fastly.jsdelivr.net/gh/YunYouJun/sponsors/public/sponsors.svg'/>
  </a>
</p>
