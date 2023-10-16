<template>
  <div class="continer continer_detail">
    <div class="page__breadcrumb back__breadcrumb">
      <div class="goback" @click="router.back()">
        <t-icon name="chevron-left" />
        返回上一级
      </div>
    </div>
    <div class="continer_box">
      <div class="header">
        <div class="header_left">
          <span>修改账号信息</span>
        </div>
      </div>
      <div class="body">
        <t-form
          labelAlign="left"
          :data="formData"
          :rules="rules"
          @submit="onSubmit"
        >
          <div class="form_wrap">
            <t-form-item label="账号" name="title">
              {{ formData.username }}
            </t-form-item>
            <t-form-item label="密码" name="password">
              <t-input v-model="formData.password" type="password"></t-input>
            </t-form-item>
            <t-form-item label="邮箱" name="email">
              <t-input v-model="formData.email" type="text"></t-input>
            </t-form-item>
            <t-form-item label="头像" name="cover">
              <t-upload
                ref="uploadRef1"
                v-model="file1"
                action="http://127.0.0.1:12134/api/upUserImg"
                theme="image"
                tips="图片不能超出2m"
                accept="image/*"
                :auto-upload="true"
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
            <t-form-item label="修改身份" name="cont">
              <t-radio-group size="large" v-model="formData.identity">
                <t-radio :value="0">超级管理员</t-radio>
                <t-radio :value="1">管理员</t-radio>
                <t-radio :value="2">普通用户</t-radio>
              </t-radio-group>
            </t-form-item>
          </div>
          <div class="operate_box">
            <t-button
              theme="default"
              variant="outline"
              @click="router.push('/userList')"
              >取消</t-button
            >
            <t-button type="submit">保存</t-button>
          </div>
        </t-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue-next'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const store = useStore()
const router = useRouter()
const route = useRoute()
// 表单数据
const formData = ref({})
const rules = {
  password: [{ required: true, message: '密码必填' }],
  email: [{ required: true, message: '邮箱必填' }]
}
const userIdentity = JSON.parse(localStorage.getItem('user_info')).identity
const onSubmit = ({ validateResult, firstError, e }) => {
  if (validateResult === true) {
    if (userIdentity !== 0) {
      MessagePlugin.warning('本账号权限不够')
    } else {
      store
        .dispatch('anemdUser', formData.value)
        .then((res) => {
          console.log(res)
          MessagePlugin.success('修改成功')
          router.push('/userList')
        })
        .catch((err) => {
          MessagePlugin.warning(err.response.data.message)
        })
    }
  } else {
    MessagePlugin.warning(firstError)
  }
}
// 详情
const detailData = () => {
  store.dispatch('detailsUser', { id: route.query.id }).then((res) => {
    console.log(res)
    formData.value = res
    if (res.cover) {
      file1.value = [{
        url: res.cover,
        name: res.username,
        status: 'success'
      }]
    }
  })
}

// 上传组件
const file1 = ref([])
const handleFail = (file) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`)
}
const changeUpdata = (item) => {
  formData.value.cover = item[0].url
  console.log(item)
}

onMounted(() => {
  if (route.query.id) {
    detailData()
  }
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
