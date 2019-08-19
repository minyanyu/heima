<template>
  <div class = 'login'>
      <el-card class = 'crad'>
          <div style="margin-bottom:30px">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form :model = 'formData' :rules="rules" ref="ruleForm">
                 <el-form-item prop="mobile">
                      <el-input v-model='formData.mobile' placeholder ='请输入手机号'></el-input>
                 </el-form-item>
                 <el-form-item prop='code'>
                     <el-input style="width:65%" v-model='formData.code'  placeholder ='请输入验证码'></el-input>
                     <el-button style = 'float:right'>发送验证</el-button>
                 </el-form-item>
                  <el-form-item prop='check'>
                      <el-checkbox  v-model='formData.check'>我已阅读并同意用户协议和隐私条款</el-checkbox>
                 </el-form-item>
                 <el-form-item>
                      <el-button type="primary" style= 'width:100%' @click = "login">登录</el-button>
                 </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    var fn = function (rule, value, callback) {
      if (value) {
        //  正常执行
        callback()
      } else {
        callback(new Error('message'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号输入错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        check: [
          {
            message: '您必须勾选才能登录',
            validator: fn
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate(isOK => {
        if (isOK) {
          //   发送请求
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData
          }).then(res => {
            window.localStorage.setItem('user-info', JSON.stringify(res.data.data))
            this.$router.push('/home')
          })
        }
      })
    }
  }
}

</script>

<style  lang = 'less' scoped >
    .login {
        height: 100vh;
        width: 100%;
        background-image: url('../../assets/img/login_bg.jpg');
        background-size: cover;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center;     /* 垂直居中 */
        .crad {
            height: 360px;
            width: 400px;
            img {
                height: 40px;
                margin-left:100px;
            }
        }
    }
</style>
