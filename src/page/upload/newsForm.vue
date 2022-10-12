<template>
  <div class="containerForm">
    <div class="page__breadcrumb back__breadcrumb">
      <div class="goback" @click="goBack">
        <t-icon name="chevron-left" />
        返回首页
      </div>
      <!-- newsFormData{{ newsFormData }} -->
    </div>
    <div class="containerForm_box">
      <div class="containerForm_header">
        <t-steps v-model="activeStep" :options="steps" />
        <!-- :readonly="true"  -->
      </div>
      <div class="containerForm_body">
        <t-form
          :label-width="95"
          :rules="rules"
          :data="newsFormData"
          label-align="top"
          @submit="onSubmit"
        >
          <div class="step_1" v-show="activeStep == 1">
            <t-form-item label="公众号链接" name="tweet_url">
              <t-input
                v-model="newsFormData.tweet_url"
                type="text"
                placeholder="请输入内容"
                @blur="onBlur"
              ></t-input>
            </t-form-item>
            <t-form-item class="bg_eee" label="新闻标题" name="title">
              <t-textarea
                autosize
                v-model="newsFormData.title"
                type="text"
                disabled
                placeholder="自动抓取标题会展示在这里"
              ></t-textarea>
            </t-form-item>
            <t-form-item class="bg_eee" label="发布日期" name="publish_date">
              <t-textarea
                autosize
                disabled
                v-model="newsFormData.publish_date"
                type="text"
                placeholder="自动抓取日期会展示在这里"
              ></t-textarea>
            </t-form-item>
            <t-form-item label="新闻摘要" name="abstract">
              <t-textarea
                type="text"
                placeholder="请输入更多内容"
                v-model="newsFormData.abstract"
                :maxlength="30"
              ></t-textarea>
            </t-form-item>
            <t-form-item
              name="cover"
              label="新闻封面上传"
              help="请选择JPG/PNG格式图片，大小 * ， M以内"
            >
              <test
                theme="image"
                accept="image/jpeg,image/png"
                @fileSuccessData="fileSuccessData"
                @clearData="clearData"
              ></test>
            </t-form-item>
            <t-form-item class="delLabel">
              <t-button theme="primary" @click="nextStep">下一步</t-button>
              <t-button theme="default" type="submit">保存草稿</t-button>
            </t-form-item>
          </div>
          <div class="step_2" v-show="activeStep == 2">
            <div class="controls_238">
              <t-form-item label="新闻中心预览">
                <div class="previewNews">
                  <div class="previewNews_N1">
                    <span class="time">{{
                      newsFormData.publish_date || '2022 / 06 / 28'
                    }}</span>
                    <h4 class="title">
                      {{
                        ellipsis_1(
                          newsFormData.title ||
                            '利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习'
                        )
                      }}
                    </h4>
                  </div>
                  <div class="previewNews_N2">
                    <span class="introduce">
                      {{
                        ellipsis_2(
                          newsFormData.abstract ||
                            '本文介绍腾讯 Robotics X实验室与腾讯游戏学堂、腾讯互娱旗下START团队联合宣布发起游戏驱动机器人加速智能学习项目。'
                        )
                      }}
                    </span>
                  </div>
                </div>
              </t-form-item>
            </div>
            <div class="controls_237">
              <t-form-item label="首页预览">
                <div class="previewHome">
                  <div class="preview_H1">
                    <span class="time">{{
                      newsFormData.publish_date || '2022 / 06 / 28'
                    }}</span>
                    <h4 class="title">
                      {{
                        newsFormData.title ||
                          '利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习'
                      }}
                    </h4>
                    <span class="introduce">
                      {{
                        newsFormData.abstract ||
                          '本文介绍腾讯 Robotics X实验室与腾讯游戏学堂、腾讯互娱旗下START团队联合宣布发起游戏驱动机器人加速智能学习项目。'
                      }}
                    </span>
                  </div>
                  <div class="preview_H2">
                    <img :src="imageData.obj.url || robotPng" alt="" />
                  </div>
                </div>
              </t-form-item>
            </div>
            <t-form-item label="定时发布" help="可以选择今明任意时间发布">
              <t-switch v-model="is_timing" size="large"></t-switch>
            </t-form-item>
            <t-form-item class="delLabel">
              <div class="flex_box">
                <t-select
                  v-model="selected"
                  :options="dayOptions"
                  placeholder="请选择"
                />
                <t-time-picker
                  v-model="publishTime"
                  format="HH:mm:ss"
                  :steps="[1, 60, 60]"
                />
              </div>
            </t-form-item>
            <t-form-item class="delLabel">
              <t-button @click="preStep">上一步</t-button>
              <t-button theme="primary" @click="onSubmit" type="submit"
                >发布</t-button
              >{{ newsFormData.publish_at }}
            </t-form-item>
          </div>
        </t-form>
        <div class="step_3" v-show="activeStep == 3">
          <div class="step_3Box">
            <div class="icon_box">
              <t-icon name="check-circle" style="color: green" />
            </div>
            <h4>{{is_timing?'定时发布成功':'发布成功'}}</h4>
            <h6>{{is_timing?'新闻将在预定的时间发布':'恭喜，新闻已发布成功'}}</h6>
            <div class="operation">
              <t-button theme="default">查看状态</t-button>
              <t-button theme="primary">去官网</t-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable camelcase */
