<template>
  <div class="manage">
    <div class="placeholder_box"></div>
    <div class="manage_box">
      <t-tabs v-model="params.is_draft" @change="handleChange">
        <t-tab-panel :value="0" label="已发布"> </t-tab-panel>
        <t-tab-panel :value="1" label="草稿箱"> </t-tab-panel>
      </t-tabs>
      <div class="thesisOrNews">
        <t-radio-group
          v-model="checkedThesis"
          variant="primary-filled"
          @change="changeThesisOrNews"
        >
          <t-radio-button value="thesis">论文</t-radio-button>
          <t-radio-button value="news">新闻</t-radio-button>
        </t-radio-group>
      </div>
      <div class="filtrate">
        <t-radio-group v-model="params.by_date" @change="handleChange">
          <t-radio-button value="all">全部</t-radio-button>
          <t-radio-button value="recent_month">近一月</t-radio-button>
          <t-radio-button value="half_a_year">近半年</t-radio-button>
          <t-radio-button value="recent_year">近一年</t-radio-button>
        </t-radio-group>
      </div>
      <div class="content">
        <div v-if="Data.arr.length !== 0" class="positionDiv">
          <div
            @click="checkedThesis === 'thesis'? thesisDetail(item.id) : newsDetail(item.id)"
            class="content_item"
            v-for="(item, index) in Data.arr"
            :key="index"
          >
            <div class="item_left" v-if="checkedThesis == 'news'">
              <img
                :src="
                  item.latest_file
                    ?
                    'https://robot-1252839081.cos.ap-guangzhou.myqcloud.com/' +   item.latest_file.path
                    : robotPng
                "
                alt=""
              />
            </div>
            <div class="item_right">
              <div class="description_text">{{ item.title }}</div>
              <div class="record">
                <div style="height:24px">
                  {{ item.username }}
                  <span v-if="params.is_draft == 0"> &nbsp;发布于&nbsp; </span
                  ><span v-else> &nbsp;保存于&nbsp; </span>
                  <span v-if="params.is_draft == 0">{{
                    item.published_at
                  }}</span>
                  <span v-else>{{ item.updated_at }}</span>
                </div>
                <span v-if="params.is_draft == 0" class="tag_span">已发布</span>
              </div>
            </div>
            <div
              v-if="params.is_draft == 1"
              class="edit_icon"
              @click.stop="editListItem(item.id)"
            >
              <t-icon name="edit-1" />
            </div>
            <div
              class="browse_icon"
              @click.stop="checkedThesis === 'thesis'? thesisDetail(item.id) : newsDetail(item.id)"
            >
              <t-icon name="browse" />
            </div>
            <div
              class="del_icon"
              @click.stop="delListItem(item.latest_file.mime.includes('pdf') ? '论文' : '新闻', item.id)"
            >
              <t-icon name="delete" />
            </div>
          </div>
          <div class="more" v-if="isHasMore">
            <span @click="moreData">加载更多</span>
          </div>
          <t-divider v-if="!isHasMore">没有更多了</t-divider>
        </div>
        <div class="empty" v-else>暂无数据</div>
      </div>
    </div>
  </div>
  <t-dialog
    placement="center"
    :cancelBtn="null"
    :confirmBtn="null"
    :closeBtn="null"
    v-model:visible="visible"
    v-if="detailData.value"
  >
   <template #header>
    <div class="header_box">
      <div class="title">{{detailData.value.title}}</div>
      <img @click="visible=false" class="close_icon" src="../../assets/icon/close.png" />
    </div>
   </template>
   <template #body>
    <div class="body_box" v-if="detailData.value">
      <div class="body_left">
        {{detailData.value.description}}
      </div>
      <div class="body_right">
        <div class="author">{{ detailData.value.author }} </div>
        <div class="journal">{{ detailData.value.journal }}</div>
        <div class="published_at">{{ detailData.value.published_at&& detailData.value.published_at.substr(0,10) }}&nbsp; Published</div>
        <div class="download-btn" @click="dowloadPdf(detailData.value.pdf_url)">
          DOWNLOAD
        </div>
      </div>
    </div>
   </template>
  </t-dialog>
</template>
<script setup>
/* eslint-disable camelcase */
import robotPng from '../../assets/icon/robot.png'
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import { reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const store = useStore()
const Data = reactive({
  arr: []
})
// 论文/新闻筛选
const checkedThesis = ref('thesis')
// 详情弹窗
const visible = ref(false)
function changeThesisOrNews (e) {
  console.log(e)
  params.per_page = 4
  if (e === 'thesis') {
    requestType.value = 'papersList'
  } else {
    requestType.value = 'newsList'
  }
  dataList()
}
const isHasMore = ref('')
const requestType = ref('papersList')
const params = reactive({
  per_page: 4,
  page: 1,
  is_draft: 0,
  by_date: 'all'
})
const dataList = () => {
  store.dispatch(requestType.value, params).then(res => {
    console.log(res)
    Data.arr = res.data
    isHasMore.value = res.links.next
  })
}
onMounted(() => {
  if (route.params.menu) {
    checkedThesis.value = route.params.menu
  }
  if (route.params.menu === 'thesis' || checkedThesis.value === 'thesis') {
    requestType.value = 'papersList'
  } else {
    requestType.value = 'newsList'
  }
  dataList()
})

const handleChange = (e) => {
  dataList()
  console.log(e)
}
// 论文弹窗详情
const detailData = reactive({})
const thesisDetail = id => {
  visible.value = true
  store.dispatch('paperDetail', { id: id, is_draft: params.is_draft }).then(res => {
    console.log(res)
    detailData.value = res
  })
}
// 下载论文
const dowloadPdf = (url) => {
}
// 新闻详情
const newsDetail = (id) => {
  store.dispatch('newsDetail', { id: id, is_draft: params.is_draft }).then(res => {
    if (res.tweet_url) {
      window.open(res.tweet_url)
    } else {
      router.push(`/manage/newsDetail?id=${id}?is_draft=${params.is_draft}`)
    }
  })
}
// 删除
const delListItem = (target, id) => {
  console.log(target)
  let requestMode = null
  const delparams = { is_draft: params.is_draft }
  if (target === '论文') {
    requestMode = 'delPpapers'
    delparams.papers_id = id
  } else {
    requestMode = 'delNews'
    delparams.news_id = id
  }

  const confirmDia = DialogPlugin.confirm({
    header: `确定要删除这篇${target}吗`,
    body: '删除后数据将不能恢复',
    confirmBtn: '确认',
    cancelBtn: '取消',
    theme: 'warning',
    onConfirm: ({ e }) => {
      store.dispatch(requestMode, delparams).then(res => {
        console.log(res)
        MessagePlugin.success('删除成功')
        dataList()
      })
      confirmDia.destroy()
    },
    onClose: () => {
      confirmDia.hide()
    }
  })
}
// 编辑
const editListItem = (id) => {
  if (checkedThesis.value === 'news') {
    router.push(`/upload/newsForm?id=${id}`)
  } else {
    router.push(`/upload/thesisForm?id=${id}`)
  }
}
// 加载更多
const moreData = () => {
  params.per_page += 4
  dataList()
}
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
