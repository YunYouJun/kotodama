import axios from "axios"
import { ElMessage } from "element-plus";

const namespace = 'waline'
export const token = useStorage(`${namespace}-token`, '')

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL?.toString(),
  headers: {
    Authorization: token.value ? `Bearer ${token.value}` : ''
  }
})

$axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response.data && response.data.errmsg) {
    const data = response.data
    ElMessage.error({
      message: data.errmsg,
      showClose: true
    })
  }
  return response;
}, function (error) {
  ElMessage.error({
    message: error.message,
    showClose: true
  })
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
