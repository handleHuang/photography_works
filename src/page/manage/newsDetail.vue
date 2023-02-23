<template>
    <div class="newsDetail">
      <t-button theme="default"  variant="base" @click="goBack">返回上一级</t-button>
        <div class="title">{{ newsDetailData.value&& newsDetailData.value.title }}</div>
        <div class="info">
            <div class="published_at">{{ newsDetailData.value&&newsDetailData.value.published_at&& newsDetailData.value.published_at.substr(0,10) }}</div>
            <!-- <div class="published_at">{{newsDetailData.value.published_at }}</div> -->
            <div class="from_at">腾讯RoboticsX实验室</div>
        </div>
        <div class="content" v-html="newsDetailData.value&& newsDetailData.value.content">
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const route = useRoute()
const newsDetailData = reactive({})
onMounted(() => {
  if (route.query.id) {
    store.dispatch('newsDetail', { id: route.query.id, is_draft: route.query.is_draft }).then(res => {
      console.log(res)
      newsDetailData.value = res
    })
  } else {
    newsDetailData.value = JSON.parse(localStorage.getItem('tempNewsDetailInfo'))
    console.log(newsDetailData.value.published_at)
  }
})
const goBack = () => {
  router.back()
}
</script>
<style lang="less" scoped src="../../assets/style/manage/newsDetail.less"></style>
