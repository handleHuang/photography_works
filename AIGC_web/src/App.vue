<template>
  <div id="app">
    <!-- 头部菜单 -->
    <!-- <div class="header" :style="{ position: 'fixed' }" :class="{ bgColor: headerBgShow, headerFixed: headerFixed }"> -->
    <div class="header" :style="{ position: 'fixed' }">
      <div class="header_wrap max-content">
        <div class="header_left">
          <div class="header_logo" @click="handleTitle"></div>
          <!-- <img height="30" src="./assets/img/logo.png" alt="logo" /> -->
          <div class="menu">
            <div
              class="menu_list"
              :class="{ active: menuIndex === item.url }"
              v-for="(item, index) in menu"
              :key="index"
              @click="handleMenuList(item.url)"
              v-show="item.getStatusList"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="header_right">
          <!-- <div class="lang" :class="{ active: index === langIndex }" v-for="(item, index) in lang" :key="index" @click="handleLang(item, index)">{{ item }}</div> -->
          <div class="user" @click="handleHeaderPhoto">
            <t-icon
              class="t-menu__operations-icon"
              name="user-circle"
              size="32px"
              color="#ffffff"
              v-show="!headerPic"
            />
            <img :src="headerPic" class="user_pic" v-show="headerPic" />
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view :key="menuIndex" />
    </div>
    <!-- <div class="footer_wrap">
      <div class="footer" v-if="menuIndex === 'index'">
        <div class="max-content">
          <div class="copyright">
            Copyright © 1998-{{ new Date().getFullYear() }} Tencent. All Rights
            Reserved. 公司 版权所有
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, Ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useI18n } from "vue-i18n";
import { _debounce } from "./utils/throttle";
import { getUserData } from "./models/user";
// import { getLogin } from "./models/index";
// const { t, locale } = useI18n();

const route = useRoute();
const router = useRouter();
watch(
  () => route.path,
  (newValue, oldValue) => {
    menuIndex.value = newValue.split("/")[1];
  }
);
const menuIndex: any = ref("");

const lang = ref(["中", "英"]);
let langIndex = ref(0);
if (localStorage.getItem("lang") === "zh-EN") {
  langIndex.value = 1;
} else {
  langIndex.value = 0;
}
const handleLang = (item: string, index: number) => {
  // langIndex.value = index;
  // if (item === "中") {
  //   localStorage.setItem("lang", "zh-CN");
  //   locale.value = "zh-CN";
  // } else {
  //   localStorage.setItem("lang", "zh-EN");
  //   locale.value = "zh-EN";
  // }
};

const handleTitle = () => {
  router.push({ path: "/" });
};
const headerPic = ref("");

onMounted(() => {
  const scroll = window.addEventListener("scroll", scrollToTop);
  // console.log(import.meta.env.VUE_APP_URL_BASE);

  // getProjectsList()
  //   .then((res: any) => {
  //     console.log("结果", res);
  //   })
  //   .catch((error: any) => {
  //     console.log("获取失败！");
  //   });

  // let params = {
  //   title: "juzi",
  //   name: "chaju",
  // };
  // postText(params)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log("获取失败！");
  //   });
  // getUserDatas()
});
// const getUserDatas = ()=>{
//   let params: any = {
//     page: 1,
//     per_page: 2,
//     column: 'title',
//     // online_status: 1,
//   };
//   getUserData(params)
//     .then((res: any) => {
//       // console.log(res);
//       headerPic.value = res.user.avatar;
//     })
//     .catch((error: any) => {
//       console.log("获取失败！");
//     });
// }
// const getStatus = ref(null);
// const setLogin = () => {
// getLogin()
//   .then((res: any) => {
//     getStatus.value = res.status;
//     window.localStorage.setItem("status", JSON.stringify(res.status));
//   })
//   .catch((error: any) => {
//     console.log("获取失败！");
//   });
// };
// setLogin();

const menu = ref([
  {
    url: "index",
    title: "大赛首页",
    getStatusList: true,
  },
  {
    url: "updata",
    title: "上传作品",
    // getStatusList: window.localStorage.getItem("status"),
    getStatusList: true,
  },
  {
    url: "workList",
    title: "查看作品",
    getStatusList: true,
  },
  {
    url: "teaching",
    title: "摄影教学",
    getStatusList: true,
  },
  {
    url: "competition",
    title: "赛事活动",
    getStatusList: true,
  },
]);

const visible = ref(false);
const placement = ref("left");

let rolling = 0;
let headerFixed = ref(true);
let headerBgShow = ref(false);

const scrollToTop = _debounce(async () => {
  // console.log(val)
  var scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  if (scrollTop >= 560) {
    headerBgShow.value = true;
  } else {
    headerBgShow.value = false;
  }
  var scroll = scrollTop - rolling;
  rolling = scrollTop;
  if (scroll < 0) {
    headerFixed.value = true;
  } else {
    headerFixed.value = false;
  }
}, 100);

// 菜单跳转
const handleMenuList = (url: string) => {
  if (url === "updata") {
    if (localStorage.getItem("user_info")) {
      router.push({ path: url });
    } else {
      router.push({ path: "/login" });
    }
  }else {
    router.push({ path: '/' + url });
  }
};
const handleHeaderPhoto = () => {
  if (localStorage.getItem("user_info")) {
    router.push({ path: "/user" });
  } else {
    router.push({ path: "/login" });
  }
};
</script>

<style scoped></style>
