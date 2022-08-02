<template>
  <div class="articlesForm">
    <div class="articlesFormBox">
      <div class="page__breadcrumb back__breadcrumb">
        <div class="goback" @click="goback">
          <t-icon name="arrow-left" />
          返回上一级
        </div>
      </div>
      <div class="form_container">
        <t-form :label-width="95">
          <t-steps v-model="activeStep" :options="steps"  :readonly="true"/>
          <div class="step_1 step_item" v-if="activeStep == 1">
            <div class="page__title">文章信息</div>
            <t-form-item label="项目标题" name="title">
              <t-input
                v-model="articlesForm.obj.title"
                type="text"
                placeholder="请输入项目标题"
                :maxlength="16"
              ></t-input>
            </t-form-item>
            <t-form-item label="项目概述" name="overview">
              <t-textarea
                v-model="articlesForm.obj.overview"
                type="text"
                placeholder="请输入项目概述"
                :maxlength="20"
              ></t-textarea>
            </t-form-item>
            <t-form-item label="项目简介" name="about">
              <t-textarea
                v-model="articlesForm.obj.about"
                type="text"
                placeholder="请输入项目简介"
                :maxlength="168"
              ></t-textarea>
            </t-form-item>
            <t-form-item label="方案优势" name="advantage">
              <t-textarea
                v-model="articlesForm.obj.advantage"
                type="text"
                placeholder="请输入方案优势"
                :maxlength="96"
              ></t-textarea>
            </t-form-item>
            <t-form-item label="社会价值" name="effect">
              <t-textarea
                v-model="articlesForm.obj.effect"
                type="text"
                placeholder="请输入社会价值"
                :maxlength="96"
              ></t-textarea>
            </t-form-item>
            <t-form-item label=" ">
              <t-button @click="nextStep">下一步</t-button>
            </t-form-item>
          </div>
          <div class="step_2 step_item" v-if="activeStep == 2">
            <div class="page__title">编辑文章内容</div>
            <RichText :value="richValue" @input="input" />
            <t-form-item label=" ">
              <t-button @click="preStep">上一步</t-button>
              <t-button
                theme="primary"
                type="submit"
                @click="submit"
                >提交</t-button
              >
              <t-button
                theme="default"
                variant="base"
                type="reset"
                @click="goback"
                >取消</t-button
              >
            </t-form-item>
          </div>
          <div class="step_3 step_item" v-if="activeStep == 3">
          <t-icon name="check-circle-filled" style="color: green" />
        <div class="end__text">您已成功创建文章，点击可跳转至文章详情页</div>
        <t-button theme="primary" class="end__btn" >
          查看详情
        </t-button>
        <t-button theme="text" class="end__btn add__btn" >
          继续添加
        </t-button>
          </div>
        </t-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import RichText from '../../components/RichText.vue'
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const store = useStore()
const router = useRouter()
const route = useRoute()
const articlesForm = reactive({
  obj: {}
})
const richValue = ref('')
const isHasId = ref(route.query.id)
const input = emit => {
  richValue.value = emit
}
const steps = [
  { title: isHasId.value ? '编辑文章信息' : '填写文章信息', value: 1, content: isHasId.value ? '编辑基本信息' : '填写基本信息' },
  { title: '编辑文章内容', value: 2, content: '自定义编辑文章内容' },
  { title: '完成', value: 3, content: isHasId.value ? '完成文章编辑' : '完成文章创建' }
]
const activeStep = ref(1)
onMounted(() => {
  if (isHasId.value) {
    store.dispatch('articleDetails', route.query.id).then(res => {
      console.log(res)
      articlesForm.obj = res.data
    })
  }
})
// function
// const activeStep = ref(0)
function submit () {
  if (route.query.id) {
    console.log(activeStep.value)
    console.log('编辑')
    activeStep.value += 1
  } else {
    console.log('新建')
    activeStep.value += 1
    console.log(activeStep.value)
  }
}
function nextStep () {
  activeStep.value += 1
}
function preStep () {
  activeStep.value -= 1
}
function goback () {
  router.back()
}
</script>

<style
  lang="less"
  scoped
  src="../../assets/style/articles/articlesForm.less"
></style>
