import { $axios } from "~/logic/axios";
import { WalineResponse } from "./waline";

export type CommentStatus = 'approved' | 'waiting' | 'spam'

export interface CommentParams {
  page: number;
  filter: {
    owner: string
    keyword: string
    status: CommentStatus
  };
}

export interface BaseItem {
  objectId: string
  createdAt: string
  updatedAt: string
  insertedAt: string
}

export interface UserInfo {
  user_id: string
  nick: string
  ip: string
  mail: string
  link: string
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
} & UserInfo & BaseItem

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
export async function getCommentList(params: CommentParams) {
  const { data } = await $axios.get<WalineResponse<CommentList>>('/comment', {
    params: {
      type: 'list',
      ...params.filter,
      page: params.page,
    }
  })
  return data
}

export async function replyComment() {

}

/**
 * 删除评论
 * @param id 
 * @returns 
 */
export async function deleteComment(id: string) {
  const { data } = await $axios.delete<WalineResponse<null>>(`/comment/${id}`);
  return data
}
