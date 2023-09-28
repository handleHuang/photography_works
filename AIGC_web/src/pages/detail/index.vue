<template>
  <div class="detail">
    <div class="detail_box">
      <div class="detail_box_top">
        <div class="detail_top_wrap">
          <div class="left">
            <div class="detail_box_title">{{ detailsData.title }}</div>
            <div class="detail_label_item">
              <div class="header_box">
                <!-- <div class="header_pic"></div> -->
                <img src="../../assets/img/index/user.jpeg" class="header_pic" v-show="!detailsData.user?.avatar" />
                <img :src="detailsData.user?.avatar" class="header_pic" v-show="detailsData.user?.avatar" />
                {{ detailsData.username ? detailsData.username : detailsData.user?.name }}
              </div>
              <div class="label_list">
                {{ createdData(detailsData.created_at) }}
              </div>
              <div class="label_list"><icon name="browse" style="color: rgba(16, 28, 41, 0.6)" />{{ detailsData.visit_count }}</div>
              <div class="label_list"><icon name="thumb-up" style="color: rgba(16, 28, 41, 0.6)" />{{ detailsData.like_count }}</div>
            </div>
          </div>
          <div class="wrap_btn_box">
            <div class="wrap_btn" :class="{ active: detailsData.liked }" @click="handleBtn">
              <icon name="thumb-up" style="color: #ffffff" v-show="!detailsData.liked" />
              <div class="wrap_btn_icon" v-show="detailsData.liked"></div>
              {{ detailsData.liked ? "已点赞" : "点赞" }}
            </div>
            <div class="antistop" @click="handleAntistop">生成关键词</div>
          </div>
        </div>
        <div class="top_item">
          <div class="top_list" v-show="detailsData.project?.title">
            <div class="top_list_title">参赛命题</div>
            <div class="top_list_text">{{ detailsData.project?.title }}</div>
          </div>
          <div class="top_list">
            <div class="top_list_title">所用AI平台</div>
            <div class="top_list_text">
              {{ detailsData.ai_json?.title }}<span v-show="detailsData.ai_json?.content"> - {{ detailsData.ai_json?.content }}</span>
            </div>
          </div>
          <!-- <div class="top_list">
            <div class="top_list_title">标签</div>
            <div class="top_list_label">
              <div class="label_list">长城</div>
              <div class="label_list">长城</div>
              <div class="label_list">长城</div>
              <div class="label_list">长城</div>
              <div class="label_list">长城</div>
              <div class="label_list">长城</div>
              <div class="label_list">长城</div>
              <div class="label_list">长城</div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="detail_wrap">
        <div class="detail_wrap_left">
          <div class="video_item">
            <div class="video_list" v-for="(item, index) in detailsData.articles" :key="index">
              <img :src="item.url" class="right_pic" @click="handlePicList('articles', index)" v-show="item.mine.indexOf('image') !== -1" />
              <div @click="handlePicList('video', index)" style="width: 100%; height: 100%" v-show="item.mine.indexOf('video') !== -1">
                <video class="right_pic" :src="item.url" :controls="controls" />
                <div class="video_btn"></div>
              </div>
            </div>
          </div>
          <div v-if="detailsData.file?.length !== 0">
            <div class="left_text">创作过程：参考文件，工程文件截图</div>
            <div class="right_pic_item">
              <div class="video_list" v-for="(item, index) in detailsData.file" :key="index">
                <img :src="item.url" class="right_pic" @click="handlePicList('file', index + detailsData.articles.length)" v-show="item.mine.indexOf('image') !== -1" />
                <div @click="handlePicList('video', index + detailsData.articles.length)" style="width: 100%; height: 100%" v-show="item.mine.indexOf('video') !== -1">
                  <video class="right_pic" :src="item.url" :controls="controls" />
                  <div class="video_btn"></div>
                </div>
              </div>
            </div>
          </div>
            <div class="btns">
              <span @click="otherClick(otherData.first.id)" v-if="otherData?.first">上一篇:{{ otherData.first?.title }}</span>
              <span @click="otherClick(otherData.next.id)" v-if="otherData?.next">下一篇:{{ otherData.next?.title }}</span>
            </div>
        </div>
        <div class="detail_wrap_right">
          <div class="wrap_list" v-if="detailsData.project?.title">
            <div class="list_title">参赛命题</div>
            <div class="list_text">{{ detailsData.project?.title }}</div>
          </div>
          <div class="wrap_list" v-if="detailsData.ai_json">
            <div class="list_title">所用AI平台</div>
            <div class="list_text">
              {{ detailsData.ai_json?.title }}<span v-show="detailsData.ai_json?.content"> - {{ detailsData.ai_json?.content }}</span>
            </div>
          </div>
          <div class="wrap_list">
            <div class="list_title">生成关键描述</div>
            <div class="list_text">{{ detailsData.description }}</div>
          </div>
          <div class="wrap_list" v-if="detailsData.process">
            <div class="list_title">创作过程描述：其他输入和控制手段</div>
            <div class="list_text">{{ detailsData.process }}</div>
          </div>
        </div>
      </div>
    </div>
    <t-image-viewer :key="viewerIndex" v-model:visible="visible" :defaultIndex="viewerIndex" :images="imageViewerData"> </t-image-viewer>
    <div class="antistop_pup" v-if="antistopShow">
      <div class="antistop_pup_bg"></div>
      <div class="antistop_pup_box">
        <icon name="close" style="color: #000" @click="handleAntistop" />
        <div class="antistop_pup_list">
          <div class="antistop_pup_title">生成关键词描述</div>
          <div class="antistop_pup_text">{{ detailsData.description }}</div>
        </div>
        <div class="antistop_pup_list" v-if="detailsData.process">
          <div class="antistop_pup_title">创作过程描述：其他输入和控制手段</div>
          <div class="antistop_pup_text">
            {{ detailsData.process }}
          </div>
        </div>
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