import { getDay } from '../../utils /transfertime'
import robotPng from '../../assets/icon/robot.png'
import test from '../../components/test.vue'
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next'
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const activeStep = ref(1)
const selected = ref('今天')
const publishTime = ref('')
const dayOptions = [
  { label: '今天', value: '今天' },
  { label: '明天', value: '明天' }
]
const steps = [
  { title: '基本信息', value: 1 },
  { title: '预览信息', value: 2 },
  { title: '完成', value: 3 }
]
const rules = reactive({
  tweet_url: [
    { required: true, message: '公众号链接必填', type: 'error' }
    // {
    //   pattern: /(^((https|ftp|http|file):\/\/)|www\.)*([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/gm,
    //   message: '必须是一个链接',
    //   type: 'error'
    // }
  ],
  title: [{ required: true, message: '论文标题必填', type: 'error' }],
  publish_date: [{ required: true, message: '发布时间必填', type: 'error' }],
  abstract: [{ required: true, message: '论文摘要必填', type: 'error' }],
  cover: [{ required: true, message: '新闻封面必传', type: 'error' }]
})
watch(
  () => [selected.value, publishTime.value],
  e => {
    console.log(e)
    if (e[0] === '今天') {
      newsFormData.publish_at = getDay(0) + ' ' + publishTime.value
    } else {
      newsFormData.publish_at = getDay(1) + ' ' + publishTime.value
    }
  }
)

const newsFormData = reactive({
  tweet_url: '',
  title: '',
  publish_at: getDay(0),
  publish_date: '', // 推文发布日期
  abstract: '',
  cover: ''
})
const is_timing = ref(true)
function goBack () {
  const confirmDia = DialogPlugin.confirm({
    header: '确定要离开吗',
    body: '离开将丢失未保存的内容',
    confirmBtn: '确认离开',
    cancelBtn: '留在当前',
    theme: 'warning',
    onConfirm: ({ e }) => {
      router.push('/')
      // 请求成功后，销毁弹框
      confirmDia.destroy()
    },
    onClose: ({ e, trigger }) => {
      console.log('e: ', e)
      console.log('trigger: ', trigger)
      confirmDia.hide()
    }
  })
}
function onBlur () {
  if (newsFormData.tweet_url !== '') {
    store
      .dispatch('resolveTweet', { tweet_url: newsFormData.tweet_url })
      .then(res => {
        newsFormData.title = res.title
        newsFormData.publish_date =
          res.publish_date.substr(0, 4) +
          ' / ' +
          res.publish_date.substr(5, 2) +
          ' / ' +
          res.publish_date.substr(8, 2)
        console.log(res)
      })
  }
}
const imageData = reactive({ obj: {} })
function fileSuccessData (data) {
  imageData.obj = data
  newsFormData.cover = data.url
  console.log(data, 'data')
}
// 提交上传
function onSubmit (e) {
  const params = {
    title: newsFormData.title,
    tweet_url: newsFormData.tweet_url,
    abstract: newsFormData.abstract,
    cover: imageData.obj.path
  }
  console.log(e)
  if (e.validateResult === true) {
    if (e.e.submitter.innerText === '保存草稿') {
      params.is_published = 0
      params.is_timing = 0
    } else if (e.e.submitter.innerText === '发布' && is_timing.value) {
      params.is_published = 0
      params.is_timing = 1
      params.published_at = newsFormData.publish_at
    } else {
      params.is_published = 1
      params.is_timing = 0
    }
    store.dispatch('addNews', params).then(res => {
      const myDate = new Date()
      if (e.e.submitter.innerText === '保存草稿') {
        MessagePlugin.success(
          `${myDate.getHours() + ':' + myDate.getMinutes() + '已保存草稿'}`
        )
      } else activeStep.value += 1
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
  if (e.firstError !== '') {
    MessagePlugin.warning(e.firstError)
  }
}
watch(
  () => imageData.obj,
  e => {
    newsFormData.cover = e.url
  }
)
function clearData () {
  imageData.obj = {}
}
function nextStep () {
  activeStep.value += 1
}
function preStep () {
  activeStep.value -= 1
}

function ellipsis_1 (value) {
  if (!value) return ''
  if (value.length > 32) {
    return value.slice(0, 32) + '...'
  }
  return value
}
function ellipsis_2 (value) {
  if (!value) return ''
  if (value.length > 20) {
    return value.slice(0, 20) + '...'
  }
  return value
}
</script>

<style lang="less" scoped src="../../assets/style/upload/newsForm.less"></style>
