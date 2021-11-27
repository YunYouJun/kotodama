<template>
  <div>
    <el-form ref="pwdFormRef" :model="pwdForm" :rules="rules">
      <el-form-item prop="pass" required>
        <el-input
          v-model="pwdForm.pass"
          type="password"
          autocomplete="off"
          :placeholder="t('user.password')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" required>
        <el-input
          v-model="pwdForm.checkPass"
          type="password"
          autocomplete="off"
          :placeholder="t('user.confirm_password')"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          class="w-full"
          :loading="loading"
          @click="updatePassword"
        >
          {{ t('user.update_password') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">import { ElMessage } from 'element-plus'
import { updateUser } from '~/api/user'

const { t } = useI18n()

const loading = ref(false)
const pwdFormRef = ref()
const pwdForm = ref({
  pass: '',
  checkPass: '',
})

const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error(t('message.input_new_password')))
  }
  else if (value.length < 6) {
    callback(new Error(t('error.password')))
  }
  else {
    if (pwdForm.value.checkPass !== '')
      pwdFormRef.value.validateField('checkPass')

    callback()
  }
}

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '')
    callback(new Error(t('message.input_password_again')))
  else if (value.length < 6)
    callback(new Error(t('error.password')))
  else if (value !== pwdForm.value.pass)
    callback(new Error(t('message.password_not_same')))
  else
    callback()
}

const rules = {
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
}

const updatePassword = () => {
  pwdFormRef.value.validate(async(valid: boolean) => {
    if (valid) {
      loading.value = true
      await updateUser({
        password: pwdForm.value.pass,
      }).then((res) => {
        if (res.errno === 0) {
          ElMessage.success({
            message: t('message.update_success'),
            showClose: true,
          })
        }
      })
      loading.value = false
    }
    else {
      ElMessage.error({
        message: '请检查密码是否一致！',
        showClose: true,
      })
      return false
    }
  })
}
</script>
