import { ElMessage } from 'element-plus'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CommentList, CommentParams } from '~/api/comment'
import { getCommentList } from '~/api/comment'

export const useCommentStore = defineStore('comment', () => {
  const { t } = useI18n()

  const loading = ref(true)
  const currentPage = ref(1)

  const filter = reactive<CommentParams['filter']>({
    owner: 'all',
    status: 'approved',
    keyword: '',
  })

  const commentListInfo = ref<CommentList>()

  const fetchCommentList = async() => {
    loading.value = true
    try {
      const { data } = await getCommentList({
        page: currentPage.value,
        filter,
      })
      commentListInfo.value = data
    }
    catch {
      ElMessage.error({
        message: t('message.load_error'),
        showClose: true,
      })
    }

    loading.value = false
  }

  watch(() => filter, () => {
    fetchCommentList()
  }, {
    deep: true,
  })

  return {
    loading,
    filter,
    currentPage,

    commentListInfo,

    fetchCommentList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCommentStore, import.meta.hot))
