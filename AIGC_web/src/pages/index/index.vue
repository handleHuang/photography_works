<template>
  <div class="index">
    <!-- <div class="flex_left">
      <div class="flex_left_list" @click="handleFlex(index)" v-for="(item, index) in leftList">{{ item }}</div>
    </div> -->
    <div class="banner max-content">
      <!-- <div class="banner_title">AIGC</div>
      <div class="banner_list">绘图大赛</div>
      <div class="banner_text">设计源自思维，智能超越想象</div>
      <div class="banner_tips">Design in AI beyond</div>
      <div class="banner_date"><span>征集时间：</span> 06.01-06.30</div> -->
      <div class="banner_pic_wrap">
        <div class="banner_pic"></div>
      </div>
      <div class="banner_href_box">
        <a href="http://localhost:8016/#/workList" target="_blank" class="banner_href href1">一期作品查看>></a>
        <a href="#" class="banner_href href2">二期游戏主题征集赛 即将开始，敬请期待</a>
      </div>
      <!-- <div class="banner_btn_box">
        <div class="banner_btn active" @click="handleUpdata">立即参加</div>
        <div class="banner_btn" @click="handleWorks">全部作品</div>
      </div> -->
    </div>
    <!-- <img
      class="banner_logo"
      src="../../assets/img/index/banner_logo2.png"
      alt=""
    /> -->
    <div class="banner_bg_wrap">
      <div class="banner_bg"></div>
    </div>
    <div class="banner_bg-1"></div>
    <div class="banner_bg-2" :class="{ newTop: introduceData.length === 0 }"></div>
    <div class="purpose max-content">
      <div class="purpose_title flex_title">
        <div class="title_pic ball-1"></div>
        活动介绍
      </div>
      <div class="purpose_text">
        我们无法猜透下一秒会是怎么样，我觉得现实美好就美好在这里，人们无法规划现实，所以现实永远会带给人惊喜。最好要一心一意去捕捉感受，要体味的愿望越强烈，捕捉的力度也就越大，等事后再让想象力将当时的醉意照搬过来，以便描述。
      </div>
    </div>
    <div class="introduce max-content" v-if="introduceData.length !== 0">
      <div class="introduce_title flex_title">
        <div class="title_pic ball-2"></div>
        分类预览
      </div>
      <!-- <div class="introduce_text">
        本次大赛提供{{
          introduceData.length
        }}个大赛分类，鼓励参赛者通过关键词、图象等方式进行AI绘图创意设计。
      </div> -->
      <div class="introduce_item">
        <div class="introduce_list" v-for="(item, index) in introduceData">
          <div class="introduce_list_title">
            <span>{{ index < 10 ? "0" + (index + 1) : index + 1 }}</span>
                {{ item.title }}
          </div>
          <div class="introduce_list_box">
            <img class="introduce_list_pic" :src="item.cover" />
            <div class="introduce_list_text">{{ item.cont }}</div>
            <div class="introduce_list_btn" @click="handleUpdata">立即参加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="notice max-content">
      <div class="notice_title flex_title">
        <div class="title_pic ball-3"></div>
        参赛须知
      </div>
      <div class="notice_item">
        <div class="notice_list">
          <div class="notice_list_title">作品要求</div>
          <div class="notice_list_text">1、每位参赛者最多可提交1张作品。</div>
          <div class="notice_list_text">2、与主题契合度：作品是否与活动主题相关。
            创意与表现力：作品的创意和表现力。</div>
          <div class="notice_list_text">
            3、技术水平：作品的摄影技术和后期处理水平。
            故事性与感染力：作品背后的故事性和感染力。<br />
            参赛作品必须为原创作品，不得抄袭、盗用他人作品。
          </div>
          <div class="notice_list_text">
            4、参赛者需保证作品的版权归属，并同意活动主办方在活动宣传和展示中使用作品。
          </div>
          <div class="notice_list_text">
            5、活动主办方有权对参赛作品进行展示、宣传和出版等。
          </div>
          <div class="notice_list_text">
            6、如有违规行为，主办方有权取消参赛资格并追究责任。
          </div>
        </div>
        <div class="notice_list">
          <div class="notice_list_title">奖项</div>
          <ui>
            <li class="notice_list_text">最受关注奖：前20名</li>
            <li class="notice_list_text">最具潜力奖：20-50名</li>
            <li class="notice_list_text">激励：荣誉证书</li>
          </ui>
          <div class="notice_list_picItem">
            <div class="notice_list_pic_list pic-4"></div>
            <div class="notice_list_pic_list pic-3"></div>
            <div class="notice_list_pic_list pic-2"></div>
            <div class="notice_list_pic_list pic-1"></div>
          </div>
        </div>
        <div class="notice_list">
          <div class="notice_list_title">活动说明</div>
          <div class="notice_list_text">
            1.参赛作品，应以正向、积极的内容为导向，严禁包含但不限于低俗、色情、违反宗教活动的内容。
          </div>
          <div class="notice_list_text">
            2.参赛作品所涉及的著作权（包含但不限于知识产权、版权）不得侵犯第三人的合法权利。
          </div>
          <div class="notice_list_text">3.参赛作品不得作为商业用途。</div>
        </div>
        <!-- <div class="notice_qdcode">
          <div class="qdcode"></div>
          <div class="qdcode_text">
            企业微信群：<br />
            AIGC创意绘图交流<br />

            <div class="qdcode_span">咨询/合作请联系企微：janeren<br /></div>
          </div>
        </div> -->
        <div class="notice_btn" @click="handleUpdata">立即上传作品</div>
        <!-- <div class="notice_list">
          <div class="notice_list_title">赛程安排</div>
          <div class="notice_list_pic arrange"></div>
        </div>
        <div class="notice_list">
          <div class="notice_list_title">评审</div>
          <div class="notice_list_pic review"></div>
        </div> -->
      </div>
    </div>
    <!-- <div class="awards max-content">
      <div class="awards_title flex_title">奖项设置</div>
      <div class="awards_pic"></div>
      <div class="awards_btn">立即参加</div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "tdesign-icons-vue-next";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getProjectsList, getRandom } from "../../models/index";
import { introduce } from "./index";
const router = useRouter();
let cosUrl = ref("https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/");

let introduceData = ref<introduce[]>([]);
const getWorkListData = () => {
  let param: any = {
    online_status: 1,
  };
  getProjectsList(param)
    .then((res: any) => {
      introduceData.value = res.data;
    })
    .catch((error: any) => {
      console.log("获取失败！");
    });

  getRandom()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("获取失败！");
    });
};

const screenHeight = window.screen.height;
const scrollTopData: any[] = [];
const handleFlex = (index: number) => {
  window.scrollTo({
    top: scrollTopData[index] - screenHeight / 2 + 62,
    behavior: "smooth",
  });
};
const handleUpdata = () => {
  router.push({ path: "/updata" });
};
const handleWorks = () => {
  router.push({ path: "/workList" });
};
onMounted(() => {
  getWorkListData();
  // var flexData: any = document.querySelectorAll(".flex_title");
  // for (let i = 0; i < flexData.length; i++) {
  //   scrollTopData.push(flexData[i].offsetTop);
  // }
});

const leftList = reactive(["大赛宗旨", "分类介绍", "参赛须知", "奖项设置"]);

const introduceIndex = ref(0);
function handleIntroduce(index: number) {
  introduceIndex.value = index;
}
</script>

<style lang="less" scoped src="../../assets/css/index.less"></style>
