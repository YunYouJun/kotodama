<template>
  <el-table
    v-loading="loading"
    :data="
      commentStore.commentListInfo?.data.filter(
        (data) =>
          !search || data.nick.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column type="selection" width="40" />
    <el-table-column width="150" :label="t('dashboard.author')" prop="nick">
      <template #default="scope">
        <div>
          <div class="flex items-center" m="b-2">
            <img class="w-6 h-6 rounded-full shadow" :src="getAvatarUrl(scope.row.mail)" />
            <div class="ml-2">
              <a
                v-if="scope.row.link"
                class="text-blue-500"
                :href="(scope.row.link.startsWith('http') ? '' : 'http://') + scope.row.link"
                target="_blank"
                font="serif black"
              >{{ scope.row.nick }}</a>
              <span v-else font="serif black">{{ scope.row.nick }}</span>
            </div>
          </div>
          <a
            class="block text-xs text-blue-900"
            font="mono normal"
            m="y-2"
            v-if="scope.row.mail"
            :href="`mailto:${scope.row.mail}`"
            target="_blank"
          >{{ scope.row.mail }}</a>
          <span class="block" font="mono normal" text="xs" v-if="scope.row.ip">{{ scope.row.ip }}</span>
          <SystemBadge :ua="scope.row.ua" />
        </div>
      </template>
    </el-table-column>

    <el-table-column :label="t('dashboard.content')" min-width="300" prop="comment">
      <template #header>
        <el-input v-model="search" size="mini" :placeholder="t('placeholder.search')">
          <template #prefix>
            <el-icon class="el-input__icon">
              <i-ri-search-line />
            </el-icon>
          </template>
        </el-input>
      </template>
      <template #default="scope">
        <CommentControl :item="scope.row" />
      </template>
    </el-table-column>
  </el-table>

  <div class="flex items-center justify-center overflow-x-auto bg-white" p="2">
    <el-pagination
      layout="prev, pager, next, jumper"
      background
      :current-page="currentPage"
      :page-size="commentStore.commentListInfo?.pageSize"
      :page-count="commentStore.commentListInfo?.totalPages"
      @update:current-page="toggleCurrentPage"
      @update:page-size="updatePageSize"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
const { t } = useI18n()
import { CommentParams,  getCommentList } from '~/api/comment';
import { useCommentStore } from '~/stores/comment';
import { getAvatarUrl } from '~/utils';

const commentStore = useCommentStore()

const loading = ref(true)
const search = ref('')
const filter = reactive<CommentParams['filter']>({
  owner: 'all',
  status: 'approved',
  keyword: ''
})
const currentPage = ref(1)

const fetchCommentList = async () => {
  try {
    const { data } = await getCommentList({
      page: currentPage.value,
      filter
    })
    commentStore.commentListInfo = data
  } catch {
    ElMessage.error({
      message: t('message.load_error'),
      showClose: true
    })
  }

  loading.value = false
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

const updatePageSize = () => { }
</script>
