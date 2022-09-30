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
        <t-steps v-model="activeStep" :options="steps" :readonly="true" />
      </div>
      <div class="containerForm_body">
        <t-form
          :label-width="95"
          :rules="rules"
          :data="thesisFormData"
          label-align="top"
        >
          <div class="step_1" v-if="activeStep == 1">
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
            <t-form-item label="投稿会议/期刊名称" name="meeting">
              <t-input
                type="text"
                placeholder="请输入内容"
                v-model="thesisFormData.meeting"
              ></t-input>
            </t-form-item>
            <t-form-item label="发布时间" name="releaseTime">
              <t-date-picker
                clearable
                theme="primary"
                mode="date"
                v-model="thesisFormData.releaseTime"
              />
            </t-form-item>
            <t-form-item label="论文摘要" name="digest">
              <t-textarea
                type="text"
                placeholder="请输入更多内容"
                v-model="thesisFormData.digest"
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
              label="论文PDF上传"
              help="额外提示语，文字过多时宽度折行"
            >
              <t-upload
                v-model="files"
                :auto-upload="autoUpload"
                :theme="display"
                :data="{ extra_data: 123, file_name: 'certificate' }"
                draggable
                action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
              />
            </t-form-item>
            <t-form-item class="delLabel">
              <t-button theme="primary" @click="nextStep">下一步</t-button>
              <t-button theme="default" @click="saveClick">保存草稿</t-button>
            </t-form-item>
          </div>
          <div class="step_2" v-if="activeStep == 2">
            <div class="controls_238">
              <t-form-item label="论文中心预览">
                <div class="previewNews">
                  <div class="previewNews_N1">
                    <span class="time">2022 / 06 / 28</span>
                    <h4 class="title">
                      {{ellipsis_1('Gain Scheduled Controller Design for Balancing an Autonomous Bicycle')}}
                    </h4>
                  </div>
                  <div class="previewNews_N2">
                    <div class="introduce">
                      Haoyu Wang, Jiaqi Wang, Kunming Yao, Jingjing Fu, Xin Xia,Ruirui Zhang, Jiyu Li,Guoqiang Xu, Lingyun Wang, JingchaoYang, Jie Lai, Yuan Dai*, Zhengyou Zhang, Anyin Li, Yuyan Zhu,sXinge Yu, Zhong Lin Wang*, Yunlong Zi*
                      </div>
                      <div class="introduce_end">
                        IEEE IROS 2020<br/>
                        Measurement Science and Technology
                      </div>
                  </div>
                </div>
              </t-form-item>
            </div>
            <div class="controls_237">
              <t-form-item label="首页预览">
                <div class="previewHome">
                  <div class="preview_H1">
                    <span class="time">2022 / 06 / 28</span>
                    <h4 class="title">
                      Gain Scheduled Controller Design for Balancing an Autonomous Bicycle
                    </h4>
                    <span class="introduce">
                      IEEE IROS 2020<br/>
                      Measurement Science and<br/>
                      Technology
                    </span>
                  </div>
                </div>
              </t-form-item>
            </div>
            <t-form-item label="定时发布" help="可以选择今明任意时间发布">
              <t-switch v-model="switchChecked" size="large"></t-switch>
            </t-form-item>
            <t-form-item class="delLabel">
              <div class="flex_box">
                <t-select
                  v-model="selected"
                  :options="dayOptions"
                  placeholder="请选择"
                />
                <t-time-picker format="HH:mm" />
              </div>
            </t-form-item>
            <t-form-item class="delLabel">
              <t-button @click="preStep">上一步</t-button>
              <t-button theme="primary" type="submit" @click="submit"
                >发布</t-button
              >
            </t-form-item>
          </div>
          <div class="step_3" v-if="activeStep == 3">
            <div class="icon_box">
              <t-icon name="check-circle" style="color: green" />
            </div>
            <h4>发布成功</h4>
            <h6>恭喜，论文已发布成功</h6>
            <div class="operation">
              <t-button theme="default">查看状态</t-button>
              <t-button theme="primary">去官网</t-button>
            </div>
          </div>
        </t-form>
      </div>
    </div>
  </div>
</template>
<script setup>
/* eslint-disable camelcase */
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeStep = ref(1)
const selected = ref('')
// const options = [
//   { label: '无', value: '0' },
//   { label: 'Max', value: '1' },
//   { label: 'Ollie', value: '2' },
//   { label: '自平衡车/RoBicycle', value: '3' },
//   { label: 'Jamoca', value: '4' }
// ]
const dayOptions = [
  { label: '今天', value: '0' },
  { label: '明天', value: '1' }
]
const steps = [
  { title: '基本信息', value: 1 },
  { title: '预览信息', value: 2 },
  { title: '完成', value: 3 }
]
const autoUpload = ref(true)
const files = ref([])
const display = ref('file')
const rules = reactive({
  title: [{ required: true, message: '论文标题必填', type: 'error' }],
  author: [{ required: true, message: '论文作者必填', type: 'error' }],
  meeting: [
    { required: true, message: '投稿会议/期刊名称必填', type: 'error' }
  ],
  releaseTime: [{ required: true, message: '发布时间必选', type: 'error' }],
  digest: [{ required: true, message: '论文摘要必填', type: 'error' }],
  // keyword: [{ required: true, message: '论文关键词必填', type: 'error' }],
  effect: [{ required: true, message: '社会价值必填', type: 'error' }],
  cover: [{ required: true, message: '封面图必传', type: 'error' }],
  files: [{ required: true, message: '图片/视频必传', type: 'error' }]
})
const thesisFormData = reactive({
  title: '',
  author: '',
  meeting: '',
  releaseTime: '',
  digest: '',
  keyword: ''
})
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
const switchChecked = ref(true)

function nextStep () {
  activeStep.value += 1
}
function preStep () {
  activeStep.value -= 1
}
function submit () {
  console.log('发布')
  activeStep.value += 1
}
function saveClick () {
  const myDate = new Date() // 实例一个时间对象；
  const h = myDate.getHours() // 获取系统时，
  const m = myDate.getMinutes() // 分
  MessagePlugin.success(`${h + ':' + m + '已保存草稿'}`)
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
