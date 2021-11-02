<template>
  <el-table
    v-loading="loading"
    :data="
      commentListInfo?.data.filter(
        (data) =>
          !search || data.nick.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column type="selection" width="40" />
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
  <el-pagination
    class="mt-5"
    layout="prev, pager, next, jumper"
    :currentPage="currentPage"
    :page-size="commentListInfo?.pageSize"
    :page-count="commentListInfo?.totalPages"
    @update:current-page="toggleCurrentPage"
  ></el-pagination>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
const { t } = useI18n()
import { CommentList, CommentParams, getCommentList } from '~/api/comment';

const commentListInfo = ref<CommentList>()
const loading = ref(true)
const search = ref('')
const filter = reactive<CommentParams['filter']>({
  owner: 'all',
  status: 'approved',
  keyword: ''
})
const currentPage = ref(1)

const fetchCommentList = async () => {
  const { data } = await getCommentList({
    page: currentPage.value,
    filter
  })
  loading.value = false
  commentListInfo.value = data
}

onBeforeMount(async () => {
  fetchCommentList()
})

const toggleCurrentPage = async (page: number) => {
  currentPage.value = page
  loading.value = true
  await fetchCommentList()
  loading.value = false
}
</script>
