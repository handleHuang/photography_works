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
          :data="newsFormData"
          label-align="top"
        >
          <div class="step_1" v-if="activeStep == 1">
            <t-form-item label="公众号链接" name="officialUrl">
              <t-input
                v-model="newsFormData.officialUrl"
                type="text"
                placeholder="请输入内容"
              ></t-input>
            </t-form-item>
            <t-form-item class="bg_eee" label="新闻标题" name="title">
              <t-textarea
                autosize
                v-model="newsFormData.title"
                type="text"
                placeholder="自动抓取标题会展示在这里"
              ></t-textarea>
            </t-form-item>
            <t-form-item class="bg_eee" label="发布日期" name="releaseDate">
              <t-textarea
                autosize
                v-model="newsFormData.releaseDate"
                type="text"
                placeholder="自动抓取标题会展示在这里"
              ></t-textarea>
            </t-form-item>
            <t-form-item label="新闻摘要" name="digest">
              <t-textarea
                type="text"
                placeholder="请输入更多内容"
                v-model="newsFormData.digest"
                :maxlength="30"
              ></t-textarea>
            </t-form-item>
            <t-form-item
              label="新闻封面上传"
              help="请选择JPG/PNG格式图片，大小 * ， M以内"
            >
            <uploads theme="image" accept="image/jpeg,image/png"></uploads>
            </t-form-item>
            <t-form-item class="delLabel">
              <t-button theme="primary" @click="nextStep">下一步</t-button>
              <t-button theme="default" @click="saveClick">保存草稿</t-button>
            </t-form-item>
          </div>
          <div class="step_2" v-if="activeStep == 2">
            <div class="controls_238">
              <t-form-item label="新闻中心预览">
                <div class="previewNews">
                  <div class="previewNews_N1">
                    <span class="time">2022 / 06 / 28</span>
                    <h4 class="title">
                      {{ellipsis_1('利用AI和游戏技术，腾讯Robotics X Max机器人加速智能学习')}}
                    </h4>
                  </div>
                  <div class="previewNews_N2">
                    <span class="introduce">
                      {{ellipsis_2('本文介绍腾讯 Robotics X实验室与腾讯游戏学堂、腾讯互娱旗下START团队联合宣布发起游戏驱动机器人加速智能学习项目。')}}
                      </span>
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
                      利用AI和游戏技术，腾讯Robotics X<br/>
                      Max机器人加速智能学习
                    </h4>
                    <span class="introduce">
                      本文介绍腾讯 Robotics X实验室与腾讯游戏学堂、腾讯互娱旗下START团队联合宣布发起游戏驱动机器人加速智能学习项目。
                    </span>
                  </div>
                  <div class="preview_H2">
                    <img src="../../assets/icon/robot.png" alt="">
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
            <h6>恭喜，新闻已发布成功</h6>
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
import uploads from '../../components/uploads.vue'
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeStep = ref(1)
const selected = ref('')
const dayOptions = [
  { label: '今天', value: '0' },
  { label: '明天', value: '1' }
]
const steps = [
  { title: '基本信息', value: 1 },
  { title: '预览信息', value: 2 },
  { title: '完成', value: 3 }
]
const rules = reactive({
  officialUrl: [{ required: true, message: '公众号链接必填', type: 'error' }],
  title: [{ required: true, message: '论文标题必填', type: 'error' }],
  releaseDate: [{ required: true, message: '发布时间必填', type: 'error' }],
  digest: [{ required: true, message: '论文摘要必填', type: 'error' }]
})
const newsFormData = reactive({
  officialUrl: '',
  title: '',
  releaseDate: '',
  digest: ''
})
const switchChecked = ref(true)
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
