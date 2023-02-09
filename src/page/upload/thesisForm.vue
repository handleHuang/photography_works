<template>
  <div class="containerForm">
    <div class="page__breadcrumb back__breadcrumb">
      <div class="goback" @click="goBack">
        <t-icon name="chevron-left" />
        返回首页
      </div>
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
          :data="thesisFormData"
          @submit="onSubmit"
          label-align="top"
        >
          <div class="step_1" v-show="activeStep == 1">
            <t-form-item label="论文标题" name="title">
              <t-textarea
                v-model="thesisFormData.title"
                type="text"
                placeholder="请输入标题"
                :maxlength="30"
              ></t-textarea>
            </t-form-item>
            <t-form-item
              label="论文作者"
              name="author"
              help="多位作者使用,分隔"
            >
              <t-textarea
                type="text"
                placeholder="请输入作者"
                v-model="thesisFormData.author"
              ></t-textarea>
            </t-form-item>
            <t-form-item label="投稿会议/期刊名称" name="journal">
              <t-input
                type="text"
                placeholder="请输入内容"
                v-model="thesisFormData.journal"
              ></t-input>
            </t-form-item>
            <t-form-item label="发布时间" name="publish_date">
              <t-date-picker
                clearable
                theme="primary"
                mode="date"
                v-model="thesisFormData.publish_date"
              />
            </t-form-item>
            <t-form-item label="论文摘要" name="description">
              <t-textarea
                type="text"
                placeholder="请输入更多内容"
                v-model="thesisFormData.description"
                :maxlength="300"
              ></t-textarea>
            </t-form-item>
            <!-- <t-form-item
              name="keyword"
              label="论文关键词"
              help="限制5个关键词以内，用空格隔开多个关键词"
            >
              <t-input
                v-model="thesisFormData.keyword"
                type="text"
                placeholder="请输入内容"
              ></t-input>
            </t-form-item>
            <t-form-item
              label="产品主题关键词"
              help="如有对应关联的实验室产品，请选择对应产品名称，或输入创建新关键词"
            >
              <t-select
                v-model="selected"
                :options="options"
                placeholder="请选择云解决方案"
              />
            </t-form-item> -->
            <t-form-item
              name="pdf_url"
              label="论文PDF上传"
              help="额外提示语，文字过多时宽度折行"
            >
            <test @fileSuccessData="fileSuccessData" @clearData="clearData"></test>
            </t-form-item>
            <t-form-item class="delLabel">
              <t-button theme="primary" @click="nextStep">下一步</t-button>
              <t-button theme="default" type="submit">保存草稿</t-button>
            </t-form-item>
          </div>
          <div class="step_2" v-show="activeStep == 2">
            <div class="controls_238">
              <t-form-item label="论文中心预览">
                <div class="previewNews">
                  <div class="previewNews_N1">
                    <span class="time">{{
                      thesisFormData.publish_date || '2022 / 06 / 28'
                    }}</span>
                    <h4 class="title">
                      {{
                        ellipsis_1(
                          thesisFormData.title ||
                          'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle'
                        )
                      }}
                    </h4>
                  </div>
                  <div class="previewNews_N2">
                    <div class="introduce">
                      {{thesisFormData.author ||'Haoyu Wang, Jiaqi Wang, Kunming Yao, Jingjing Fu, Xin Xia,Ruirui Zhang, Jiyu Li,Guoqiang Xu, Lingyun Wang, JingchaoYang, Jie Lai, Yuan Dai*, Zhengyou Zhang, Anyin Li, Yuyan Zhu,sXinge Yu, Zhong Lin Wang*, Yunlong Zi*'}}
                      </div>
                      <div class="introduce_end">
                        {{thesisFormData.journal||'IEEE IROS 2020 Measurement Science and Technology'}}
                      </div>
                  </div>
                </div>
              </t-form-item>
            </div>
            <div class="controls_237">
              <t-form-item label="首页预览">
                <div class="previewHome">
                  <div class="preview_H1">
                    <span class="time">{{
                      thesisFormData.publish_date || '2022 / 06 / 28'
                    }}</span>
                   <h4 class="title">
                      {{
                        ellipsis_1(
                          thesisFormData.title ||
                          'Gain Scheduled Controller Design for Balancing an Autonomous Bicycle'
                        )
                      }}
                    </h4>
                    <span class="introduce">
                      {{thesisFormData.journal||'IEEE IROS 2020 Measurement Science and Technology'}}
                    </span>
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
              <t-button @click="preStep">上一步</t-button>
              <t-button theme="primary" type="submit" @click="onSubmit"
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
            <h4>{{is_timing?'定时发布成功':'发布成功'}}</h4>
            <h6>{{is_timing?'论文将在预定的时间发布':'恭喜，论文已发布成功'}}</h6>
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
import { getDay } from '../../utils /transfertime'
import test from '../../components/test.vue'
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next'
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const activeStep = ref(1)
const selected = ref('今天')
const myDate = new Date()
const hh = myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
const mm = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
const publishTime = ref(hh + ':' + mm)
onMounted(() => {
  if (selected.value === '今天') {
    thesisFormData.publish_at = getDay(0) + ' ' + publishTime.value + ':00'
    const c = new Date(Date.parse(thesisFormData.publish_at) + 15 * 60 * 1000).toLocaleString()
    const date = new Date(c)
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
    publishTime.value = h + ':' + m
  } else {
    thesisFormData.publish_at = getDay(1) + ' ' + publishTime.value + ':00'
  }
})
// const options = [
//   { label: '无', value: '0' },
//   { label: 'Max', value: '1' },
//   { label: 'Ollie', value: '2' },
//   { label: '自平衡车/RoBicycle', value: '3' },
//   { label: 'Jamoca', value: '4' }
// ]
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
  title: [{ required: true, message: '论文标题必填', type: 'error' }],
  author: [{ required: true, message: '论文作者必填', type: 'error' }],
  journal: [{ required: true, message: '投稿会议/期刊名称必填', type: 'error' }],
  publish_date: [{ required: true, message: '发布时间必选', type: 'error' }],
  description: [{ required: true, message: '论文摘要必填', type: 'error' }],
  pdf_url: [{ required: true, message: '论文PDF必传', type: 'error' }]
})
watch(
  () => [selected.value, publishTime.value],
  e => {
    if (e[0] === '今天') {
      thesisFormData.publish_at = getDay(0) + ' ' + publishTime.value
    } else {
      thesisFormData.publish_at = getDay(1) + ' ' + publishTime.value
    }
  }
)
const thesisFormData = reactive({
  title: '',
  author: '',
  journal: '',
  description: '',
  publish_at: getDay(0),
  pdf_url: '',
  publish_date: '' // 论文发布日期
  // keyword: ''
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
const pdfData = reactive({ obj: {} })
function fileSuccessData (data) {
  pdfData.obj = data
  thesisFormData.pdf_url = data.url
}
// 提交上传
function onSubmit (e) {
  const params = {
    title: thesisFormData.title,
    journal: thesisFormData.journal,
    author: thesisFormData.author,
    description: thesisFormData.description,
    pdf_url: pdfData.obj.path
  }
  if (e.validateResult === true) {
    if (e.e.submitter.innerText === '保存草稿') {
      params.is_published = 0
      params.is_timing = 0
    } else if (e.e.submitter.innerText === '发布' && is_timing.value) {
      params.is_published = 0
      params.is_timing = 1
      params.published_at = thesisFormData.publish_at + ':00'
    } else {
      params.is_published = 1
      params.is_timing = 0
    }
    store.dispatch('addPapers', params).then(res => {
      const myDate = new Date()
      if (e.e.submitter.innerText === '保存草稿') {
        MessagePlugin.success(
          `${myDate.getHours() + ':' + myDate.getMinutes() + '已保存草稿'}`
        )
      } else activeStep.value += 1
      console.log(res)
    }).catch(err => {
      console.log(err.response.data)
      if (err.response.data.message === 'validation.date_format') {
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
      menu: 'thesis'
    }
  })
}
watch(
  () => pdfData.obj,
  e => {
    thesisFormData.pdf_url = e.url
  }
)
function clearData () {
  pdfData.obj = {}
}

function nextStep () {
  activeStep.value += 1
}
function preStep () {
  activeStep.value -= 1
}

function ellipsis_1 (value) {
  if (!value) return ''
  if (value.length > 68) {
    return value.slice(0, 68) + '...'
  }
  return value
}
</script>

<style
  lang="less"
  scoped
  src="../../assets/style/upload/thesisForm.less"
></style>
