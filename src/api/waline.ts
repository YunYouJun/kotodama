export interface WalineResponse<T> {
  data: T
  /**
   * 错误信息
   */
  errmsg: string
  /**
   * 错误码
   */
  errno: number
}
