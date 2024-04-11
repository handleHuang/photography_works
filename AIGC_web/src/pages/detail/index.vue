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
                <img
                  src="../../assets/img/index/user.jpeg"
                  class="header_pic"
                  v-show="!detailsData.user_img"
                />
                <img
                  :src="detailsData.user_img"
                  class="header_pic"
                  v-show="detailsData.user_img"
                />
                {{ detailsData.user_name }}
              </div>
              <div class="label_list">
                {{ createdData(detailsData.created_at) }}
              </div>
              <div class="label_list">
                <icon name="thumb-up" style="color: rgba(16, 28, 41, 0.6)" />{{
                  detailsData.collect_number
                }}
              </div>
            </div>
          </div>
          <div class="wrap_btn_box">
            <div
              class="wrap_btn"
              :class="{ active: detailsData.collect === 1 }"
              @click="handleBtn"
            >
              <icon
                name="thumb-up"
                style="color: #ffffff"
                v-show="detailsData.collect !== 1"
              />
              <div class="wrap_btn_icon" v-show="detailsData.collect"></div>
              {{ detailsData.collect === 1 ? "已收藏" : "收藏" }}
            </div>
          </div>
        </div>
        <div class="top_item">
          <div class="top_list" v-show="detailsData.project?.title">
            <div class="top_list_title">参赛分类</div>
            <div class="top_list_text">{{ detailsData.project?.title }}</div>
          </div>
        </div>
      </div>
      <div class="detail_wrap">
        <div class="detail_wrap_left">
          <div class="video_item">
            <div
              class="video_list"
              v-for="(item, index) in detailsData.cover"
              :key="index"
            >
              <img
                :src="item"
                class="right_pic"
                @click="handlePicList('articles', index)"
              />
            </div>
          </div>
          <div v-if="detailsData.file?.length > 0">
            <div class="left_text">创作过程：参考文件，工程文件截图</div>
            <div class="right_pic_item">
              <div
                class="video_list"
                v-for="(item, index) in detailsData.beiyong1"
                :key="index"
              >
                <img
                  :src="item"
                  class="right_pic"
                  @click="
                    handlePicList('file', index + detailsData.beiyong1.length)
                  "
                />
              </div>
            </div>
          </div>
          <div>
            <div class="left_text">作者签名：</div>
            <img :src="detailsData.signature" style="width: 100%" />
          </div>
          <div class="comment_box">
            <div class="comment_header">
              <t-input
                v-model="comment_input"
                :value="comment_input"
                placeholder="请输入你的评论"
                clearable
              />
              <t-button
                @click="handleComment(1, 0)"
                type="primary"
                :disabled="comment_input === ''"
              >
                发送
              </t-button>
            </div>
            <div class="comment_item">
              <div
                class="comment_list"
                v-for="(item, index) in detailsData.comments"
                :key="index"
              >
                <div class="comment_list_fu">
                  <img :src="item.cover" class="fu_left" />
                  <div class="fu_right">
                    <div class="fu_name">
                      {{ item.username }}
                      <span>{{ createdData(item.create_time) }}</span>
                    </div>
                    <div class="fu_cont">
                      {{ item.content }}
                      <span @click="handlehuifu(item.id)">回复</span>
                    </div>
                    <div class="fu_pinlun" v-if="huifu_id === item.id">
                      <t-input
                        v-model="fuhuifu_input"
                        :value="fuhuifu_input"
                        :placeholder="`回复${item.username}评论`"
                        clearable
                      />
                      <t-button
                        @click="handleComment(2, item.id)"
                        type="primary"
                        :disabled="fuhuifu_input === ''"
                      >
                        发送
                      </t-button>
                    </div>
                    <div
                      class="zi_box"
                      v-for="(ziItem, i) in item.children"
                      :key="i"
                    >
                      <div class="comment_list_fu">
                        <img :src="ziItem.cover" class="fu_left" />
                        <div class="fu_right">
                          <div class="fu_name">
                            {{ ziItem.username }}
                            <span v-if="ziItem.replied_username">
                              @ {{ ziItem.replied_username }}</span
                            >
                            <span>{{ createdData(ziItem.create_time) }}</span>
                          </div>
                          <div class="fu_cont">
                            {{ ziItem.content }}
                            <span @click="handlehuifu(ziItem.id)">回复</span>
                          </div>
                          <div class="fu_pinlun" v-if="huifu_id === ziItem.id">
                            <t-input
                              v-model="fuhuifu_input"
                              :value="fuhuifu_input"
                              :placeholder="`回复${ziItem.username}评论`"
                              clearable
                            />
                            <t-button
                              @click="handleComment(3, ziItem.id)"
                              type="primary"
                              :disabled="fuhuifu_input === ''"
                            >
                              发送
                            </t-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail_wrap_right">
          <div class="wrap_list">
            <div class="list_title">参赛分类</div>
            <div class="list_text">{{ detailsData.topic }}</div>
          </div>
          <div class="wrap_list">
            <div class="list_title">生成关键描述</div>
            <div class="list_text">{{ detailsData.cont }}</div>
          </div>
          <div class="wrap_list" v-if="detailsData.process">
            <div class="list_title">创作过程描述：其他输入和控制手段</div>
            <div class="list_text">{{ detailsData.process }}</div>
          </div>
        </div>
      </div>
    </div>
    <t-image-viewer
      :key="viewerIndex"
      v-model:visible="visible"
      :defaultIndex="viewerIndex"
      :images="imageViewerData"
    >
    </t-image-viewer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick, onMounted } from "vue";
