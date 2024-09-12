<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const app = useAppStore()

const menuList = [
  {
    icon: 'i-ri-user-2-line',
    index: '/user',
    title: '个人信息',
  },
  {
    icon: 'i-ri-information-line',
    index: '/about',
    title: '关于',
  },
]
</script>

<template>
  <el-menu router :collapse="app.isCollapse">
    <el-menu-item v-for="item in menuList" :key="item.index" :index="item.index">
      <div :class="item.icon" class="menu-item-icon mr-4 -mt-1" />
      <template #title>
        {{ item.title }}
      </template>
    </el-menu-item>
  </el-menu>
</template>

<style>
.menu-item-icon {
  font-size: 1.2rem;
}
</style>
