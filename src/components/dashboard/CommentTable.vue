<template>
  <el-table
    v-loading="loading"
    :data="
      commentListData.filter(
        (data) =>
          !search || data.nick.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column type="selection" width="30" />
    <el-table-column width="150" :label="t('dashboard.author')" prop="nick" />
    <el-table-column width="170" :label="t('dashboard.createdAt')" prop="createdAt">
      <template #default="scope">
        <div>{{ dayjs(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </template>
    </el-table-column>
    <el-table-column width="170" :label="t('dashboard.updatedAt')" prop="updatedAt">
      <template #default="scope">
        <div>{{ dayjs(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="t('dashboard.content')" prop="comment">
      <template #default="scope">
        <div v-html="scope.row.comment"></div>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
      <template #default>
        <el-button size="mini">Edit</el-button>
        <el-button size="mini" type="danger">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
const { t } = useI18n()
import { CommentItem, getCommentList } from '~/api/comment';

const commentListData = ref<CommentItem[]>([])

const loading = ref(true)

onBeforeMount(async () => {
  const { data } = await getCommentList({
    page: 1,
    filter: {
      owner: 'all',
      status: 'approved',
      keyword: ''
    }
  })
  loading.value = false
  console.log(data)
  commentListData.value = data.data
})

const search = ref('')
</script>
