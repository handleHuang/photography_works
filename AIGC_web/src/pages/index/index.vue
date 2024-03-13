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
        <a
          href="https://aidesign.woa.com/aigc/#/workList"
          target="_blank"
          class="banner_href href1"
          >一期作品查看>></a
        >
        <a href="#" class="banner_href href2"
          >二期游戏主题征集赛 即将开始，敬请期待</a
        >
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
    <div
      class="banner_bg-2"
      :class="{ newTop: introduceData.length === 0 }"
    ></div>
    <div class="purpose max-content">
      <div class="purpose_title flex_title">
        <div class="title_pic ball-1"></div>
        活动介绍
      </div>
      <div class="purpose_text">
        随着人工智能技术的迅猛进步，互联网科技也经历了飞速的演变，智能设计与智能绘图成为了当前科技领域的焦点议题。为了激发人们对人工智能技术的热忱，积极投身AI创作，并提升AI运用技巧与创新水平，举办了一场针对全体员工的AI绘图大赛。本次大赛由设计技术委员会、AI实验室及AIDesignOteam联合主办，作为一场面向企业全体员工的AI绘图作品收集活动。大赛旨在激励大家发挥才能，在竞赛中互相合作与学习，共同提升。让我们拥抱变革，迎接AI浪潮，共同探寻AI之旅，并通过智能技术创造更多的可能性。
      </div>
    </div>
    <div class="introduce max-content" v-if="introduceData.length !== 0">
      <div class="introduce_title flex_title">
        <div class="title_pic ball-2"></div>
        分类介绍
      </div>
      <div class="introduce_text">
        本次大赛提供{{
          introduceData.length
        }}个大赛分类，鼓励参赛者通过关键词、图象等方式进行AI绘图创意设计。
      </div>
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
          <div class="notice_list_text">1、可以提交一个或多个作品</div>
          <div class="notice_list_text">2、可以单人参加也可以组队参加</div>
          <div class="notice_list_text">
            3、作品需要使用AI Generated Content技术生成，例如Stable
            Diffusion、Midjourney、Dall-E 2、Kandinsky等
          </div>
          <div class="notice_list_text">
            4、作品需要包括图像、视频等内容物，以展示参赛者的创意和技术水平。
          </div>
          <div class="notice_list_text">
            5、作品需要提交作品说明以及AI创作过程文件，以便评审团了解作品的创意和技术细节。
          </div>
          <div class="notice_list_text">
            6、作品可以在ai生成图片/视频基础上进行二次加工优化，但必须同时提交原始生成效果素材和优化后的素材
          </div>
        </div>
        <div class="notice_list">
          <div class="notice_list_title">奖项</div>
          <div class="notice_list_text">
            本次大赛将依据“点赞数“评选出各类奖项
          </div>
          <ui>
            <li class="notice_list_text">最受关注奖：前20名</li>
            <li class="notice_list_text">最具潜力奖：20-50名</li>
            <li class="notice_list_text">激励：AIGC创作人证书</li>
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
            1.所有活动信息，包括但不限于海报、规则、网站、社群聊天等，不得以任何形式对外公开，包括但不限于口头，文字，截图等形式，若有违规，需承担相应责任。
          </div>
          <div class="notice_list_text">
            2.参赛作品，应以正向、积极的内容为导向，严禁包含但不限于低俗、色情、违反宗教活动的内容。
          </div>
          <div class="notice_list_text">
            3.参赛作品所涉及的著作权（包含但不限于知识产权、版权）不得侵犯第三人的合法权利。
          </div>
          <div class="notice_list_text">4.参赛作品不得作为商业用途。</div>
        </div>
        <div class="notice_qdcode">
          <div class="qdcode"></div>
          <div class="qdcode_text">
            企业微信群：<br />
            AIGC创意绘图交流<br />

            <div class="qdcode_span">咨询/合作请联系企微：janeren<br /></div>
          </div>
        </div>
        <div class="notice_btn" @click="handleUpdata">立即参加</div>
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
