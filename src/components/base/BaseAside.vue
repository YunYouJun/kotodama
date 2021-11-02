<template>
  <el-menu router :collapse="app.isCollapse">
    <el-menu-item v-for="item in menuList" :key="item.index" :index="item.index">
      <component :is="item.icon" class="menu-item-icon -mt-1 mr-4" />
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import IconUser2Line from '~icons/ri/user-2-line'
import IconInformationOutline from '~icons/mdi/information-outline'
import { useAppStore } from '~/stores/app'

const app = useAppStore()

const menuList = [
  {
    icon: IconUser2Line,
    index: '/user',
    title: '个人信息',
  },
  {
    icon: IconInformationOutline,
    index: '/about',
    title: '关于',
  },
]
</script>

<style>
.menu-item-icon {
  font-size: 1.2rem;
}
</style>
