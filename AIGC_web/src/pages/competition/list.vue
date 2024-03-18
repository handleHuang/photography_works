<template>
    <div class="competition_list">
        <div class="const">
            <h1 class="rich_media_title">{{ listData.title }} | 记录全新视界，精彩人生无限</h1>
            <div class="rich_media_meta_list"> {{ createdData(listData.create_time) }} 广东</div>
            <div class="rich_media_cover"></div>
            <div class="somid_title">关于摄影大赛</div>
            <div class="dateil">{{ listData.cont }}</div>
            <div class="dateil">{{ listData.cont2 }}</div>
            <div class="somid_title somid_title1">本组参赛作品</div>
            <div class="works_item">
                <div class="works_list" v-for="(item, index) in listData.item_list" :key="index">
                    <div class="works_list_title">
                        <div class="left">关于{{ listData.title }}</div>
                        <div class="right">NO.{{index + 1}}</div>
                    </div>
                    <img :src="item.cover" class="works_pic" />
                    <div class="works_box">
                        <div class="works_box_list flex">
                            <div class="works_box_list_left">主题/Title</div>
                            <div class="works_box_list_right">{{ item.title }}</div>
                        </div>
                        <div class="works_box_list flex">
                            <div class="works_box_list_left">
                                作者/Author
                            </div>
                            <div class="works_box_list_right">{{ item.name }}</div>
                        </div>
                        <div class="works_box_list">
                            <div class="works_box_list_left">
                                描述/Introduction
                            </div>
                            <div style="margin-top: 10px;" class="works_box_list_right">{{ item.cont }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getCompetitionDetail, } from "../../models/competition";
import { useRoute } from "vue-router";
const route = useRoute();

const listData: any = ref({})
const getDetail = () => {
    let param: any = {
        id: route.query.id
    };
    getCompetitionDetail(param)
        .then((res: any) => {
            listData.value = res
        })
        .catch((error: any) => {
            console.log("获取失败！");
        });
};

function createdData(value: any) {
    // var dateTime = value.toString().replace(/\-/g, '/')
    var date = new Date(value);
    var y = date.getFullYear();
    var m: any = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d: any = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h: any = date.getHours();
    h = h < 10 ? "0" + h : h;
    return y + "-" + m + "-" + d;
}


onMounted(() => {
    getDetail()
})
</script>
    
<style lang="less" scoped src="../../assets/css/competition.less"></style>
    