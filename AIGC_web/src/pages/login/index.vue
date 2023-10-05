<template>
    <div class="login">
      <div>
        <img class="login_logo" src="../../assets/svg/login-box-bg.svg" />
        <div class="title white">young摄影网</div>
      </div>
      <div>
        <!-- 登录 -->
        <div style="width: 350px" v-if="loginValue">
          <div class="title">登录</div>
          <t-form
            ref="form"
            :data="formData"
            :colon="true"
            :label-width="0"
            @submit="onSubmit"
          >
            <t-form-item name="account">
              <t-input
                v-model="formData.username"
                clearable
                placeholder="请输入账户名"
              >
                <template #prefix-icon>
                  <desktop-icon />
                </template>
              </t-input>
            </t-form-item>
  
            <t-form-item name="password">
              <t-input
                v-model="formData.password"
                type="password"
                clearable
                placeholder="请输入密码"
              >
                <template #prefix-icon>
                  <lock-on-icon />
                </template>
              </t-input>
            </t-form-item>
  
            <t-form-item>
              <t-button theme="primary" type="submit" block>登录</t-button>
              <t-button theme="default" @click="handle(2)">注册</t-button>
            </t-form-item>
          </t-form>
        </div>
  
        <!-- 注册 -->
        <div style="width: 350px" v-if="!loginValue">
          <div class="title">注册</div>
          <t-form
            ref="form"
            :data="formData"
            :rules="rules"
            @submit="onSubmit1"
            label-align="top"
          >
            <t-form-item label="用户名" name="username">
              <t-input v-model="formData.username"></t-input>
            </t-form-item>
  
            <t-form-item label="密码" name="password" help="请输入密码">
              <t-input v-model="formData.password" type="password"></t-input>
            </t-form-item>
  
            <t-form-item label="确认密码" name="rePassword" help="请确认密码">
              <t-input v-model="formData.rePassword" type="password"></t-input>
            </t-form-item>
  
            <t-form-item label="邮箱" name="newEmail" help="请输入邮箱">
              <t-input v-model="formData.newEmail"></t-input>
            </t-form-item>
  
            <t-form-item  label="头像" name="userCover" help="请上传头像">
              <t-upload
                ref="uploadRef1"
                v-model="file1"
                action="http://127.0.0.1:12134/api/upUserImg"
                theme="image"
                tips="图片不能超出2m"
                accept="image/*"
                :auto-upload="true"
                :upload-all-files-in-one-request="true"
                :size-limit="{ size: 2, unit: 'MB' }"
                :max="1"
                :abridge-name="[6, 6]"
                :locale="{
                  triggerUploadText: {
                    image: '请选择图片',
                  },
                }"
                @fail="handleFail"
                @Change="changeUpdata"
              >
              </t-upload>
            </t-form-item>
  
            <t-form-item>
              <t-space size="small">
                <t-button theme="primary" type="submit">注册</t-button>
                <t-button theme="default" @click="handle(1)">返回</t-button>
              </t-space>
            </t-form-item>
          </t-form>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  // import HelloWorld from "./components/HelloWorld.vue";
  import { login, register } from '../../models/index'
  import { MessagePlugin } from 'tdesign-vue-next'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const formData = reactive({
    username: '',
    password: '',
    rePassword: '',
    newEmail: '',
    identity: 2,
    cover: ''
  })
  // 登录
  const handleLogin = () => {
    login(formData)
      .then((res) => {
        // console.log(res.data)
        localStorage.setItem('user_info', JSON.stringify(res.data))
        localStorage.setItem(
          'token',
          JSON.parse(localStorage.getItem('user_info')).token
        )
        console.log(JSON.parse(localStorage.getItem('user_info')))
        MessagePlugin.success(res.message)
        jump()
      })
      .catch((err) => {
        MessagePlugin.warning(err.response.data.message)
      })
  }
  // 登录
  const onSubmit = ({ validateResult, firstError }) => {
    if (validateResult === true) {
      handleLogin()
    } else {
      console.log('Validate Errors: ', firstError, validateResult)
      MessagePlugin.warning(firstError)
    }
  }
  
  // 注册
  const onSubmit1 = ({ validateResult, firstError, e }) => {
    e.preventDefault()
    if (validateResult === true) {
      register(formData)
        .then((res) => {
          console.log(res)
          localStorage.setItem('user_info', JSON.stringify(res.user))
          localStorage.setItem('token', res.token)
          MessagePlugin.success(res.message)
          jump()
        })
        .catch((err) => {
          MessagePlugin.warning(err.response.data.message)
          console.log(err.response.data.message)
        })
    } else {
      console.log('Validate Errors: ', firstError, validateResult)
      MessagePlugin.warning(firstError)
    }
  }
  
  const rePassword = (val) =>
    new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(formData.password === val)
        clearTimeout(timer)
      })
    })
  
  const passwordValidator = (val) => {
    if (val.length > 0 && val.length <= 2) {
      return {
        result: false,
        message: '太简单了！再开动一下你的小脑筋吧！',
        type: 'error'
      }
    }
    if (val.length > 2 && val.length < 4) {
      return {
        result: false,
        message: '还差一点点，就是一个完美的密码了！',
        type: 'warning'
      }
    }
    return {
      result: true,
      message: '太强了，你确定自己记得住吗！',
      type: 'success'
    }
  }
  
  const rules = {
    username: [
      { required: true, message: '姓名必填', type: 'error' },
      {
        min: 2,
        message: '至少需要两个字',
        type: 'error',
        trigger: 'blur'
      }
    ],
    password: [
      { required: true, message: '密码必填', type: 'error' },
      { validator: passwordValidator }
    ],
    rePassword: [
      // 自定义校验规则
      { required: true, message: '密码必填', type: 'error' },
      { validator: rePassword, message: '两次密码不一致' }
    ],
    newEmail: [
      { required: true, message: '', type: 'error' }
    ]
  }
  
  // 注册、返回按钮
  const loginValue = ref(true)
  const handle = (index) => {
    if (index === 1) {
      loginValue.value = true
    } else {
      loginValue.value = false
    }
  }
  // 跳转
  const jump = () => {
    router.push({
      path: '/user'
    })
  }
  
  const file1 = ref([])
  const handleFail = (file) => {
    MessagePlugin.error(`文件 ${file.name} 上传失败`)
  }
  const changeUpdata = (item) => {
    formData.cover = item[0].url
    console.log(item)
  }
  </script>
  <style lang="less">
  .login {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-image: url("../../../src/assets/svg/login-bg.svg");
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      z-index: 2;
    }
  
    .login_logo {
      width: 50%;
      position: relative;
      z-index: 6;
      margin-bottom: 20px;
    }
  
    .title {
      font-size: 30px;
      line-height: 30px;
      text-align: left;
      margin-bottom: 10px;
      position: relative;
      z-index: 6;
      color: #000;
    }
  
    .white {
      color: #fff;
      width: 50%;
      text-align: center;
    }
  }
  </style>
  