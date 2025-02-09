<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="mobile" v-model="loginForm.mobile" placeholder="请输入用户名" name="mobile" type="text" tabindex="1"
          auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
          placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="isAgree" class="is-agree-item">
        <el-checkbox v-model="loginForm.isAgree">我已阅读并同意用户协议和隐私政策</el-checkbox>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">mobile: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validatemobile = (rule, value, callback) => {
      const reg = /^1[3-9]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validateIsAgree = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请同意用户协议和隐私政策'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree: false
      },

      loginRules: {
        mobile: [
          { required: true, trigger: 'blur', validator: validatemobile }
        ],
        password: [

          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        isAgree: [
          { trigger: 'change', validator: validateIsAgree }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {

      if (this.passwordType === 'password') {
        this.passwordType = ''

      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
      this.$router.push({ path: this.redirect || '/' });
    },
    async handleLogin() {
      if (!this.$refs.loginForm) {
        console.error('Login form reference is missing');
        return;
      }

      this.$refs.loginForm.validate(async (valid) => {
        debugger
        console.log(valid+'进入')
        if (valid) {
          this.loading = true;
          try {
            debugger
            console.log(valid+'进入')
            await this.$store.dispatch('user/login', this.loginForm);
            console.log(this.redirect || '/' )
            this.$router.push({ path: this.redirect || '/' });
          } catch (error) {
            console.error('Login failed:', error);
            // 在这里可以显示一个用户友好的错误消息
            this.$message.error('登录失败，请重试');

          } finally {
            this.loading = false;
          }
        } else {
          console.log('error submit!!');
        }
      });
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .is-agree-item {
    border: none !important; // 取消边框
    background: none !important; // 取消背景
    color: inherit !important; // 使用默认文本颜色
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
