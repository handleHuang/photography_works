<template>
    <div class="teaching">


        <div class="max-content">
            <div class="item">
                <div class="list" v-for="(itemData, index) in item">
                    <img class="img_2" :src="itemData.corver">
                    <!-- <div class="img_2" :style="{background: `url(${itemData.corver})`}"></div> -->
                    <div class="typeface">

                        <div>
                            {{ itemData.title }}
                        </div>
                        <div class="introduce" style="margin-top: 10px;">简介：{{ itemData.introduce }}</div>
                        <div style="margin-top: 10px;">时间：{{ itemData.time }}</div>
                        <div class="bot" @click="handlelist(itemData.url)" style="margin-top: 10px;">前去学习</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
const item = ref([
    {
        title: '摄影菜鸟入门教程',
        corver: '/src/assets/img/teaching/1.webp',
        time: '2024/2/5 20:40',
        url: 'https://www.bilibili.com/video/BV1MU4y1V7uW/?vd_source=18ad8a2788e09446f54cd6eea757e65b',
        introduce: '从零开始学摄影 29节摄影课带你从入门到精通',
    },
    {
        title: '摄影构图技巧',
        corver: '/src/assets/img/teaching/2.jpeg',
        time: '2024/2/5 20:40',
        url: 'https://www.bilibili.com/video/BV1V94y1d7tv/',
        introduce: '摄影构图技巧大全，22节中国传媒大学摄影新手入门宝藏级教程，让你摄影技术提升5个档次',
    },
    {
        title: '【后期+构图+技巧】教程全方位讲解',
        corver: '/src/assets/img/teaching/3.jpeg',
        time: '2024/2/5 20:40',
        url: 'https://www.bilibili.com/video/BV1rB4y1y7Kd/?spm_id_from=333.337.search-card.all.click&vd_source=18ad8a2788e09446f54cd6eea757e65b',
        introduce: '学摄影！手机也够【后期+构图+技巧】教程全方位讲解',
    },
    {
        title: '想学摄影，点进来吧',
        corver: '/src/assets/img/teaching/4.jpeg',
        time: '2024/2/5 20:40',
        url: 'https://www.bilibili.com/video/BV1nt411R7r3/?spm_id_from=333.337.search-card.all.click&vd_source=18ad8a2788e09446f54cd6eea757e65b',
        introduce: '从最最基础的东西出发，一步一步带你了解摄影基础知识～',
    },
    {
        title: '“光才是一切氛围感的源头”｜【摄影审美】｜摄影师Masha Raymers',
        corver: '/src/assets/img/teaching/5.jpeg',
        time: '2024/2/5 20:40',
        url: 'https://www.bilibili.com/video/BV1Pp4y1f7A1/?spm_id_from=333.337.search-card.all.click',
        introduce: '摄影师｜Masha Raymers 人像作品欣赏 希望大家喜欢～',
    },
    {
        title: '单反视频拍摄技巧',
        corver: '/src/assets/img/teaching/6.jpeg',
        time: '2024/2/5 20:40',
        url: 'https://wkt.fengniao.com/detail_10.html',
        introduce: '视频拍摄的新世界才逐渐打开，今天韩冬老师就教一教大家如何使用单反相机拍摄视频。',
    },
    {
        title: '摄影器材测评',
        corver: '/src/assets/img/teaching/7.jpg',
        time: '2024/2/5 20:40',
        url: 'https://wkt.fengniao.com/detail_184.html',
        introduce: '主张冷静选购器材 从心出发学摄影',
    },
])

const handlelist = (url: any) => {
    window.open(url, '_blank');
}
</script>
  
<style lang="less" scoped src="../../assets/css/teaching.less"></style>
  