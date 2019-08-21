<template>
  <div  class = 'login'>
     <el-card class = 'card'>
       <img src="../../assets/img/logo_index.png" alt="">
       <el-form :model = 'formData' :rules="rules"  ref = 'login' status-icon>
         <el-form-item prop='mobile'>
           <el-input style = 'margin-top:30px' placeholder="请输入手机号" v-model = 'formData.mobile'></el-input>
         </el-form-item>
         <el-form-item  prop='code'>
           <el-input  placeholder="请输入验证码" style = 'width:65%'  v-model = 'formData.code'> </el-input>
           <el-button style = 'float:right'>发送验证码</el-button>
         </el-form-item>
         <el-form-item  prop='check'>
           <el-checkbox v-model = 'formData.check'>我已阅读并同意用户协议和隐私条款</el-checkbox>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" style='width:100%' @click = 'login'>登录</el-button>
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
          {
            required: true,
            message: '登录手机号不能为空'
          },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true,
            message: '验证码不能为空' },
          {
            pattern: /^\d{6}$/,
            message: '验证码长度必须为6个数字'
          }
        ],
        check: [
          { message: '必须勾选才能登录',
            validator: fn
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.login.validate(isOk => {
        if (isOk) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData
          }).then(res => {
            console.log(res)
            localStorage.setItem('user-info', JSON.stringify(res.data))
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
    width: 100%;
    height: 100vh;
    background-image: url('../../assets/img/login_bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .card {
      height: 350px;
      width: 420px;
      img {
        height: 30px;
        margin-left: 100px;
      }
    }
}
</style>
