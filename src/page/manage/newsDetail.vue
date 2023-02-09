<template>
    <div class="newsDetail">
        <div class="title">{{ newsDetailData.value&& newsDetailData.value.title }}</div>
        <div class="info">
            <div class="published_at">{{ newsDetailData.value&& newsDetailData.value.published_at.substr(0,10) }}</div>
            <div class="from_at">腾讯RoboticsX实验室</div>
        </div>
        <div class="content" v-html="newsDetailData.value&& newsDetailData.value.content">
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const route = useRoute()
const newsDetailData = reactive({})
onMounted(() => {
  console.log(route.query.id)
  if (route.query.id) {
    store.dispatch('newsDetail', route.query.id).then(res => {
      console.log(res)
      newsDetailData.value = res
    })
  }
})
</script>
<style lang="less" scoped src="../../assets/style/manage/newsDetail.less"></style>
