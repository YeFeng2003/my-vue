<template>
  <el-form ref="form" label-width="60px" :inline="true" :model="form" :rules="rules" class="login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item label="账号" prop="username">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
    </el-form-item>
    <el-button @click="submit" style="margin-left: 105px; margin-top: 10px;" type="primary">登录</el-button>
  </el-form>
</template>

<script>
import Cookie from 'js-cookie'
import { getMenu } from '../api'
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入姓名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            if (data.code === 20000) {
              Cookie.set('token', data.data.token)
              // 存入store中
              this.$store.commit('tab/setMenu', data.data.menu)
              this.$store.commit('tab/addMenu', this.$router)
              this.$router.push('home')
            } else {
              this.$message.error(data.data.message)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  .title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
}
</style>
