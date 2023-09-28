<template>
  <div class="user" ref="scrollContainer">
    <div class="user_header">
      <div class="user_header_left">
        <img
          src="../../assets/img/index/user.jpeg"
          class="user_photo"
          v-show="!userData.user?.avatar"
        />
        <img
          :src="userData.user?.avatar"
          class="user_photo"
          v-show="userData.user?.avatar"
        />
        <div class="user_name">{{ userData.user?.name }}</div>
        <!-- <div class="user_position">TEG技术工程事业群/用户体验与研究设计部/设计中心/颐和工作室</div> -->
      </div>
      <div class="user_header_right">
        <div class="right_title">AIGC设计大赛成就</div>
        <!-- <div class="look_details">查看详情</div> -->
        <div class="right_item">
          <div class="right_list">
            <div class="list_title">参赛作品数</div>
            <div class="list_text">{{ userData.user?.article_count }}</div>
          </div>
          <div class="right_list">
            <div class="list_title">作品点赞总数</div>
            <div class="list_text">{{ userData.user?.like_count }}</div>
          </div>
          <div class="right_list">
            <div class="list_title">人气榜排名</div>
            <div class="list_text">{{ userData.user?.rank }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="user_cont">
      <div class="cont_header">
        <div class="user_menu">
          <div
            class="menu_list"
            v-for="(item, index) in menuList.arr"
            :key="index"
            :class="{ active: menuActive === index }"
            @click="handleMenuList(index)"
          >
            {{ item.title
            }}<span v-show="index === 2">（{{ userData.draft_article }}）</span>
          </div>
        </div>
        <!-- <div class="screen">
          <t-radio-group variant="default-filled" default-value="1" @change="screenChange">
            <t-radio-button value="1">最新上传</t-radio-button>
            <t-radio-button value="2">名称A-Z</t-radio-button>
          </t-radio-group>
        </div> -->
      </div>
      <div class="screen_cont">
        <div class="screen_cont_left">
          <div class="down">
            <t-dropdown
              :options="optionsYear"
              @click="clickHandlerYear"
              trigger="click"
            >
              <t-space>
                <t-button variant="text">
                  {{ year ? year : '全部年份' }}
                  <template #suffix>
                    <t-icon name="chevron-down" size="16"
                  /></template>
                </t-button>
              </t-space>
            </t-dropdown>
          </div>
          <div class="down">
            <t-dropdown
              :options="optionsMonth"
              @click="clickHandlerMonth"
              trigger="click"
            >
              <t-space>
                <t-button variant="text">
                  {{ month ? month : '全部月份' }}
                  <template #suffix>
                    <t-icon name="chevron-down" size="16"
                  /></template>
                </t-button>
              </t-space>
            </t-dropdown>
          </div>
          <div class="down">
            <t-dropdown
              :options="optionsTheme"
              @click="clickHandlerTheme"
              trigger="click"
            >
              <t-space>
                <t-button variant="text">
                  {{ themeText ? themeText : '全部主题' }}
                  <template #suffix>
                    <t-icon name="chevron-down" size="16"
                  /></template>
                </t-button>
              </t-space>
            </t-dropdown>
          </div>
        </div>
        <div class="screen_right">
          <t-radio-group
            variant="default-filled"
            v-model="screenActive"
            @change="screenChange"
          >
            <t-radio-button value="1">最新上传</t-radio-button>
            <t-radio-button value="2">名称A-Z</t-radio-button>
          </t-radio-group>
          <!-- <div class="sizer">
            <div class="sizer_list" v-for="(item,index) in sizerItem" :key="index" :class="{active:sizerIndex === index}" @click="handleSizer(index)">{{ item.title }}</div>
            <div class="sizer_block" :style="{left: sizerIndex * 66 + 4 + 'px'}"></div>
          </div> -->
        </div>
      </div>
      <div class="user_item" v-show="menuActive === 0 || menuActive === 1">
        <div class="no_data" v-if="listData.length === 0">暂无数据</div>
        <div
          class="workList_list"
          v-for="(item, index) in listData"
          :key="index"
          :class="{ gragAcitve: item.ellipsisAcitve }"
        >
          <div
            class="workList_list_ellipsis"
            v-show="menuActive === 0 && !userId"
            :class="{ ellipsisAcitve: item.ellipsisAcitve }"
            @click="handleEllipsis(index)"
          >
            <icon
              name="ellipsis"
              style="color: #1c1b1f"
              v-show="!item.ellipsisAcitve"
            />
            <div class="ellipsis_item" v-show="item.ellipsisAcitve">
              <div
                class="ellipsis_list"
                @click="handleEdit(item.id, index, 'jump', item.online_status)"
              >
                修改作品
              </div>
              <div
                class="ellipsis_list"
                @click="handleEdit(item.id, index, 'hide', item.online_status)"
              >
                {{ item.online_status === 2 ? '显示作品' : '隐藏作品' }}
              </div>
              <div
                class="ellipsis_list"
                style="color: #b00808"
                @click="handleEdit(item.id, index, 'del', item.online_status)"
              >
                删除作品
              </div>
              <div class="ellipsis_list" style="color: rgba(0, 0, 0, 0.6)">
                取消
              </div>
            </div>
          </div>
          <div class="workList_list_box" @click="handleList(index, item.id)">
            <div class="img_box">
              <img
                :src="item.articles[0]?.url"
                v-show="item.articles[0]?.mine.indexOf('image') !== -1"
                class="workList_list_pic"
              />
              <div class="img_label" v-show="item.online_status === 2">
                仅自己可见
              </div>
              <video
                class="workList_list_pic"
                v-show="item.articles[0]?.mine.indexOf('video') !== -1"
                :src="item.articles[0]?.url"
              />
              <div
                class="video_btn"
                v-show="item.articles[0]?.mine.indexOf('video') !== -1"
              ></div>
            </div>
            <div class="workList_list_title">{{ item.title }}</div>
            <div class="workList_list_cont">
              <div class="workList_list_right">
                <div class="right_label" v-show="item.project?.title">
                  {{ item.project?.title }}
                </div>
              </div>
              <div class="workList_list_left">
                <div class="left_label">
                  <icon name="browse" style="color: rgba(16, 28, 41, 0.6)" />{{
                    getArea(item.visit_count)
                  }}
                </div>
                <div class="left_label">
                  <icon
                    name="thumb-up"
                    style="color: rgba(16, 28, 41, 0.6)"
                  />{{ getArea(item.like_count) }}
                </div>
              </div>
            </div>
            <div class="workList_list_cont">
              <div class="workList_list_left">
                <img
                  src="../../assets/img/index/user.jpeg"
                  class="header_pic"
                  v-show="!item.user?.avatar"
                />
                <img
                  :src="item.user?.avatar"
                  class="header_pic"
                  v-show="item.user?.avatar"
                />
                {{ item.user.name }}
              </div>
              <div class="workList_list_right">
                {{ createdData(item.created_at) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 草稿 -->
      <!-- <div class="user_item" v-show="menuActive === 1">
        <div class="no_data" v-if="likesList.length === 0">暂无数据</div>
        <div class="workList_list" @click="handleList(index, item.id)" v-for="(item, index) in likesList" :key="index">
          <img :src="item.likeable.articles[0]?.url" class="workList_list_pic" />
          <div class="workList_list_title">{{ item.likeable.title }}</div>
          <div class="workList_list_cont">
            <div class="workList_list_left">
              <div class="left_label"><icon name="browse" style="color: rgba(16, 28, 41, 0.6)" size="16px" />{{ getArea(item.likeable.visit_count) }}</div>
              <div class="left_label"><icon name="thumb-up" style="color: rgba(16, 28, 41, 0.6)" size="16px" />{{ getArea(item.likeable.like_count) }}</div>
            </div>
            <div class="workList_list_right">
              <div class="right_label">{{ item.likeable.project?.title }}</div>
            </div>
          </div>
          <div class="workList_list_cont">
            <div class="workList_list_left">
              <img src="../../assets/img/index/user.jpeg" class="header_pic" />
              {{ item.likeable.user.name }}
            </div>
            <div class="workList_list_right">{{ createdData(item.likeable.created_at) }}</div>
          </div>
        </div>
      </div> -->
      <div class="pagination_box">
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
    <div class="popup" v-show="popShow">
      <div class="popup_bg" @click="handlePop"></div>
      <div class="popup_box">
        <div class="popup_title">
          确认{{
            popShowType === 'del'
              ? '删除'
              : popShowOnline_status === 2
              ? '显示'
              : '隐藏'
          }}《{{ listData[popShowindex]?.title }}》？
        </div>
        <div class="popup_btn_box">
          <t-button theme="primary" @click="handlepopBtn">{{
            popShowType === 'del'
              ? '删除'
              : popShowOnline_status === 2
              ? '显示'
              : '隐藏'
          }}</t-button>
          <t-button theme="default" @click="handlePop">取消</t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { Icon } from 'tdesign-icons-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import {
  getUserData,
  getHeData,
  getUserLikes,
  articlesDel,
  articlesStatus
} from '../../models/user'
import { getProjectsList } from '../../models/index'
import { _debounce } from '../../utils/throttle'
import { getArticlesTime, getArticlesYears } from '../../models/worksList'
const domain = 'https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/'
const router = useRouter()
const route = useRoute()
const userData: any = ref({})
let menuActive: any = ref(0)
const userId: any = ref(route.query.id)
// 年份
let year = ref<any>('')
const optionsYear: any = [{ content: '全部年份', value: 0 }]
const clickHandlerYear = (data: any) => {
  year.value = data.content
  listData.value = []
  handleGetUserData()
  // if (menuActive.value === 1) {
  //   handleLikes();
  // } else {
  //   handleGetUserData();
  // }
  // MessagePlugin.success(`选中【${data.content}】`);
}
getArticlesTime()
  .then((res: any) => {
    for (let i = 0; i < res.length; i++) {
      optionsMonth[i + 1] = {
        content: res[i],
        value: i + 1
      }
    }
  })
  .catch((error: any) => {
    console.log('获取失败！')
  })
// 月份
let month = ref<any>('')
const optionsMonth = [{ content: '全部月份', value: 0 }]
const clickHandlerMonth = (data: any) => {
  month.value = data.content
  listData.value = []
  handleGetUserData()
  // if (menuActive.value === 1) {
  //   handleLikes();
  // } else {
  //   handleGetUserData();
  // }
  // MessagePlugin.success(`选中【${data.content}】`);
}
getArticlesYears()
  .then((res: any) => {
    for (let i = 0; i < res.length; i++) {
      optionsYear[i + 1] = {
        content: res[i],
        value: i + 1
      }
    }
  })
  .catch((error: any) => {
    console.log('获取失败！')
  })

// 主题
let theme = ref<number>(0)
let themeText = ref<string>('')
const optionsTheme: any = [{ content: '全部主题', value: 0, id: 0 }]
let params = {}
getProjectsList(params)
  .then((res: any) => {
    for (let i = 0; i < res.length; i++) {
      optionsTheme[i + 1] = {
        content: res[i].title,
        value: i + 1,
        id: res[i].id
      }
    }
  })
  .catch((error: any) => {
    console.log('获取失败！')
  })
const clickHandlerTheme = (data: any) => {
  theme.value = data.id
  themeText.value = data.content
  listData.value = []
  handleGetUserData()
  // MessagePlugin.success(`选中【${data.content}】`);
  // if (menuActive.value === 1) {
  //   handleLikes();
  // } else {
  //   handleGetUserData();
  // }
}

const sizerItem: any = ref([
  {
    title: '最新上传'
  },
  {
    title: '名称A-Z'
  }
])
// let sizerIndex:any = ref(0)
// const handleSizer = (index:any) =>{
//   sizerIndex.value = index
//   handleGetUserData();
// }
const screenActive: any = ref('1')
const screenChange = (e: any) => {
  screenActive.value = e
  listData.value = []
  handleGetUserData()
  // if (menuActive.value === 1) {
  //   handleLikes();
  // } else {
  //   handleGetUserData();
  // }
}

// 列表更多
const handleEllipsis = (index: any) => {
  listData.value[index].ellipsisAcitve = !listData.value[index].ellipsisAcitve
}
//删除and隐藏  弹窗
const popShow = ref(false)
let popShowId: any = ref(null)
let popShowindex = ref(0)
let popShowType = ref('del')
let popShowOnline_status = ref(1)
const handleEdit = (id: any, index: any, type: any, online_status: any) => {
  popShowId.value = id
  popShowindex.value = index
  popShowType.value = type
  popShowOnline_status.value = online_status
  popShow.value = true

  if (type === 'jump') {
    router.push({ path: '/updata', query: { id: id } })
  }
}
const handlePop = () => {
  popShow.value = false
}
const handlepopBtn = () => {
  if (popShowType.value === 'del') {
    let params = {
      ids: [popShowId.value]
    }
    articlesDel(params)
      .then((res: any) => {
        MessagePlugin.success({ content: res.message })
        popShow.value = false
        handleGetUserData()
      })
      .catch((error: any) => {
        console.log('获取失败！')
      })
  }

  if (popShowType.value === 'hide') {
    let params = {
      id: popShowId.value,
      online_status: popShowOnline_status.value === 1 ? 2 : 1 //1.上架  2.下架
    }
    articlesStatus(params)
      .then((res: any) => {
        MessagePlugin.success({ content: res.message })
        popShow.value = false
        handleGetUserData()
      })
      .catch((error: any) => {
        console.log('获取失败！')
      })
  }
}

const page: any = ref(1)
const per_page: any = ref(20)
let total = ref(0)
const onPageSizeChange = (size: any) => {
  per_page.value = size
  listData.value = []
  handleGetUserData()
  // if (menuActive.value === 1) {
  //   handleLikes();
  // } else {
  //   handleGetUserData();
  // }
}
const onCurrentChange = (index: Number, pageInfo: any) => {
  page.value = index
  listData.value = []
  handleGetUserData()
  // if (menuActive.value === 1) {
  //   handleLikes();
  // } else {
  //   handleGetUserData();
  // }
}
const onChange = (pageInfo: any) => {
  console.log(pageInfo)
}

const listData: any = ref([])
const handleGetUserData = () => {
  let params: any = {
    page: page.value,
    per_page: per_page.value,
    column: screenActive.value === '1' ? 'created_at' : 'title'
  }
  if (route.query.id) {
    params.user_id = route.query.id
  }
  if (menuActive.value === 1) {
    params.online_status = 1
  }
  if (theme.value !== 0) {
    params.project_id = theme.value
  }
  if (year.value !== '' && year.value !== '全部年份') {
    params.year = year.value
  }
  if (month.value !== '' && year.value !== '全部月份') {
    params.month = month.value
  }
  const fetchDataFunc = route.query.id ? getHeData : getUserData
  fetchDataFunc(params)
    .then((res: any) => {
      // console.log(res);
      userData.value = res
      if (keyOpen.value) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
        setTimeout(() => {
          if (menuActive.value === 1) {
            total.value = res.likes.total
            for (let i = 0; i < res.likes.data.length; i++) {
              res.likes.data[i].ellipsisAcitve = false
            }
            listData.value = res.likes.data
          } else {
            total.value = res.articles.total
            for (let i = 0; i < res.articles.data.length; i++) {
              res.articles.data[i].ellipsisAcitve = false
            }
            listData.value = res.articles.data
          }
        }, 100)
      } else {
        if (menuActive.value === 1) {
          total.value = res.likes.total
          for (let i = 0; i < res.likes.data.length; i++) {
            res.articles.data[i].ellipsisAcitve = false
          }
          listData.value = listData.value.concat(res.likes.data)
        } else {
          total.value = res.articles.total
          for (let i = 0; i < res.articles.data.length; i++) {
            res.articles.data[i].ellipsisAcitve = false
          }
          listData.value = listData.value.concat(res.articles.data)
        }
      }
    })
    .catch((error: any) => {
      console.log('获取失败！')
    })
}

const menuList = reactive({
  arr: [
    {
      title: `${userId.value ? '他' : '我'}的作品`
    },
    {
      title: `${userId.value ? '他' : '我'}点赞的`
    }
    // {
    //   title: "草稿箱",
    // },
  ]
})
watch(
  () => route.query.id,
  (newQuery, oldQuery) => {
    if (!newQuery) {
      menuList.arr = [
        {
          title: `我的作品`
        },
        {
          title: `我点赞的`
        }
      ]
    }
    userId.value = route.query.id
    handleGetUserData()
  }
)
const handleMenuList = (index: Number) => {
  ;(page.value = 1), (per_page.value = 12)
  menuActive.value = index
  listData.value = []
  handleGetUserData()
  // if (menuActive.value === 1) {
  //   handleLikes();
  // } else {
  //   handleGetUserData();
  // }
}

const likesList: any = ref([])
const handleLikes = () => {
  let params: any = {
    page: page.value,
    per_page: per_page.value,
    column: screenActive.value === 0 ? 'created_at' : 'title'
  }
  if (theme.value !== 0) {
    params.project_id = theme.value
  }
  if (year.value !== '' && year.value !== '全部年份') {
    params.year = year.value
  }
  if (month.value !== '' && year.value !== '全部月份') {
    params.month = month.value
  }
  getUserLikes(params)
    .then((res: any) => {
      // console.log(res);
      likesList.value = res.data
      total.value = res.total
    })
    .catch((error: any) => {
      console.log('获取失败！')
    })
}

function handleList(index: any, id: any) {
  router.push({ path: '/detail', query: { id: id } })
}
function getArea(area: Number) {
  return String(area).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
function createdData(value: any) {
  var dateTime = value.toString().replace(/\-/g, '/')
  var date = new Date(dateTime)
  var y = date.getFullYear()
  var m: any = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d: any = date.getDate()
  d = d < 10 ? '0' + d : d
  var h: any = date.getHours()
  h = h < 10 ? '0' + h : h
  return y + '-' + m + '-' + d
}

const keyOpen = ref(false)
let scrollContainer: any = ref(null)
let child: any = document.documentElement.clientHeight
onMounted(() => {
  handleGetUserData()
  let innerWidth = window.innerWidth
  if (innerWidth <= 750) {
    const scroll = window.addEventListener('scroll', scrollToTop)
  } else {
    keyOpen.value = true
  }
})

const scrollToTop = _debounce(async () => {
  let scrollHeight = scrollContainer.value?.clientHeight
  var scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  // // 判断是否滚动到底部
  if (scrollTop + child >= scrollHeight - 100) {
    if (listData.value.length < total.value) {
      page.value++
      handleGetUserData()
    }
  }
}, 100)
</script>

<style lang="less" scoped src="../../assets/css/user.less"></style>
