<template>
  <div class="upload">
    <div class="page__breadcrumb back__breadcrumb"></div>
    <div class="upload_box">
      <div class="layout_box">
        uploads:  <uploads></uploads>
        test:  <test></test>
        <div  class="item_box" @click="toUploadThesis">
          <img src="../../assets/icon/论文.svg"/>
          <div class="item_text1">论文上传</div>
          <div class="item_text2">上传论文PDF</div>
        </div>
        <!-- style="display:none" -->
        <div  class="item_box" @click="toUploadnews">
          <img src="../../assets/icon/新闻.svg"/>
          <div class="item_text1">新闻上传</div>
          <div class="item_text2">粘贴已发布公众号文章链接</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import uploads from '../../components/uploads.vue'
import test from '../../components/test.vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function toUploadThesis () {
  router.push('upload/thesisForm')
}
function toUploadnews () {
  router.push('upload/newsForm')
}
function simulationOn () {
  axios({
    method: 'POST',
    url: 'https://robot.zjtntd.com/admin/login',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    data: {
      username: 'robot',
      password: 'robot@2022'
    }
  }).then(res => {
    localStorage.setItem('access_token', JSON.stringify(res.data.access_token))
  })
}
onMounted(() => {
  simulationOn()
})
</script>

<style lang="less" scoped src="../../assets/style/upload/upload.less"></style>
