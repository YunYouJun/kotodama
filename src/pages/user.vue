<script lang="ts" setup>
const { t } = useI18n()
const activeName = ref('profile')
</script>

<template>
  <div class="el-bg-overlay m-auto max-w-100 p-5 shadow">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="t('title.profile')" name="profile">
        <UpdateProfile />
      </el-tab-pane>
      <el-tab-pane :label="t('title.password')" name="password">
        <UpdatePassword />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
