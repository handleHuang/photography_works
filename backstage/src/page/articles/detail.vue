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
            <span class="title">{{ detailData.obj.user_name }}</span>
            <span :class="`status showStatus${detailData.obj.state}`">{{
              detailData.obj.state == 2 ? "未发布" : "已发布"
            }}</span>
          </div>
          <div class="article_baseInfo">
            <div
              class="avatar_box"
              v-if="detailData.obj.user && detailData.obj.user.avatar"
            >
              <img class="avatar" :src="detailData.obj.user.avatar" />
              <span class="author_name">{{ detailData.obj.user.name }}</span>
            </div>
            <div class="flow">
              <div>
                <span>{{ formattedDate(detailData.obj.created_at) }}</span>
              </div>
              <div class="miniline"></div>
              <div>
                <t-icon name="star" /><span>{{
                  detailData.obj.collect_number
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
            <div v-for="(cover, index) in detailData.obj.cover" :key="index">
              <img class="item" :key="index" :src="cover" />
            </div>
          </div>
          <div class="course_title" v-if="detailData.obj.beiyong1">
            创作过程：参考文件，工程文件截图
          </div>
          <div class="article_course">
            <div v-for="(cover, index) in detailData.obj.beiyong1" :key="index">
              <img class="item" :key="index" :src="cover" />
            </div>
          </div>
        </div>
        <div class="body_right">
          <div class="right_item">作品名称</div>
          <div class="right_item">{{ detailData.obj.title }}</div>
          <div class="right_item">参赛命题</div>
          <div class="right_item">
            {{ detailData.obj.topic }}
          </div>
          <div class="right_item">生成关键词描述</div>
          <div class="right_item">{{ detailData.obj.cont }}</div>
          <div class="right_item">创作过程描述：其他输入和控制手段</div>
          <div class="right_item">
            {{ detailData.obj.beiyong1 }}
          </div>
        </div>
      </div>
      <div class="operate_box">
        <t-button
          variant="outline"
          v-if="detailData.obj.state === 2"
          @click="
            setArticleStatus({
              id: +articleId,
              state: 1,
            })
          "
          >上架</t-button
        >
        <t-button
          variant="outline"
          v-if="detailData.obj.state === 1"
          @click="
            setArticleStatus({
              id: +articleId,
              state: 2,
            })
          "
          >下架</t-button
        >
        <t-button @click="dodelete(articleId)" variant="outline">删除</t-button>
        <t-button @click="handleCollect(articleId)" theme="primary">{{
          detailData.obj.collect === 0 ? "收藏" : "取消收藏"
        }}</t-button>
      </div>
    </div>
    <div class="pupop" v-if="videoShow">
      <div class="pupop_bg" @click="handleVideoShow"></div>
      <div class="pupop_box">
        <video class="right_pic" :src="videoUrl" autoplay loop controls />
      </div>
    </div>
  </div>
</template>
<script setup>
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()
// const domain = 'https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/'
const userId = JSON.parse(localStorage.getItem('user_info')).id
const articleId = route.query.id
// 详情
const detailData = reactive({ obj: {} })
const getDetail = () => {
  store.dispatch('articleDetail', { id: articleId, user_id: userId }).then((res) => {
    detailData.obj = res
  })
}
// 设置作品状态
function setArticleStatus (params) {
  store.dispatch('setArticleStatus', params).then((res) => {
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
      store.dispatch('delArticle', { id: id }).then((res) => {
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
  const newDateStr = date
    .toLocaleDateString('zh-Hans-CN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
    .replace(/\//g, '.')
  return newDateStr
}
const videoUrl = ref('')
const videoShow = ref(false)
const handleVideoShow = () => {
  videoShow.value = false
}

// 收藏
const handleCollect = (id) => {
  store
    .dispatch('postCollect', {
      user_id: userId,
      item_id: +id
    })
    .then((res) => {
      console.log(res)
      getDetail()
      MessagePlugin.success(res.message)
    })
    .catch((err) => {
      MessagePlugin.warning(err.response.data.message)
    })
}
// const handleVideo = (url) => {
//   videoUrl.value = url
//   videoShow.value = true
// }
onMounted(() => {
  getDetail()
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
