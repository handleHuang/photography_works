<template>
  <div class="workList" ref="scrollContainer">
    <div class="workList_box">
      <!-- 筛选 -->
      <div class="workList_screen">
        <div class="screen_left">
          <div class="screen_left_small">
            <div class="workList_title">参赛作品</div>
            <!-- <div class="down">
            <t-dropdown :options="optionsYear" @click="clickHandlerYear" trigger="click">
              <t-space>
                <t-button variant="text">
                  {{ year ? year : "全部年份" }}
                  <template #suffix> <t-icon name="chevron-down" size="16" /></template>
                </t-button>
              </t-space>
            </t-dropdown>
          </div>
          <div class="down">
            <t-dropdown :options="optionsMonth" @click="clickHandlerMonth" trigger="click">
              <t-space>
                <t-button variant="text">
                  {{ month ? month : "全部月份" }}
                  <template #suffix> <t-icon name="chevron-down" size="16" /></template>
                </t-button>
              </t-space>
            </t-dropdown>
          </div> -->
            <div class="down">
              <t-dropdown
                :options="optionsTheme"
                @click="clickHandlerTheme"
                trigger="click"
              >
                <t-space>
                  <t-button variant="text">
                    {{ themeText ? themeText : "全部主题" }}
                    <template #suffix>
                      <t-icon name="chevron-down" size="16"
                    /></template>
                  </t-button>
                </t-space>
              </t-dropdown>
            </div>
          </div>
          <t-input placeholder="" v-model="searchInput" @change="searchChange">
            <template #suffixIcon>
              <search-icon :style="{ cursor: 'pointer' }" />
            </template>
          </t-input>
        </div>
        <div class="screen_right">
          <!-- <t-radio-group variant="default-filled" default-value="1" @change="screenChange">
            <t-radio-button value="1">最新上传</t-radio-button>
            <t-radio-button value="2">点赞最多</t-radio-button>
          </t-radio-group> -->
          <div class="sizer">
            <div
              class="sizer_list"
              v-for="(item, index) in sizerItem"
              :key="index"
              :class="{ active: sizerIndex === index }"
              @click="handleSizer(index)"
            >
              {{ item.title }}
            </div>
            <div
              class="sizer_block"
              :style="{ left: sizerIndex * 73 + 6 + 'px' }"
            ></div>
          </div>
        </div>
      </div>
      <div class="workList_cont">
        <div class="workList_item">
          <div class="no_data" v-if="listData.length === 0">暂无数据</div>
          <div
            class="workList_list"
            @click="handleList(index, item.id)"
            v-for="(item, index) in listData"
            :key="index"
          >
            <img :src="item.cover[0]" class="workList_list_pic" />
            <div class="workList_list_title">{{ item.title }}</div>
            <div class="workList_list_cont">
              <div class="workList_list_right">
                <div class="right_label" v-show="item.project?.title">
                  {{ item.project?.title }}
                </div>
              </div>
              <div class="workList_list_left">
                <div class="left_label" @click.stop="handleLikeBtn(item)">
                  <icon
                    name="thumb-up"
                    :style="{
                      color: item.liked ? '#0064ff' : 'rgba(16, 28, 41, 0.6)',
                    }"
                  />{{ getArea(item.collect_number) }}
                </div>
              </div>
            </div>
            <div class="workList_list_cont">
              <div class="workList_list_left">
                <img
                  v-show="item.user_img"
                  :src="item.user_img"
                  class="header_pic"
                />
                <img
                  src="../../assets/img/index/user.jpeg"
                  v-show="!item.user_img"
                  class="header_pic"
                />
                {{ item.user_name }}
              </div>
              <div class="workList_list_right">
                {{ createdData(item.created_at) }}
              </div>
            </div>
          </div>
        </div>
        <div class="workList_rank">
          <div class="rank_header">
            <div class="rank_header_left">AIGC绘图人气榜</div>
          </div>
          <div class="rank_title_list">
            <div class="rank_title_list_left">
              <div class="title">排名</div>
              <div class="title">个人</div>
            </div>
            <div class="title new_title">点赞</div>
          </div>
          <div
            class="rank_list"
            v-for="(item, index) in rankList"
            :key="index"
            @click="toUserPage(item.id)"
          >
            <div class="rank_list_index">{{ index + 1 }}</div>
            <img
              src="../../assets/img/index/user.jpeg"
              class="rank_list_img"
              v-show="!item.cover"
            />
            <img
              :src="item?.cover"
              class="rank_list_img"
              v-show="item.cover"
            />
            <div class="rank_list_cont">
              <div class="rank_list_name">{{ item.name }}</div>
              <!-- <div class="rank_list_text">
                TEG/用户研究与体验设计TEG/用户研究与体验设计...
              </div> -->
            </div>
            <div class="rank_list_like">
              {{ item.like_number }}
            </div>
          </div>
          <div class="rank_tips">
            *个人榜每小时更新（更新于{{ createdData(new Date()) }}
            {{
              new Date().getHours() < 10
                ? "0" + new Date().getHours()
                : new Date().getHours()
            }}:00）
          </div>
        </div>
      </div>
      <div class="pagination_box" v-show="listData.length !== 0">
        <t-pagination
          v-model="page"
          v-model:pageSize="per_page"
          :total="total"
          show-jumper
          @change="onChange"
          @page-size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { Icon, SearchIcon } from "tdesign-icons-vue-next";
