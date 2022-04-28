import type { CommentUserInfo } from './user'
import type { WalineResponse } from './waline'
import { $axios } from '~/composables/axios'

export type CommentStatus = 'approved' | 'waiting' | 'spam'

export interface CommentParams {
  page: number
  filter: {
    owner: string
    keyword: string
    status: CommentStatus
  }
}

export interface BaseItem {
  objectId: string
  createdAt: string
  updatedAt: string
  insertedAt: string
}

export type CommentItem = {
  comment: string
  pid: string
  rid: string
  status: CommentStatus
  ua: string
  /**
   * 文章链接
   */
  url: string
} & CommentUserInfo & BaseItem

export interface CommentList {
  data: CommentItem[]
  page: number
  pageSize: number
  spamCount: number
  totalPages: number
  waitingCount: number
}

/**
 * 获取评论列表
 * @param params
 */
export async function getCommentList(params: CommentParams): Promise<WalineResponse<CommentList>> {
  return $axios.get('/comment', {
    params: {
      type: 'list',
      ...params.filter,
      page: params.page,
    },
  })
}

export async function replyComment() {

}

/**
 * 更新评论
 * @param id
 * @returns
 */
export async function updateComment(id: string, data: Partial<CommentItem>): Promise<WalineResponse<null>> {
  return $axios.put(`/comment/${id}`, data)
}

/**
 * 删除评论
 * @param id
 * @returns
 */
export async function deleteComment(id: string): Promise<WalineResponse<null>> {
  return $axios.delete(`/comment/${id}`)
}
