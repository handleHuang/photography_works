<template>
  <div class="contactsForm">
    <div class="contactsFormBox">
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
            <t-form-item label="标题" name="username">
              <t-input
               v-model="contactsForm.obj.username"
                type="text"
                placeholder="请输入标题"
              ></t-input>
            </t-form-item>
            <t-form-item label="联系电话" name="phone">
              <t-input
               v-model="contactsForm.obj.phone"
                type="text"
                placeholder="请输入联系电话"
              ></t-input>
            </t-form-item>
            <t-form-item label="邮箱" name="email">
              <t-input
               v-model="contactsForm.obj.email"
                type="text"
                placeholder="请输入电子邮箱号"
              ></t-input>
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
const contactsForm = reactive({
  obj: {}
})
const pageTitle = computed(() => (route.query.id ? '编辑' : '新建'))
onMounted(() => {
  if (route.query.id) {
    store.dispatch('userDetails', route.query.id).then((res) => {
      console.log(res)
      contactsForm.obj = res.data
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
<style lang="less" scoped src="../../assets/style/contacts/contactsForm.less">
</style>
