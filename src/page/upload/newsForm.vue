<template>
  <div class="containerForm">
    <div class="page__breadcrumb back__breadcrumb">
      <div class="goback" @click="goBack">
        <t-icon name="chevron-left" />
        返回首页
      </div>
      <!-- newsFormData.obj{{ newsFormData.obj }} -->
    </div>
    <div class="containerForm_box">
      <div class="containerForm_header">
        <t-steps v-model="activeStep" :options="steps" :readonly="true" />
        <!-- :readonly="true"  -->
      </div>
      <div class="containerForm_body">
        <t-form
          ref="resetFormData"
          :label-width="95"
          :rules="rules"
          :data="newsFormData.obj"
          label-align="top"
          @submit="onSubmit"
        >
          <div class="step_1" v-show="activeStep == 1">
            <t-form-item label="新闻内容" class="contentFormItem" :name="contentMode==1?'content':'tweet_url'">
               <t-radio-group v-model="contentMode" @change="contentModeChange">
                <t-radio :value="1">富文本</t-radio>
                <t-radio :value="2">公众号链接</t-radio>
              </t-radio-group>
              <RichText
               v-if="contentMode == 1"
                :widthHeight="[400, 597]"
                :value="newsFormData.obj.content"
                @input="inputRich"
              />
              <t-input
                v-if="contentMode == 2"
                v-model="newsFormData.obj.tweet_url"
                type="text"
                placeholder="请粘贴已在公众号发布的文章链接，官网将直接跳转公众号链接"
                @blur="onBlur"
              ></t-input>
            </t-form-item>
            <!-- <t-form-item label="公众号链接" name="tweet_url" help="请粘贴已在公众号发布的文章链接，官网将直接跳转公众号链接">
              <t-input
                v-model="newsFormData.obj.tweet_url"
                type="text"
                placeholder="请输入内容"
                @blur="onBlur"
              ></t-input>
            </t-form-item> -->
            <t-form-item :class="{bg_eee:contentMode == 2}" label="新闻标题" name="title">
              <t-textarea
                autosize
                v-model="newsFormData.obj.title"
                type="text"
                :disabled="contentMode == 2"
                :placeholder="contentMode == 2?'自动抓取标题会展示在这里':'请输入内容'"
              ></t-textarea>
            </t-form-item>
            <t-form-item v-if="contentMode == 2" :class="{bg_eee:contentMode == 2}"  label="发布日期" name="publish_date">
              <t-textarea
                autosize
                disabled
                v-model="newsFormData.obj.publish_date"
                type="text"
                placeholder="自动抓取日期会展示在这里"
              ></t-textarea>
              <!-- <t-date-picker v-model="newsFormData.obj.publish_date" v-else/> -->
            </t-form-item>
            <t-form-item label="新闻摘要" name="abstract">
              <t-textarea
                type="text"
                placeholder="请输入更多内容"
                v-model="newsFormData.obj.abstract"
                :maxlength="30"
              ></t-textarea>
            </t-form-item>
            <t-form-item
              name="file"
              label="新闻封面上传"
              help="请选择JPG/PNG格式图片，大小 * ， M以内"
            >
              <test
                theme="image"
                accept="image/jpeg,image/png"
                @fileSuccessData="fileSuccessData"
                @clearData="clearData"
                :fileInfo="fileInfo.arr"
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
                      contentMode == 2&&newsFormData.obj.publish_date?newsFormData.obj.publish_date:contentMode == 1&&is_timing==0?getDay(0):newsFormData.obj.publish_at.substr(0,10)
                    }}</span>
                    <h4 class="title">
                      {{
                        ellipsis_1(
                          newsFormData.obj.title ||
                            '利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习'
                        )
                      }}
                    </h4>
                  </div>
                  <div class="previewNews_N2">
                    <span class="introduce">
                      {{
                        ellipsis_2(
                          newsFormData.obj.abstract ||
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
                      contentMode == 2&&newsFormData.obj.publish_date?newsFormData.obj.publish_date:contentMode == 1&&is_timing==0?getDay(0):newsFormData.obj.publish_at.substr(0,10)
                    }}</span>
                    <h4 class="title">
                      {{
                        newsFormData.obj.title ||
                          '利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习'
                      }}
                    </h4>
                    <span class="introduce">
                      {{
                        newsFormData.obj.abstract ||
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
            <t-form-item class="delLabel" v-if="is_timing">
              <div class="flex_box">
                <t-select
                  v-model="selected"
                  :options="dayOptions"
                  placeholder="请选择"
                />
                <t-time-picker
                  v-model="publishTime"
                  format="HH:mm"
                />
              </div>
            </t-form-item>
            <t-form-item class="delLabel">
              <t-button theme="default"  variant="base" @click="preStep">上一步</t-button>
              <t-button theme="default"  variant="base" @click="toNewsDetail">完整预览</t-button>
              <t-button theme="primary" @click="onSubmit" type="submit"
                >发布</t-button
              >
            </t-form-item>
          </div>
        </t-form>
        <div class="step_3" v-show="activeStep == 3">
          <div class="step_3Box">
            <div class="icon_box">
              <t-icon name="check-circle" style="color: green" />
            </div>
            <h4 v-if="route.query.id">编辑成功</h4>
            <h4 v-else>{{is_timing?'定时发布成功':'发布成功'}}</h4>
            <h6 v-if="route.query.id">恭喜，新闻已编辑成功 </h6>
            <h6 v-else>{{is_timing?'新闻将在预定的时间发布':'恭喜，新闻已发布成功'}}</h6>
            <div class="operation">
              <t-button theme="default" @click="checkStatus">查看状态</t-button>
              <t-button theme="primary" @click="toWebsite">去官网</t-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable camelcase */
import RichText from '../../components/RichText.vue'
import { getDay } from '../../utils /transfertime'
import robotPng from '../../assets/icon/robot.png'
import test from '../../components/test.vue'
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next'
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const route = useRoute()
const fileInfo = reactive({ arr: [] })
const activeStep = ref(1)
const selected = ref('今天')
const myDate = new Date()
const hh = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
const mm = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
const publishTime = ref(hh + ':' + mm)
onMounted(() => {
  if (selected.value === '今天') {
    newsFormData.obj.publish_at = getDay(0) + ' ' + publishTime.value + ':00'
    const c = new Date(Date.parse(newsFormData.obj.publish_at) + 15 * 60 * 1000).toLocaleString()
    const date = new Date(c)
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
    publishTime.value = h + ':' + m
  } else {
    newsFormData.obj.publish_at = getDay(1) + ' ' + publishTime.value + ':00'
  }
  if (route.query.id) {
    store
      .dispatch('newsDetail', { id: route.query.id, is_draft: 1 })
      .then(res => {
        console.log(res)
        if (res.latest_file) {
          res.file = res.latest_file
          fileInfo.arr.push({
            name: res.file.original_name,
            status: 'success',
            size: res.file.size,
            url: 'https://robot-1252839081.cos.ap-guangzhou.myqcloud.com/' + res.file.path
          })
        }
        res.publish_date = res.created_at
        delete res.latest_file
        newsFormData.obj = { ...res }
      })
  }
})

const dayOptions = [
  { label: '今天', value: '今天' },
  { label: '明天', value: '明天' }
]
const steps = [
  { title: '基本信息', value: 1 },
  { title: '预览信息', value: 2 },
  { title: '完成', value: 3 }
]
const resetFormData = ref(null)
const contentMode = ref(1)
const inputRich = emit => {
  newsFormData.obj.content = emit
}
const contentModeChange = (e) => {
  if (e === 2 && newsFormData.obj.tweet_url !== '') {
    onBlur()
  }
  // newsFormData.obj.title = ''
  // newsFormData.obj.publish_date = ''
  resetFormData.value.reset()
}
const rules = reactive({
  tweet_url: [
    { required: true, message: '公众号链接必填', type: 'error', trigger: 'change' }
  ],
  content: [{ required: true, message: '新闻内容必填', type: 'error', trigger: 'change' }],
  title: [{ required: true, message: '论文标题必填', type: 'error', trigger: 'change' }],
  publish_date: [{ required: true, message: '发布时间必填', type: 'error', trigger: 'change' }],
  abstract: [{ required: true, message: '论文摘要必填', type: 'error', trigger: 'change' }],
  file: [{ required: true, message: '新闻封面必传', type: 'error', trigger: 'change' }]
})
watch(
  () => [selected.value, publishTime.value],
  e => {
    if (e[0] === '今天') {
      newsFormData.obj.publish_at = getDay(0) + ' ' + publishTime.value + ':00'
    } else {
      newsFormData.obj.publish_at = getDay(1) + ' ' + publishTime.value + ':00'
    }
  }
)

const newsFormData = reactive({
  obj: {
    tweet_url: '',
    title: '',
    publish_at: getDay(0),
    publish_date: '', // 推文发布日期
    abstract: '',
    file: [],
    content: ''
  }
})
const is_timing = ref(false)
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
  if (newsFormData.obj.tweet_url !== '') {
    store
      .dispatch('resolveTweet', { tweet_url: newsFormData.obj.tweet_url })
      .then(res => {
        newsFormData.obj.title = res.title
        newsFormData.obj.publish_date =
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
  imageData.obj = { ...data }
  newsFormData.obj.file = { ...data }
}
// 提交上传
function onSubmit (e) {
  const params = {
    title: newsFormData.obj.title,
    // tweet_url: newsFormData.obj.tweet_url,
    abstract: newsFormData.obj.abstract,
    file: newsFormData.obj.file
    // content: newsFormData.obj.content
  }
  if (route.query.id) {
    params.newsDraft_id = route.query.id
  }
  if (e.validateResult === true) {
    console.log(newsFormData.obj.publish_at)
    if (e.e.submitter.innerText === '保存草稿') {
      params.is_published = 0
      params.is_timing = 0
    } else if (e.e.submitter.innerText === '发布' && is_timing.value) {
      params.is_published = 0
      params.is_timing = 1
      params.published_at = newsFormData.obj.publish_at
    } else {
      params.is_published = 1
      params.is_timing = 0
      // params.published_at = newsFormData.obj.publish_at + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':00'
    }
    if (contentMode.value === 1) {
      params.content = newsFormData.obj.content
    } else {
      params.tweet_url = newsFormData.obj.tweet_url
    }
    store.dispatch(route.query.id ? 'editNews' : 'addNews', params).then(res => {
      if (e.e.submitter.innerText === '保存草稿') {
        MessagePlugin.success(
          `${myDate.getHours() + ':' + myDate.getMinutes() + '已保存草稿'}`
        )
      } else {
        activeStep.value += 1
        resetFormData.value.reset()
      }
      console.log(res)
    }).catch(err => {
      console.log(err.response.data)
      if (err.response.data.message === 'validation.date_format' && is_timing.value) {
        MessagePlugin.error('定时发布的时间必须选择完整')
      }
    })
  }
  if (e.firstError && e.firstError !== '') {
    MessagePlugin.warning(e.firstError)
  }
}
const toWebsite = () => {
  window.open('https://demo.zjtntd.com/jian/robotics-x/dist/#/', '_blank')
}
const checkStatus = () => {
  router.push({
    name: 'manage',
    params: {
      menu: 'news'
    }
  })
}
watch(
  () => imageData.obj,
  e => {
    newsFormData.obj.file = { ...e }
  }
)
// watch(
//   () => contentMode.value,
//   e => {
//     resetFormData.value.reset()
//   },
//   {
//     deep: true
//   }
// )
function clearData () {
  imageData.obj = {}
}
function nextStep () {
  activeStep.value += 1
}
function preStep () {
  activeStep.value -= 1
}
const toNewsDetail = () => {
  if (newsFormData.obj.tweet_url) {
    window.open(newsFormData.obj.tweet_url)
  } else {
    router.push('/manage/newsDetail')
  }
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
