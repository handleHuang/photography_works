<template>
    <div class="teaching">


        <div class="max-content">
            <div class="item">
                <div class="list" v-for="(itemData, index) in item">
                    <!-- <img class="img_2" src="../../assets/img/teaching/111.jpg"> -->
                    <!-- <img class="img_2" v-bind:src="itemData.corver" /> -->
                    <img class="img_2" :src="itemData.corver">
                    <div class="typeface">

                        <div>
                            {{ itemData.title }}
                        </div>
                        <div class="introduce">简介：{{ itemData.introduce }}</div>
                        <div>时间：{{ itemData.time }}</div>
                        <div class="bot" @click="handlelist(itemData.url)">前去学习</div>
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
        title: '  夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清',
        corver: '/src/assets/img/teaching/111.jpg',
        time: '2024/2/5 20:40',
        url: 'https://www.bilibili.com/video/BV1me41167Nj/?spm_id_from=333.1007.tianma.1-1-1.click',
        introduce: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    },
    {
        title: '  夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清',
        corver: '/src/assets/img/teaching/2.jpg',
        time: '2024/2/5 20:40',
        url: 'https://www.runoob.com/cssref/css3-pr-text-shadow.html',
        introduce: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    },
    {
        title: '  夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清',
        corver: '/src/assets/img/teaching/111.jpg',
        time: '2024/2/5 20:40',
        url: 'https://www.bilibili.com/video/BV1me41167Nj/?spm_id_from=333.1007.tianma.1-1-1.click',
        introduce: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    },
    {
        title: '  夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清夜空中最亮的星能否听清',
        corver: '/src/assets/img/teaching/2.jpg',
        time: '2024/2/5 20:40',
        url: 'https://www.runoob.com/cssref/css3-pr-text-shadow.html',
        introduce: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    },
])

const handlelist = (url) => {
    window.open(url, '_blank');
}
</script>
  
<style lang="less" scoped src="../../assets/css/teaching.less"></style>
  