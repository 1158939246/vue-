<template>
  <div class="main">
    <canvas id="particle-canvas" width="1193" height="941"></canvas>
    <div class="content">
      <div class="login">
        <h4 class="tittle">we</h4>
        <el-form
          size="mini"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="40px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="loginId">
            <el-input v-model="ruleForm.loginId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="loginPwd">
            <!-- 给密码添加按键事件,该事件只对enter生效 -->
            <el-input
              type="password"
              v-model="ruleForm.loginPwd"
              autocomplete="off"
              @keydown.native.enter.stop="longinPwdEnter"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="ruleForm.checkMe">记住我</el-checkbox>
            <br>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登入</el-button
            >
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { strTomd5 } from '../util/md5'
import { startAnimation } from '../assets/login'
export default {
  mounted () {
    startAnimation()
  },
  data () {
    var validateLoginPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateLoginId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        // 登入名
        loginId: '',
        // 登入密码
        loginPwd: '',
        checkMe: 'false'
      },
      // 表单的验证数据
      rules: {
        loginPwd: [{ validator: validateLoginPwd, trigger: 'blur' }],
        loginId: [{ validator: validateLoginId, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 在密码文本框事件失去焦点
    longinPwdEnter () {
      this.submitForm('ruleForm')
    },
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        this.$router.push('/layout')
      //   if (valid) {
      //     // 加密
      //     this.ruleForm.loginPwd = strTomd5(this.ruleForm.loginPwd)
      //     const { message, success, token } = await this.$get(
      //       '/Admin/Login',
      //       this.ruleForm
      //     )
      //     if (success) {
      //       // 服务器返回token，这个token保存身份信息
      //       // 所以需要保存token到浏览器的缓存空间中
      //       sessionStorage.setItem('token', token)
      //       localStorage.setItem('loginId', this.ruleForm.loginId)
      //       if (this.ruleForm.checkMe) {
      //         // 保存密码
      //         localStorage.setItem('loginPwd', this.ruleForm.loginPwd)
      //       }
      //       this.$setToken()
      //       this.$router.push('/layout')
      //     } else {
      //       this.$msg_e(message)
      //     }
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width:100%;
  height: 100vh;
  position:relative;
  display: flex;
    justify-content: center;
    align-items: center;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    .login {
      font-family: gjm;
      width: 460px;
      height: 240px;
      border-radius: 5px;
      border: 1px solid #ccc;
      padding: 20px;
      .tittle{
        font-size: 25px;
        color:white;
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }

  #particle-canvas {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100vh;
    background: linear-gradient(
      to bottom,
      rgb(10, 10, 50) 0%,
      rgb(60, 10, 60) 100%
    );
    vertical-align: middle;
  }
}
</style>
