<template>
  <div class="flex justify-between" m="2">
    <div class="flex justify-center items-center">
      <button
        v-for="(item, i) in statusItems"
        :key="i"
        class="icon-btn rounded-full p-2 focus:outline-none"
        m="1"
        :class="item.value === comment.filter.status ? 'bg-black text-white shadow' : ''"
        :title="item.title"
        @click="comment.filter.status = item.value"
      >
        <component :is="item.icon" />
      </button>
    </div>
    <div class="flex justify-center items-center">
      <el-button-group size="mini">
        <el-button v-for="(item, i) in ownerItems" :key="i" :type="item.value === comment.filter.owner ? 'primary' : ''" @click="comment.filter.owner = item.value">
          {{ item.title }}
        </el-button>
      </el-button-group>
    </div>
  </div>
  <div class="flex justify-between" m="x-1">
    <el-input v-model="comment.filter.keyword" class="mx-2" size="mini" :placeholder="t('placeholder.keyword')" />
  </div>
</template>

<script lang="ts" setup>
import IconRiChatCheckLine from '~icons/ri/chat-check-line'
import IconRiMessageLine from '~icons/ri/message-line'
import IconRiChatDeleteLine from '~icons/ri/chat-delete-line'
import type { CommentStatus } from '~/api/comment'
import { useCommentStore } from '~/stores/comment'

const { t } = useI18n()
const comment = useCommentStore()

interface StatusItem {
  title: string
  value: CommentStatus
  icon: string
}

const statusItems: StatusItem[] = [
  {
    title: '已通过',
    value: 'approved',
    icon: IconRiChatCheckLine,
  }, {
    title: '待审核',
    value: 'waiting',
    icon: IconRiMessageLine,
  }, {
    title: '垃圾',
    value: 'spam',
    icon: IconRiChatDeleteLine,
  },
]

const ownerItems = [
  {
    title: '所有',
    value: 'all',
  },
  {
    title: '我的',
    value: 'mine',
  },
]
</script>
