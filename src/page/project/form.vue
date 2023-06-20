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
          <span>{{ route.query.id?'编辑命题':'新增命题' }}</span>
        </div>
      </div>
      <div class="body">
        <t-form
          labelAlign="left"
          :data="formData.obj"
          :rules="rules"
          @submit="onSubmit"
        >
          <div class="form_wrap">
            <t-form-item label="标题" name="title">
              <t-input v-model="formData.obj.title" type="text"></t-input>
            </t-form-item>
            <t-form-item label="描述" name="description">
              <t-textarea v-model="formData.obj.description" type="text" :autosize="{ minRows: 4, maxRows: 4 }"></t-textarea>
            </t-form-item>
            <t-form-item label="封面" name="tempcover">
              <upload
                :upload-number="1"
                :list="formData.obj.tempcover"
                names="tempcover"
                types="cover"
                cuttingTips="*图片尺寸固定比例359px*184px"
                text="封面比例343:180大小不超过10M"
                :aspectRatio="359 / 184"
                @fileList="fileCover"
              ></upload>
            </t-form-item>
            <div class="operate_box">
              <t-radio-group size="large" v-model="formData.obj.status">
                <t-radio :value="1">发布</t-radio>
                <t-radio :value="0">暂不发布</t-radio>
              </t-radio-group>
              <t-button
                theme="default"
                variant="outline"
                @click="router.push('/banner')"
                >取消</t-button
              >
              <t-button type="submit">{{
                route.query.id ? '保存' : '上传'
              }}</t-button>
            </div>
          </div>
          <div class="operate_box">
            <t-radio-group size="large" v-model="formData.obj.online_status">
              <t-radio :value="1">发布</t-radio>
              <t-radio :value="2">暂不发布</t-radio>
            </t-radio-group>
            <t-button
              theme="default"
              variant="outline"
              @click="router.push('/project')"
              >取消</t-button
            >
            <t-button type="submit">{{
              route.query.id ? '保存' : '上传'
            }}</t-button>
          </div>
        </t-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import upload from '../../components/uploads.vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { reactive, toRaw, onMounted } from 'vue'
// import { reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const store = useStore()
const router = useRouter()
const route = useRoute()
// 表单数据
const formData = reactive({
  obj: {
    online_status: 1
  }
})
function fileCover ({ list, names }) {
  formData.obj[toRaw(names)] = toRaw(list)
}
const rules = {
  title: [{ required: true, message: '名称必填' }],
  description: [{ required: true, message: '描述必填' }],
  tempcover: [{ required: true, message: '封面必传' }]
}
const onSubmit = ({ validateResult, firstError, e }) => {
  if (validateResult === true) {
    formData.obj.cover = formData.obj.tempcover[0]
    delete formData.obj.cover.url
    delete formData.obj.cover.id
    if (formData.obj.id) {
      formData.obj.project_id = formData.obj.id
    }
    store
      .dispatch(
        formData.obj.id ? 'projectUpdate' : 'projectCreate',
        formData.obj
      )
      .then(res => {
        MessagePlugin.success(formData.obj.id ? '修改成功' : '上传成功')
        router.push('/project')
      }).catch(err => {
        MessagePlugin.warning(err.response.data.message)
      })
  } else {
    MessagePlugin.warning(firstError)
  }
}
// 详情
const detailData = () => {
  store.dispatch('projectDetail', { project_id: route.query.id }).then(res => {
    formData.obj = res
    formData.obj.tempcover = [res.cover]
  })
}
onMounted(() => {
  if (route.query.id) {
    detailData()
  }
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