import { Icon } from "tdesign-icons-vue-next";
import { useRoute, useRouter } from "vue-router";
import { MessagePlugin } from "tdesign-vue-next";
import { getArticlesDetail, postlike, postComment } from "../../models/detail";
const route = useRoute();
const router = useRouter();
const item_Id: any = ref(route.query.id);
const domain = "https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/";
const detailsData: any = ref({});
const otherData: any = ref({});
const imageViewerData: any = ref([]);
const visible = ref(false);
let viewerIndex: any = ref(0);
let newPic: any = ref([]); // 合并数组
router.beforeEach((to, from, next) => {
  console.log(to, from);
  to.meta = {
    page: route.query.page,
    pageSize: route.query.pageSize,
  };
  console.log("浏览器回退事件触发");
  // 执行你想要的逻辑操作
  next();
});
// 弹窗
const videoUrl = ref("");
let innerWidth = window.innerWidth;
const controls = ref(false);
const userData: any = ref(
  JSON.parse(localStorage.getItem("user_info") as string) || ""
);
const handleDetails = () => {
  let params = {
    id: item_Id.value,
    user_id: userData.value.id,
  };
  getArticlesDetail(params)
    .then((res: any) => {
      detailsData.value = res;
      otherData.value = { first: res.first, next: res.next };
      newPic.value = res.cover.concat(res.beiyong1);
      for (let i = 0; i < newPic.value.length; i++) {
        imageViewerData.value.push(newPic.value[i]);
      }
      if (innerWidth <= 750) {
        controls.value = true;
      }
    })
    .catch((error: any) => {
      console.log(error, "获取失败！");
    });
};

const handlePicList = (type: any, index: any) => {
  if (type === "articles" || type === "file") {
    for (let i = 0; i < newPic.value.length; i++) {
      for (let j = 0; j < imageViewerData.value.length; j++) {
        if (newPic.value[index] === imageViewerData.value[j]) {
          viewerIndex.value = j;
          visible.value = true;
          return false;
        }
      }
    }
  }
};

const handleBtn = () => {
  let params: any = {
    item_id: item_Id.value,
    author_id: detailsData.value.beiyong2,
    user_id: userData.value.id,
  };
  postlike(params)
    .then((res: any) => {
      handleDetails();
      MessagePlugin.success(`${res.message}`);
    })
    .catch((error: any) => {
      console.log("获取失败！");
    });
};

onMounted(() => {
  handleDetails();
});

// 评论
const comment_input = ref("");
const fuhuifu_input = ref("");
const handleComment = (index: any, comment_id: any) => {
  let params = {
    content: comment_id === 0 ? comment_input.value : fuhuifu_input.value,
    level: index,
    parent_id: comment_id,
    blog_id: item_Id.value,
    user_id: userData.value.id,
  };
  postComment(params).then((res: any) => {
    if (res.status === 200) {
      MessagePlugin.success(`${res.message}`);
      handleDetails();
      comment_input.value = "";
      fuhuifu_input.value = "";
      huifu_id.value = 0;
    }
  });
};
// 回复评论
let huifu_id = ref(0);
const handlehuifu = (index: any) => {
  huifu_id.value = index;
};

function createdData(value: any) {
  if (value) {
    var date = new Date(value);
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