<script lang="ts" setup>
import { reactive, ref, nextTick, onMounted } from "vue";
import { Icon } from "tdesign-icons-vue-next";
import { useRoute,useRouter } from "vue-router";
import { MessagePlugin } from "tdesign-vue-next";
import { getArticlesDetail, postlike } from "../../models/detail";
const route = useRoute();
const router = useRouter();
const userId: any = ref(route.query.id);
const domain = "https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/";
const detailsData: any = ref({});
const otherData: any = ref({});
const imageViewerData: any = ref([]);
const visible = ref(false);
let viewerIndex: any = ref(0);
let newPic: any = ref([]); // 合并数组
router.beforeEach((to, from, next) => {
  console.log(to,from);
  to.meta={
    page:route.query.page,
    pageSize:route.query.pageSize
  }
      console.log('浏览器回退事件触发');
      // 执行你想要的逻辑操作
      next();
    });
// 弹窗
const videoUrl = ref("");
const videoShow = ref(false);
let innerWidth = window.innerWidth;
const controls = ref(false);
const handleDetails = () => {
  getArticlesDetail(userId.value)
    .then((res: any) => {
      detailsData.value = res.article;
      otherData.value = {first:res.first,next:res.next};
      newPic.value = res.articles?.articles.concat(res.file);
      for (let i = 0; i < newPic.value?.length; i++) {
        if (newPic.value[i].mine.indexOf("image") !== -1) {
          imageViewerData.value.push(newPic.value[i].url);
        }
      }
      if (innerWidth <= 750) {
        controls.value = true;
      }
    })
    .catch((error: any) => {
      console.log(error,"获取失败！");
    });
};

const otherClick = (id:any)=>{
  console.log(id);
  userId.value = id
  router.push({
    name: 'detail',
    query: {id: id }
  })
  handleDetails()
}

const handlePicList = (type: any, index: any) => {
  if (type === "articles" || type === "file") {
    for (let i = 0; i < newPic.value.length; i++) {
      for (let j = 0; j < imageViewerData.value.length; j++) {
        if (newPic.value[index].url === imageViewerData.value[j]) {
          viewerIndex.value = j;
          visible.value = true;
          return false;
        }
      }
    }
  }
  if (innerWidth <= 750) {
  } else {
    if (type === "video") {
      videoUrl.value = newPic.value[index].url;
      videoShow.value = true;
    }
  }
};

const handleVideoShow = () => {
  videoShow.value = false;
};

const handleBtn = () => {
  let params: any = {
    likeable_id: userId.value,
    likeable_type: "articles",
  };
  postlike(params)
    .then((res: any) => {
      // console.log(res);
      handleDetails();
      MessagePlugin.success(`${res.message}`);
    })
    .catch((error: any) => {
      console.log("获取失败！");
    });
};

//弹窗
const antistopShow = ref(false);
const handleAntistop = () => {
  antistopShow.value = !antistopShow.value;
};

onMounted(() => {
  handleDetails();
});

function createdData(value: any) {
  if (value) {
    var dateTime = value.toString().replace(/\-/g, "/");
    var date = new Date(dateTime);
    var y = date.getFullYear();
    var m: any = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d: any = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h: any = date.getHours();
    h = h < 10 ? "0" + h : h;
    return y + "." + m + "." + d;
  }
}

</script>

<style lang="less" scoped src="../../assets/css/detail.less"></style>
