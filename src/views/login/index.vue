<template>
  <div class="index-all">
    <div class="left">欢迎来到VueAdmin管理系统</div>
    <div class="login-wrapper">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="login-form"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" size="large" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" size="large" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" style="width: 130px" size="large" />
          <img :src="data.codeUrl" @click="getCode" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button>获取密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getLoginCode, getlogin } from '../../api/user'
const ruleForm = reactive({
  username: 'test',
  password: '',
  code: ''
})

const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const data = reactive({
  codeUrl: '',
  token: ''
})

// 图片验证码
async function getCode() {
  const res = await getLoginCode()
  data.codeUrl = res.data.data.captchaImg
  data.token = res.data.data.token
  console.log(data.codeUrl)
}
getCode()

// 登录
const ruleFormRef = ref()
async function submitForm() {
  console.log(ruleFormRef)

  const res = await getlogin({
    username: ruleForm.username,
    password: ruleForm.password,
    code: ruleForm.code,
    token: data.token
  })
  if (res.data.code === 200) {
    alert('登录')
  } else {
    getCode()
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.left {
  display: block;
  font-size: 28px;
  font-weight: bold;
  margin: auto;
  text-align: center;
}
.login-wrapper {
  position: relative;
  height: 100%;
  background-color: $bg;

  .login-form {
    width: 520px;
    padding: 0 35px;
    position: absolute;
    left: 50%;
    margin-left: -260px;
    top: 160px;
    overflow: hidden;
  }
}
</style>
