<template>
  <CommentToolbar />

  <el-table
    v-loading="commentStore.loading"
    :data="displayedData"
    class="w-full"
    :empty-text="t('placeholder.empty')"
  >
    <el-table-column type="selection" width="40" />
    <el-table-column width="150" :label="t('dashboard.author')" prop="nick">
      <template #default="scope">
        <div>
          <div class="flex items-center" m="b-2">
            <img class="w-6 h-6 rounded-full shadow" :src="getAvatarUrl(scope.row.mail)">
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
            v-if="scope.row.mail"
            class="block text-xs text-blue-900"
            font="mono normal"
            m="y-2"
            :href="`mailto:${scope.row.mail}`"
            target="_blank"
          >{{ scope.row.mail }}</a>
          <span v-if="scope.row.ip" class="block" font="mono normal" text="xs">{{ scope.row.ip }}</span>
          <SystemBadge :ua="scope.row.ua" />
        </div>
      </template>
    </el-table-column>

    <el-table-column :label="t('dashboard.content')" min-width="300" prop="comment">
      <template #header>
        <el-input v-model="search" size="small" :placeholder="t('placeholder.search')">
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

  <div class="flex items-center justify-center overflow-auto bg-white" p="y-3">
    <el-pagination
      class="w-full"
      layout="prev, pager, next, jumper"
      background
      :current-page="commentStore.currentPage"
      :page-size="commentStore.commentListInfo?.pageSize"
      :page-count="commentStore.commentListInfo?.totalPages"
      @update:current-page="toggleCurrentPage"
      @update:page-size="updatePageSize"
    />
  </div>
</template>

<script lang="ts" setup>
import { useCommentStore } from '~/stores/comment'
import { getAvatarUrl } from '~/utils'
import type { CommentItem } from '~/api/comment'
const { t } = useI18n()

const commentStore = useCommentStore()

const search = ref('')

onBeforeMount(async() => {
  commentStore.fetchCommentList()
})

const toggleCurrentPage = async(page: number) => {
  commentStore.currentPage = page
  await commentStore.fetchCommentList()
}

const updatePageSize = () => { }

const displayedData = computed(() => {
  const searchContent = search.value.toLowerCase()
  const fields: (keyof CommentItem)[] = ['mail', 'ip', 'nick', 'comment']
  return commentStore.commentListInfo?.data.filter(
    (data) => {
      let flag = !search.value
      fields.forEach((field) => {
        if (data[field]?.toLowerCase().includes(searchContent))
          flag = true
      })
      return flag
    },
  )
})
</script>
