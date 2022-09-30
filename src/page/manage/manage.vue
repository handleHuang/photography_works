<template>
  <div class="manage">
    <div class="placeholder_box"></div>
    <div class="manage_box">
      <t-tabs v-model="tabValue" @change="handleChange">
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
        <t-radio-group v-model="by_date" @change="handleChange">
          <t-radio-button value="all">全部</t-radio-button>
          <t-radio-button value="recent_month">近一月</t-radio-button>
          <t-radio-button value="half_a_year">近半年</t-radio-button>
          <t-radio-button value="recent_year">近一年</t-radio-button>
        </t-radio-group>
      </div>
      <div class="content">
        <div v-if="Data.arr.length !== 0">
          <div
            class="content_item"
            v-for="(item, index) in Data.arr"
            :key="index"
          >
            <div class="item_left" v-if="checkedThesis == 'news'">
              <img src="../../assets/icon/robot.png" alt="" />
            </div>
            <div class="item_right">
              <div class="description_text">{{ item.title }}</div>
              <div class="record">
                <div style="height:24px">
                  {{ item.username }}
                  <span v-if="tabValue == '1'"> &nbsp;发布于&nbsp; </span
                  ><span v-else> &nbsp;保存于&nbsp; </span>
                  {{ item.updated_at }}
                </div>
                <span v-if="tabValue == 0" class="tag_span">已发布</span>
              </div>
            </div>
            <div class="del_icon">
              <t-icon name="delete" />
            </div>
          </div>
        </div>
        <div class="empty" v-else>暂无数据</div>
      </div>
      <div class="more">加载更多</div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable camelcase */
import { reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const Data = reactive({
  arr: [
    {
      description:
        'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle',
      author: 'ukashou',
      operationTime: '2022/06/28'
    },
    {
      description:
        'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle',
      author: 'ukashou',
      operationTime: '2022/06/28'
    },
    {
      description:
        'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle',
      author: 'ukashou',
      operationTime: '2022/06/28'
    },
    {
      description:
        'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle',
      author: 'ukashou',
      operationTime: '2022/06/28'
    }
  ]
})
// 论文/新闻筛选
const checkedThesis = ref('thesis')

function changeThesisOrNews (e) {
  console.log(e)
  if (e === 'thesis') {
    // Data.arr = [
    //   {
    //     description:
    //       'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle',
    //     author: 'ukashou',
    //     operationTime: '2022/06/28'
    //   },
    //   {
    //     description:
    //       'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle',
    //     author: 'ukashou',
    //     operationTime: '2022/06/28'
    //   },
    //   {
    //     description:
    //       'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle',
    //     author: 'ukashou',
    //     operationTime: '2022/06/28'
    //   },
    //   {
    //     description:
    //       'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle',
    //     author: 'ukashou',
    //     operationTime: '2022/06/28'
    //   }
    // ]
    requestType.value = 'papersList'
  } else {
    // Data.arr = [
    //   {
    //     cover: require('../../assets/icon/robot.png'),
    //     description: '利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习',
    //     author: 'ukashou',
    //     operationTime: '2022/06/28'
    //   },
    //   {
    //     cover: require('../../assets/icon/新闻.svg'),
    //     description:
    //       '利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习，利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习',
    //     author: 'ukashou',
    //     operationTime: '2022/06/28'
    //   },
    //   {
    //     cover: require('../../assets/icon/robot.png'),
    //     description: '利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习',
    //     author: 'ukashou',
    //     operationTime: '2022/06/28'
    //   },
    //   {
    //     cover: require('../../assets/icon/论文.svg'),
    //     description: '利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习',
    //     author: 'ukashou',
    //     operationTime: '2022/06/28'
    //   },
    //   {
    //     cover: require('../../assets/icon/robot.png'),
    //     description: '利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习',
    //     author: 'ukashou',
    //     operationTime: '2022/06/28'
    //   }
    // ]
    requestType.value = 'newsList'
  }
  dataList()
}
const by_date = ref('all')
const requestType = ref('papersList')
function dataList () {
  const params = {
    per_page: 5,
    page: 1,
    is_draft: tabValue.value,
    by_date: by_date.value
  }
  store.dispatch(requestType.value, params).then(res => {
    console.log(res)
    Data.arr = res.data
  })
}
onMounted(() => {
  dataList()
})
const tabValue = ref(0)
function handleChange (e) {
  dataList()
  console.log(e)
}
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
