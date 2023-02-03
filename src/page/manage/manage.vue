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
            class="content_item"
            v-for="(item, index) in Data.arr"
            :key="index"
          >
            <div class="item_left" v-if="checkedThesis == 'news'">
              <img
                :src="
                  item.cover
                    ? 'https://robot-1252839081.cos.ap-guangzhou.myqcloud.com/' +
                      item.cover
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
              v-if="params.is_draft == 0"
              class="del_icon"
              @click="delListItem(item.cover ? '新闻' : '论文', item.id)"
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
      <!-- <div class="more"  v-if="isHasMore">
        <span @click="moreData">加载更多</span>
      </div>
      <t-divider  v-else>没有更多了</t-divider> -->
    </div>
  </div>
</template>
<script setup>
/* eslint-disable camelcase */
import robotPng from '../../assets/icon/robot.png'
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import { reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useStore()
const Data = reactive({
  arr: []
})
// 论文/新闻筛选
const checkedThesis = ref('thesis')

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
// const params.is_draft = ref(0)
// const by_date = ref('all')
const requestType = ref('papersList')
const params = reactive({
  per_page: 4,
  page: 1,
  is_draft: 0,
  by_date: 'all'
})
function dataList () {
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
  if (route.params.menu === 'thesis') {
    requestType.value = 'papersList'
  } else {
    requestType.value = 'newsList'
  }
  dataList()
})

function handleChange (e) {
  dataList()
  console.log(e)
}
// 删除新闻
function delListItem (target, id) {
  console.log(target)
  let requestMode = null
  if (target === '论文') requestMode = 'delPpapers'
  else requestMode = 'delNews'

  const confirmDia = DialogPlugin.confirm({
    header: `确定要删除这篇${target}吗`,
    body: '删除后数据将不能恢复',
    confirmBtn: '确认',
    cancelBtn: '取消',
    theme: 'warning',
    onConfirm: ({ e }) => {
      store.dispatch(requestMode, id).then(res => {
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
// 加载更多
function moreData () {
  params.per_page += 4
  dataList()
}
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
