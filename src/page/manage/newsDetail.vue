<template>
    <div class="newsDetail">
        <div class="title">利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习</div>
        <div class="info">
            <div class="published_at">2020/09/10</div>
            <div class="from_at">腾讯RoboticsX实验室</div>
        </div>
        <!-- <div class="desc">8 月 8 日，腾讯 Robotics X 机器人实验室发布多模态四足移动机器人 Max 二代技术演示视频（以下简称 Max）。Max 能够在梅花桩上完成旋转踏步、单桩跳跃、双轮站立等高难度动作。同时，过桩速度达到「前辈」Jamoca 的 4 倍。</div> -->
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
