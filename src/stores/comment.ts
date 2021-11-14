import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CommentList } from '~/api/comment';

export const useCommentStore = defineStore('comment', () => {
  const commentListInfo = ref<CommentList>()

  return {
    commentListInfo
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCommentStore, import.meta.hot))
