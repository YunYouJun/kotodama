import type { CommentStatus } from '~/api/comment'

export interface StatusItem {
  title: string
  value: CommentStatus
  icon: string
}
