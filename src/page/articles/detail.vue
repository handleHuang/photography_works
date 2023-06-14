<template>
  <div class="continer continer_detail article_detail">
    <div class="page__breadcrumb back__breadcrumb">
      <div class="goback" @click="router.back()">
        <t-icon name="chevron-left" />
        返回上一级
      </div>
    </div>
    <div class="continer_box">
      <div class="header">
        <div class="header_left">
          <div class="title_box">
            <span class="title">{{ detailData.obj.title }}</span>
            <span :class="`status showStatus${detailData.obj.online_status}`">{{
              detailData.obj.online_status == 2 ? '未发布' : '已发布'
            }}</span>
          </div>
          <div class="article_baseInfo">
            <div
              class="avatar_box"
              v-if="detailData.obj.user && detailData.obj.user.avatar"
            >
              <img class="avatar" :src="domain + detailData.obj.user.avatar" />
              <span class="author_name">{{ detailData.obj.user.name }}</span>
            </div>
            <div class="flow">
              <div>
                <span>{{ formattedDate(detailData.obj.created_at) }}</span>
              </div>
              <div class="miniline"></div>
              <div>
                <t-icon name="browse" /><span>
                  {{ detailData.obj.visit_count }}</span
                >
              </div>
              <div class="miniline"></div>
              <div>
                <t-icon name="thumb-up" /><span>{{
                  detailData.obj.like_count
                }}</span>
              </div>
              <div class="miniline"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="body_left">
          <div class="article_covers">
            <img
              class="item"
              v-for="(cover, index) in detailData.obj.articles"
              :key="index"
              :src="domain + cover.path"
            />
          </div>
          <div
            class="course_title"
            v-if="detailData.obj.file && detailData.obj.file.length !== 0"
          >
            创作过程：参考文件，工程文件截图
          </div>
          <div class="article_course">
            <img
              class="item"
              v-for="(img, index) in detailData.obj.file"
              :key="index"
              :src="domain + img.path"
            />
          </div>
        </div>
        <div class="body_right">
          <div class="right_item">作品名称</div>
          <div class="right_item">{{ detailData.obj.title }}</div>
          <div class="right_item">参赛命题</div>
          <div class="right_item">
            {{ detailData.obj.project && detailData.obj.project.title }}
          </div>
          <div class="right_item">所用AI平台</div>
          <div class="right_item">
            {{ detailData.obj.ai_json && detailData.obj.ai_json.title }}
          </div>
          <div class="right_item">生成关键词描述</div>
          <div class="right_item">{{ detailData.obj.description }}</div>
          <div class="right_item">创作过程描述：其他输入和控制手段</div>
          <div class="right_item">
            {{ detailData.obj.process }}
          </div>
        </div>
      </div>
      <div class="operate_box">
        <t-button
          variant="outline"
          v-if="detailData.obj.online_status === 2"
          @click="
            setArticleStatus({
              article_id: articleId,
              online_status: 1
            })
          "
          >上架</t-button
        >
        <t-button
          variant="outline"
          v-if="detailData.obj.online_status === 1"
          @click="
            setArticleStatus({
              article_id: articleId,
              online_status: 2
            })
          "
          >下架</t-button
        >
        <t-button @click="dodelete(articleId)" variant="outline">删除</t-button>
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
const domain = 'https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/'
const articleId = route.query.id
// 详情
const detailData = reactive({ obj: {} })
const getDetail = () => {
  store.dispatch('articleDetail', { article_id: articleId }).then(res => {
    detailData.obj = res
  })
}
// 设置命题状态
function setArticleStatus (params) {
  store.dispatch('setArticleStatus', params).then(res => {
    MessagePlugin.success('操作成功')
    getDetail()
  })
}
// 删除
function dodelete (id) {
  const confirmDia = DialogPlugin.confirm({
    header: '确定删除此作品吗？',
    body: '删除后不可恢复',
    theme: 'warning',
    onConfirm: () => {
      store.dispatch('delArticle', { ids: [id] }).then(res => {
        MessagePlugin.success('删除成功')
        router.push('/article')
      })
      confirmDia.destroy()
    },
    onClose: () => {
      confirmDia.hide()
    }
  })
}
const formattedDate = (dateStr) => {
  const date = new Date(dateStr)
  const newDateStr = date.toLocaleDateString('zh-Hans-CN', { year: 'numeric', month: 'numeric', day: 'numeric' })
    .replace(/\//g, '.')
  return newDateStr
}
onMounted(() => {
  getDetail()
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
