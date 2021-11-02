<template>
  <main class="p-4 text-center text-gray-700 dark:text-gray-200">
    <el-container>
      <el-header>
        <BaseHeader />
      </el-header>
      <el-container>
        <!-- <el-aside width="200px">
          <BaseAside />
        </el-aside>-->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <BaseFooter />
    </el-container>
  </main>
</template>
