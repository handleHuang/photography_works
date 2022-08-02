<template>
  <div class="container_login">
    <div class="login__inputwrap">
      <div class="inputwrap__title">admin</div>
      <t-form ref="form" :data="formData" :rules="rules" @submit="onSubmit">
        <div class="inputwrap__input">
          <t-form-item name="username">
            <t-input
              v-model="formData.login_id"
              placeholder="账号"
              type="text"
            ></t-input>
          </t-form-item>
        </div>
        <div class="inputwrap__input">
          <t-form-item name="password">
            <t-input
              v-model="formData.password"
              placeholder="密码"
              type="password"
            ></t-input>
          </t-form-item>
        </div>
        <div class="inputwrap__input">
          <div style="display: flex">
            <t-form-item name="captcha_answer">
              <t-input
                v-model="formData.captcha_answer"
                placeholder="验证码"
                type="text"
              ></t-input>
            </t-form-item>
            <img
              :src="verificationCodeUrl"
              alt=""
              @click="getVerificationCode"
            />
          </div>
        </div>
        <div class="inputwrap__input">
          <t-form-item>
            <t-button theme="primary" type="submit" :loading="loading">{{
              loading ? "登录中" : "登录"
            }}</t-button>
          </t-form-item>
        </div>
      </t-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      rules: {
        login_id: [{ required: true, message: '账号必填' }],
        password: [
          { required: true, message: '密码必填' },
          { min: 6, message: '密码至少填写6个字符', type: 'error' }
        ],
        captcha_answer: [
          { required: true, message: '验证码必填' },
          { min: 6, message: '图片验证码长度必须为 6 位的数字', type: 'error' }
        ]
      },
      formData: {
        login_id: 'administrator',
        password: 'fenghui@2022',
        captcha_id: '',
        captcha_answer: ''
      },
      verificationCodeUrl: '',
      loading: false
    }
  },
  computed: {},
  mounted () {
    this.getVerificationCode()
  },
  methods: {
    // 登陆
    async onSubmit ({ validateResult, firstError }) {
      this.loading = true
      if (validateResult === true) {
        const res = await this.$store
          .dispatch('doLogin', this.formData)
          .catch((err) => {
            this.loading = false
            console.log(err.response)
            this.getVerificationCode()
            if (
              err.response.data.errors &&
              err.response.data.errors.captcha_answer &&
              err.response.status === 422
            ) {
              this.$message.error('验证码错误')
            }
            if (err.response.data.message && err.response.status === 500) {
              this.$message.error(err.response.data.message)
            }
          })
        console.log(res)
        this.loading = false
        if (res && res.token !== '') {
          localStorage.setItem('user_info', JSON.stringify(res))
          this.$message.success('登陆成功')
          setTimeout(() => {
            this.$router.push('/')
          }, 500)
        }
      } else {
        this.loading = false
        console.log('Errors: ', validateResult)
        this.$message.warning(firstError)
      }
    },
    // 获取验证码图片
    async getVerificationCode () {
      const res = await this.$store.dispatch('getVerificationCode')
      console.log(res)
      this.verificationCodeUrl = res.captcha_image
      this.formData.captcha_id = res.captcha_id
    }
  }
}
</script>
<style lang="less" src='../../assets/style/login/login.less'></style>