import { MessagePlugin } from "tdesign-vue-next";
import { _debounce } from "../../utils/throttle";
import { useRouter, useRoute } from "vue-router";
import {
  getArticles,
  getArticlesTime,
  getArticlesYears,
  getUsers,
} from "../../models/worksList";
import { getProjectsList } from "../../models/index";
import { postlike } from "../../models/detail";
const router = useRouter();
const route = useRoute();
const domain = "https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/";
// 年份
let year = ref<string>("");
const optionsYear: any = [{ content: "全部年份", value: 0 }];
const clickHandlerYear = (data: any) => {
  year.value = data.content;
  getArticlesTime()
    .then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        optionsMonth[i + 1] = {
          content: res[i],
          value: i + 1,
        };
      }
    })
    .catch((error: any) => {
      console.log("获取失败！");
    });
  // MessagePlugin.success(`选中【${data.content}】`);
};

// 月份
let month = ref<string>("");
const optionsMonth = [{ content: "全部月份", value: 0 }];
const clickHandlerMonth = (data: any) => {
  month.value = data.content;
  // MessagePlugin.success(`选中【${data.content}】`);
};
getArticlesYears()
  .then((res: any) => {
    for (let i = 0; i < res.length; i++) {
      optionsYear[i + 1] = {
        content: res[i],
        value: i + 1,
      };
    }
  })
  .catch((error: any) => {
    console.log("获取失败！");
  });

// 主题
let theme = ref<number>(0);
let themeText = ref<string>("");
const optionsTheme: any = [{ content: "全部主题", value: 0, id: 0 }];
let params = {};
getProjectsList(params)
  .then((res: any) => {
    console.log(res);
    for (let i = 0; i < res.data.length; i++) {
      optionsTheme[i + 1] = {
        content: res.data[i].title,
        value: i + 1,
        id: res.data[i].id,
      };
    }
  })
  .catch((error: any) => {
    console.log("获取失败！");
  });
const clickHandlerTheme = (data: any) => {
  theme.value = data.id;
  themeText.value = data.content;
  listData.value = [];
  // MessagePlugin.success(`选中【${data.content}】`);
  handleGetArticles();
};

const selectActive: any = ref("1");
const screenChange = (e: any) => {
  selectActive.value = e;
  listData.value = [];
  handleGetArticles();
};

const rankList: any = ref([]);
const incidentRankList = () => {
  getUsers()
    .then((res: any) => {
      rankList.value = res;
    })
    .catch((error: any) => {
      console.log("获取失败！");
    });
};
incidentRankList();

const sizerItem: any = ref([
  {
    title: "最新上传",
  },
  {
    title: "点赞最多",
  },
]);
let sizerIndex: any = ref(0);
const handleSizer = (index: any) => {
  sizerIndex.value = index;
  listData.value = [];
  handleGetArticles();
};

function getArea(area: Number) {
  return String(area).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
let total = ref(0);
const page: any = ref(Number(route.meta.page) || 1);
const per_page: any = ref(Number(route.meta.pageSize) || 20);
const onChange = (pageInfo: any) => {
  console.log(pageInfo);
  per_page.value = pageInfo.pageSize;
  page.value = pageInfo.current;
};

function handleList(index: any, id: number) {
  router.push({
    name: "detail",
    query: { page: page.value, pageSize: per_page.value, id: id },
  });
}
const onPageSizeChange = (size: any) => {
  per_page.value = size;
  listData.value = [];
  handleGetArticles();
};
const onCurrentChange = (index: Number, pageInfo: any) => {
  page.value = index;
  listData.value = [];
  handleGetArticles();
};
let listData: any = ref([]);
let searchInput = ref("");
const searchChange = () => {
  page.value = 1;
  per_page.value = 20;
  listData.value = [];
  handleGetArticles();
};
// 参赛作品列表
const handleGetArticles = () => {
  let params: any = {
    page: page.value,
    per_page: per_page.value,
    state: 1,
    top: sizerIndex.value,
  };
  if (searchInput.value !== "") {
    params.keyword = searchInput.value;
  }
  if (theme.value !== 0) {
    params.topic = themeText.value;
  }
  getArticles(params)
    .then((res: any) => {
      if (keyOpen.value) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setTimeout(() => {
          total.value = res.totalCount;
          listData.value = res.data;
        }, 100);
      } else {
        total.value = res.totalCount;
        listData.value = listData.value.concat(res.data);
      }
    })
    .catch((error: any) => {
      console.log("获取失败！");
    });
};
handleGetArticles();

const keyOpen = ref(false);
let scrollContainer: any = ref(null);
let child: any = document.documentElement.clientHeight;
onMounted(() => {
  // 添加滚动事件监听
  let innerWidth = window.innerWidth;
  if (innerWidth <= 750) {
    const scroll = window.addEventListener("scroll", scrollToTop);
  } else {
    keyOpen.value = true;
  }
});

const scrollToTop = _debounce(async () => {
  let scrollHeight = scrollContainer.value?.clientHeight;
  var scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  // // 判断是否滚动到底部
  if (scrollTop + child >= scrollHeight - 100) {
    if (listData.value.length < total.value) {
      page.value++;
      handleGetArticles();
    }
  }
}, 100);
const userData: any = ref(
  JSON.parse(localStorage.getItem("user_info") as string)
);
const handleLikeBtn = (item: any) => {
  let params: any = {
    item_id: item.id,
    author_id: item.beiyong2,
    user_id: userData.value.id,
  };
  postlike(params)
    .then((res: any) => {
      console.log(res);
      handleGetArticles();
      if (res.message === "作品收藏已取消") {
        item.liked = false;
      } else {
        item.liked = true;
      }
      MessagePlugin.success(`${res.message}`);
    })
    .catch((error: any) => {
      console.log("获取失败！");
    });
};

const toUserPage = (id: number) => {
  router.push({ path: "user", query: { id: id } });
};

// function ellipsis (value) {
//   if (!value) return '0'
//   if (value.length > 18) {
//     return value.slice(0, 18) + '...'
//   }
//   return value
// }
</script>

<style lang="less" scoped src="../../assets/css/workList.less"></style>
