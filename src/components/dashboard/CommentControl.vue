<script lang="ts" setup>
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import type { CommentItem } from '~/api/comment'

import { deleteComment, updateComment } from '~/api/comment'
import { useCommentStore } from '~/stores/comment'
import { useUserStore } from '~/stores/user'
import { parseMarkdown } from '~/utils/markdown'

const props = defineProps<{
  item: CommentItem
}>()

const router = useRouter()
const uStore = useUserStore()

const commentRef = ref()
const loading = ref(false)

const { t } = useI18n()

const commentStore = useCommentStore()

async function triggerDeleteComment(id: string) {
  const data = await deleteComment(id)
  if (data.errno === 0) {
    ElMessage.success(t('message.delete_success'))
    if (commentStore.commentListInfo)
      commentStore.commentListInfo.data = commentStore.commentListInfo?.data.filter(item => item.objectId !== id)
  }
  else {
    ElMessage.error(t('message.delete_error') + data.errmsg)
  }
}

const isEditing = ref(false)

const previewedHtml = computedAsync(async () => {
  return await parseMarkdown(
    props.item.comment,
  )
})

watch(() => props.item, () => {
  isEditing.value = false
})

/**
 * 编辑评论
 */
function editComment() {
  isEditing.value = true
}

/**
 * 保存评论
 */
async function saveComment() {
  loading.value = true
  const data = await updateComment(props.item.objectId, {
    comment: props.item.comment,
  })
  if (data.errno === 0) {
    ElMessage.success({
      message: t('message.update_success'),
    })
  }
  loading.value = false
  isEditing.value = false
}

const controlItems = [
  {
    title: t('button.approve'),
    show: () => props.item.status !== 'approved',
    icon: 'i-ri-check-line',
    color: 'green',
    onClick: () => updateComment(props.item.objectId, { status: 'approved' }),
  },
  {
    title: t('button.move_to_waiting'),
    show: () => props.item.status !== 'waiting',
    icon: 'i-ri-todo-line',
    color: 'blue',
    onClick: () => updateComment(props.item.objectId, { status: 'waiting' }),
  },
  {
    title: t('button.move_to_spam'),
    show: () => props.item.status !== 'spam',
    icon: 'i-ri-chat-delete-line',
    color: 'red',
    onClick: () => updateComment(props.item.objectId, { status: 'spam' }),
  },
  {
    title: t('button.save'),
    show: () => isEditing.value,
    icon: 'i-ri-save-line',
    color: 'blue',
    onClick: () => saveComment(),
  },
  {
    title: t('button.edit'),
    show: () => !isEditing.value,
    icon: 'i-ri-edit-line',
    color: 'blue',
    onClick: () => editComment(),
  },
  {
    title: '回复',
    show: () => true,
    icon: 'i-ri-reply-line',
    color: 'green',
    onClick: () => {
      router.push({
        query: {
          url: props.item.url,
        },
      })
      scrollTo(0, document.getElementById('waline-wrapper')?.offsetTop || 0)
    },
  },
]
</script>

<template>
  <div ref="commentRef" v-loading="loading" class="flex flex-col items-start" m="-t-2 x-1" p="t-2 b-7">
    <div class="text-xs" m="b-2">
      <div
        m="r-2"
        class="inline-flex items-center justify-start opacity-90"
        :title="t('dashboard.createdAt')"
      >
        <div i-ri-pencil-line class="mr-1" />
        <span>{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <a
        class="inline-flex items-center justify-center text-blue-500"
        :href="uStore.url + item.url"
        target="_blank"
      >
        <div i-ri-link class="mr-1" />
        {{ item.url }}
      </a>
      <div
        v-if="item.createdAt !== item.updatedAt"
        m="l-2"
        class="inline-flex items-center justify-center opacity-90"
        :title="t('dashboard.updatedAt')"
      >
        <div i-ri-refresh-line class="mr-1" />
        <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>

      <el-tooltip
        v-if="isEditing"
        content="退出编辑" placement="top"
      >
        <div
          class="absolute right-2 top-2 icon-btn hover:bg-red-500 hover:bg-opacity-20 hover:text-red-500"
          title="退出编辑"
          @click="isEditing = false"
        >
          <div class="i-ri-close-line" text="sm" />
        </div>
      </el-tooltip>
    </div>

    <div v-if="isEditing" class="w-full">
      <!-- eslint-disable vue/no-mutating-props -->
      <el-input
        v-model="item.comment"
        class="w-full"
        :placeholder="t('placeholder.edit_content')"
        type="textarea"
        autosize
      />
    </div>
    <div v-else v-html="previewedHtml" />
  </div>

  <div class="absolute bottom-1 left-2 right-2 flex justify-between">
    <template v-for="(controlItem, i) in controlItems">
      <el-tooltip
        v-if="controlItem.show()"
        :key="i"
        :content="controlItem.title" placement="top"
      >
        <div
          class="icon-btn hover:bg-opacity-20" :class="[`hover:text-${controlItem.color}-500`, `hover:bg-${controlItem.color}-500`]"
          :title="controlItem.title"
          @click="controlItem.onClick"
        >
          <div :class="controlItem.icon" />
        </div>
      </el-tooltip>
    </template>

    <el-popconfirm :title="t('message.delete')" @confirm="triggerDeleteComment(item.objectId)">
      <template #reference>
        <div class="icon-btn" hover="text-red-500 bg-red-500 bg-opacity-20" title="删除">
          <div i-ri-delete-bin-line />
        </div>
      </template>
    </el-popconfirm>
  </div>
</template>
