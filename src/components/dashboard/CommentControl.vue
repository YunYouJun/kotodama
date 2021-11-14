<template>
  <div v-loading="loading" class="flex flex-col items-start" m="-t-2 x-1" p="t-2 b-7">
    <div class="text-xs" m="b-2">
      <div
        m="r-2"
        class="opacity-90 inline-flex justify-start items-center"
        :title="t('dashboard.createdAt')"
      >
        <i-ri-pencil-line class="mr-1" />
        <span>{{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <a
        class="inline-flex justify-center items-center text-blue-500"
        :href="url + item.url"
        target="_blank"
      >
        <i-ri-link class="mr-1" />
        {{ item.url }}
      </a>
      <div
        v-if="item.createdAt !== item.updatedAt"
        m="l-2"
        class="opacity-90 inline-flex justify-center items-center"
        :title="t('dashboard.updatedAt')"
      >
        <i-ri-refresh-line class="mr-1" />
        <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
    </div>

    <div class="w-full" v-if="isEditing">
      <el-input
        class="w-full"
        v-model="item.comment"
        placeholder="编辑内容"
        type="textarea"
        autosize
      />
    </div>
    <div v-else v-html="item.comment"></div>

    
  </div>

  <div class="flex justify-between absolute left-2 right-2 bottom-1">
    <div v-if="isEditing" class="icon-btn" hover="text-blue-500 bg-blue-500 bg-opacity-20" title="保存" @click="saveComment">
      <i-ri-save-line />
    </div>
    <div v-else class="icon-btn" hover="text-blue-500 bg-blue-500 bg-opacity-20" title="编辑" @click="editComment">
      <i-ri-edit-line/>
    </div>
    <div
      class="icon-btn"
      hover="text-green-500 bg-green-500 bg-opacity-20"
      title="回复"
      @click="router.push({
        path: '/client',
        query: {
          url: item.url
        }
      })"
    >
      <i-ri-reply-line />
    </div>
    <el-popconfirm :title="t('message.delete')" @confirm="triggerDeleteComment(item.objectId)">
      <template #reference>
        <div class="icon-btn" hover="text-red-500 bg-red-500 bg-opacity-20" title="删除">
          <i-ri-delete-bin-line />
        </div>
      </template>
    </el-popconfirm>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { url } from '~/stores/user';

import { ElMessage } from 'element-plus'
import { CommentItem, deleteComment, updateComment } from '~/api/comment'
import { useCommentStore } from '~/stores/comment'

const { t } = useI18n()

const props = defineProps<{
  item: CommentItem
}>()

const router = useRouter()

const loading = ref(false)
const commentStore = useCommentStore()

const triggerDeleteComment = async (id: string) => {
  const data = await deleteComment(id)
  if (data.errno === 0) {
    ElMessage.success(t('message.delete_success'))
    if (commentStore.commentListInfo)
      commentStore.commentListInfo.data = commentStore.commentListInfo?.data.filter((item) => item.objectId !== id)
  } else {
    ElMessage.error(t('message.delete_error') + data.errmsg)
  }
}

const isEditing = ref(false)
/**
 * 编辑评论
 */
const editComment = () => {
  console.log('edit')
  isEditing.value = true
}

/**
 * 保存评论
 */
const saveComment = async ()=> {
  loading.value = true
  const data =await updateComment(props.item.objectId, {
    comment: props.item.comment
  })
  if (data.errno === 0) {
    ElMessage.success({
      message: t('message.update_success')
    })
  }
  loading.value = false
  isEditing.value = false
}
</script>
