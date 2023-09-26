<template>
  <div class="login">
    <!-- <input type="file" @change="uploadImage" />
      <button @click="submit">上传</button> -->
    <!-- <img :src="cover" /> -->
    <div style="width: 350px">
      <t-form
        ref="form"
        :data="formData"
        :colon="true"
        :label-width="0"
        @submit="onSubmit"
      >
        <t-form-item name="account">
          <t-input
            v-model="formData.username"
            clearable
            placeholder="请输入账户名"
          >
            <template #prefix-icon>
              <desktop-icon />
            </template>
          </t-input>
        </t-form-item>

        <t-form-item name="password">
          <t-input
            v-model="formData.password"
            type="password"
            clearable
            placeholder="请输入密码"
          >
            <template #prefix-icon>
              <lock-on-icon />
            </template>
          </t-input>
        </t-form-item>

        <t-form-item>
          <t-button theme="primary" type="submit" block>登录</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
import { reactive } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import { login } from "../models/index";
import { MessagePlugin } from "tdesign-vue-next";

const formData: any = reactive({
  username: "",
  password: "",
});
const handleLogin = () => {
  login(formData)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success("提交成功");
    handleLogin();
  } else {
    console.log("Validate Errors: ", firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};
</script>

<style scoped>
:deep(.t-form__item) {
  width: 100%;
}
</style>
