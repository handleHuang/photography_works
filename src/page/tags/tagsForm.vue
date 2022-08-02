<template>
  <div class="tagsForm">
    <div class="tagsFormBox">
      <div class="page__breadcrumb back__breadcrumb">
        <div class="goback" @click="goback">
          <t-icon name="arrow-left" />
          返回上一级
        </div>
      </div>
      <div class="form_container">
        <t-form :label-width="95">
          <div class="page__title">{{ pageTitle }}</div>
          <ul class="new__list">
            <t-form-item label="标签标题" name="title">
              <t-input
                type="text"
                placeholder="标签标题"
                :maxlength="16"
              ></t-input>
            </t-form-item>
            <t-form-item label="描述" name="overview">
              <t-textarea
                type="text"
                placeholder="请输入标签描述"
                :maxlength="20"
              ></t-textarea>
            </t-form-item>
            <t-form-item style="padding-top: 8px">
              <t-button
                theme="primary"
                type="submit"
                style="margin-right: 10px"
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
          </ul>
        </t-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const route = useRoute()
const tagsForm = reactive({
  obj: {}
})
const pageTitle = computed(() => (route.query.id ? '编辑标签' : '新建标签'))
onMounted(() => {
  if (route.query.id) {
    store.dispatch('tagsDetails', route.query.id).then((res) => {
      console.log(res)
      tagsForm.obj = res.data
    })
  }
})
// function
function submit () {
  if (route.query.id) {
    console.log('编辑')
  } else {
    console.log('新建')
  }
}
function goback () {
  router.back()
}
</script>

<style lang="less" scoped src="../../assets/style/tags/tagsForm.less">
</style>
