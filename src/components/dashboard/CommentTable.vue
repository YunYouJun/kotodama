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
    <el-table-column width="150" :label="t('dashboard.author')" prop="nick">
      <template #default="scope">
        <div>
          <div class="flex items-center" m="b-2">
            <img class="w-6 h-6 rounded-full shadow" :src="getAvatarUrl(scope.row.mail)" />
            <div class="ml-2">
              <a
                v-if="scope.row.link"
                class="text-blue-500"
                :href="scope.row.link"
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
        </div>
      </template>
    </el-table-column>
    <el-table-column width="180" :label="t('dashboard.time')" prop="createdAt">
      <template #default="scope">
        <div
          p="y-1"
          class="text-xs opacity-90 flex justify-start items-center"
          :title="t('dashboard.createdAt')"
        >
          <i-ri-pencil-line class="mr-1" />
          {{ dayjs(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </div>
        <div
          v-if="scope.row.createdAt !== scope.row.updatedAt"
          p="y-1"
          class="text-xs opacity-90 flex justify-start items-center"
          :title="t('dashboard.updatedAt')"
        >
          <i-ri-refresh-line class="mr-1" />
          {{ dayjs(scope.row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="t('dashboard.content')" prop="comment">
      <template #default="scope">
        <div v-html="scope.row.comment"></div>
      </template>
    </el-table-column>
    <el-table-column width="200" align="right">
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
        <!-- <el-button size="small" type="primary" plain title="编辑" circle>
          <i-ri-edit-line />
        </el-button>-->
        <el-popconfirm
          :title="t('message.delete')"
          @confirm="triggerDeleteComment(scope.row.objectId)"
        >
          <template #reference>
            <el-button size="small" type="danger" plain circle title="删除">
              <i-ri-delete-bin-line />
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="mt-5"
    layout="prev, pager, next, jumper"
    background
    :current-page="currentPage"
    :page-size="commentListInfo?.pageSize"
    :page-count="commentListInfo?.totalPages"
    @update:current-page="toggleCurrentPage"
    @update:page-size="updatePageSize"
  ></el-pagination>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus';
const { t } = useI18n()
import { CommentList, CommentParams, deleteComment, getCommentList } from '~/api/comment';
import { getAvatarUrl } from '~/utils';

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

const updatePageSize = () => { }

const triggerDeleteComment = async (id: string) => {
  const data = await deleteComment(id)
  if (data.errno === 0) {
    ElMessage.success(t('message.delete_success'))
  } else {
    ElMessage.error(t('message.delete_error') + data.errmsg)
  }
}
</script>
