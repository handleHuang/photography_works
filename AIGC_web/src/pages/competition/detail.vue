<template>
    <div class="competition_detail">
        <div class="detail_neat" style="max-width: 1024px;margin: 0 auto;">
            <div class="container-middle">
                <div class="col-lg-10">
                    <h5 class="title title--20 title--gray">
                        {{ createdData(detailData.create_time) }}</h5>
                    <div class="generic-page__content">
                        <div class="text-widget">
                            <h1>{{ detailData.title }}</h1>
                            <a class="title_tips" @click="handleCheck()">查看查赛作品></a>
                        </div>
                        <div class="teaser-widget">
                            <img :src='detailData.cover' class="teaser-widget__image js-img-with-txt js-bg-color-el" />
                        </div>

                        <div class="text-widget" v-html="detailData.cont">
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-middle">
                <div class="offset-lg-1 col-lg-10">
                    <div class="generic-page__content">

                        <div class="text-widget">
                            <div>
                                <h3>Prizes</h3>
                                <div v-html="detailData.cont2">
                                </div>
                            </div>
                            <!-- <div>
                                <ul>
                                    <li>Included in our annual traveling exhibition seen by over 4 million visitors,
                                        shown around the world in over 80 cities </li>
                                    <li>Published on our website and social platforms with over 2 million followers
                                    </li>
                                    <li>Included in our yearbook</li>
                                </ul>
                            </div>
                            <div>They will also receive: </div>
                            <div>
                                <ul>
                                    <li>€1,000 for each of the 24 regional winners and an additional €5,000 for the
                                        four global winners</li>
                                    <li>An invitation to the Winners’ Program in Amsterdam </li>
                                    <li>A physical award<br></li>
                                    <li>For the four global winners: a FUJIFILM GFX100 II camera, with two lenses of
                                        choice, two Li-ion batteries, and dual battery charger<br></li>
                                </ul>
                                <p><a href="/contest/2024/prizes">Find out more about prizes.&nbsp;</a></p>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <t-dialog :visible.sync="visibleShow" @close="handleClose" @confirm="handleConfirm">
            <div class="pup_item">
                <div class="pup_list">
                    <div class="label">主题</div>
                    <div class="content"><t-input v-model="formData.title" placeholder="请输入主题" /></div>
                </div>
                <div class="pup_list">
                    <div class="label">作者</div>
                    <div class="content"><t-input v-model="formData.name" placeholder="请输入作者名字" /></div>
                </div>
                <div class="pup_list">
                    <div class="label">作品</div>
                    <div class="content">
                        <t-upload ref="uploadRef1" v-model="file1" action="http://127.0.0.1:12134/api/uploadimg"
                            theme="image" tips="图片不能超出2m" accept="image/*" :auto-upload="true"
                            :size-limit="{ size: 2, unit: 'MB' }" :max="1" :abridge-name="[6, 6]" :locale="{
                                triggerUploadText: {
                                    image: '请选择图片',
                                },
                            }" @fail="handleFail1" @Change="changeUpdata1">
                        </t-upload>
                    </div>
                </div>
                <div class="pup_list">
                    <div class="label">描述</div>
                    <div class="content"><t-input v-model="formData.cont" placeholder="请输入描述" /></div>
                </div>
            </div>
        </t-dialog>

        <div class="detail_foot">
            <div class="notice_btn" @click="handleUpdata">立即参加</div>
        </div>
    </div>
</template>
    
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { getCompetitionDetail, postCompList } from "../../models/competition";
import { useRouter, useRoute } from "vue-router";
import MessagePlugin from "tdesign-vue-next/es/message/plugin";
const router = useRouter();
const route = useRoute();

const formData: any = reactive({
    item_id: route.query.id,
    title: '',
    name: '',
    cont: '',
})

const detailData: any = ref({})
const getDetail = () => {
    let param: any = {
        id: route.query.id
    };
    getCompetitionDetail(param)
        .then((res: any) => {
            detailData.value = res
        })
        .catch((error: any) => {
            console.log("获取失败！");
        });
};

const visibleShow = ref(false)
const handleUpdata = () => {
    visibleShow.value = true;
}

const handleClose = () => {
    visibleShow.value = false;
}

const handleConfirm = () => {
    postCompList(formData).then((res) => {
        formData.title = ''
        formData.name = ''
        formData.cont = ''
        MessagePlugin.success('报名成功');
        visibleShow.value = false;
    })
}

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

const file1: any = ref([]);
const handleFail1 = (file: any) => {
    MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const changeUpdata1 = (item: any) => {
    formData.cover = item[0].url;
};

const handleCheck = () => {
    router.push({
        name: "competition_list",
        query: { id: route.query.id },
    });
}

onMounted(() => {
    getDetail()
})
</script>
    
<style lang="less" scoped src="../../assets/css/competition.less"></style>
    