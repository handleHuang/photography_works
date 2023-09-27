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
          <span>命题详情</span>
        </div>
      </div>
      <div class="body">
        <div class="item">
          <div class="title">{{ detailData.obj.title }}</div>
          <span :class="`status showStatus${detailData.obj.online}`">{{
            detailData.obj.online == 2 ? "未发布" : "已发布"
          }}</span>
        </div>
        <div class="item">
          <span class="label">封面</span>
          <img
            v-if="detailData.obj.cover"
            class="cover"
            :src="detailData.obj.cover"
            alt=""
          />
        </div>
        <div class="item">
          <span class="label">描述</span>
          <div class="description">{{ detailData.obj.cont }}</div>
        </div>
      </div>
      <div class="operate_box">
        <t-button
          variant="outline"
          v-if="detailData.obj.online === 2"
          @click="
            setProjectStatus({
              id: projectId,
              online: 1,
            })
          "
          >上架</t-button
        >
        <t-button
          variant="outline"
          v-if="detailData.obj.online === 1"
          @click="
            setProjectStatus({
              id: projectId,
              online: 2,
            })
          "
          >下架</t-button
        >
        <t-button @click="dodelete(projectId)" variant="outline">删除</t-button>
        <t-button @click="doeditor">编辑</t-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()
// const domain = 'https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/'
const projectId = route.query.id
// 详情
const detailData = reactive({ obj: {} })
const getDetail = () => {
  store.dispatch('projectDetail', { id: projectId }).then((res) => {
    detailData.obj = res
  })
}
// 设置命题状态
function setProjectStatus (params) {
  store
    .dispatch('setProjectStatus', params)
    .then((res) => {
      MessagePlugin.success('操作成功')
      getDetail()
    })
    .catch((err) => {
      MessagePlugin.warning(err.response.data.message)
    })
}
// 删除
function dodelete (id) {
  const confirmDia = DialogPlugin.confirm({
    header: '确定删除此命题吗？',
    body: '删除后不可恢复',
    theme: 'warning',
    onConfirm: () => {
      store
        .dispatch('delProject', { id: id })
        .then((res) => {
          MessagePlugin.success('删除成功')
          router.push('/project')
        })
        .catch((err) => {
          MessagePlugin.warning(err.response.data.message)
        })
      confirmDia.destroy()
    },
    onClose: () => {
      confirmDia.hide()
    }
  })
}
// 编辑
function doeditor () {
  router.push({
    path: '/project/update',
    query: {
      id: projectId
    }
  })
}
onMounted(() => {
  getDetail()
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
