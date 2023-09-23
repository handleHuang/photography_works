<template>
  <div>
    <input type="file" @change="uploadImage" />
    <button @click="submit">上传</button>
    <img :src="cover" />
    <div style="width: 350px">
      <Login />
      <Register />
    </div>
    <div style="width: 350px">
      <t-input v-model="search" clearable placeholder="搜索"> </t-input>
      <t-button theme="primary" type="submit" block @click="handleSearch"
        >搜索</t-button
      >
    </div>
    <div style="width: 350px">
      <t-input v-model="del" clearable placeholder="删除"> </t-input>
      <t-button theme="primary" type="submit" block @click="handleDel"
        >删除</t-button
      >
    </div>
    <div style="width: 350px">
      <t-form ref="form" :data="anemdData" :colon="true" :label-width="0">
        <t-form-item name="id">
          <t-input v-model="anemdData.id" clearable placeholder="id">
            <template #prefix-icon>
              <desktop-icon />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="email">
          <t-input v-model="anemdData.email" clearable placeholder="邮箱">
            <template #prefix-icon>
              <desktop-icon />
            </template>
          </t-input>
        </t-form-item>

        <t-form-item name="password">
          <t-input
            v-model="anemdData.password"
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
          <t-button theme="primary" type="submit" block @click="handleAmend"
            >修改</t-button
          >
        </t-form-item>
      </t-form>
    </div>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import Login from "./components/login.vue";
import Register from "./components/register.vue";
import {
  postText,
  getTest,
  postSearch,
  delUser,
  anemdUser,
  uploadimg
} from "./models/index";

let imgData: any = ref(null);
const uploadImage = (e: any) => {
  imgData.value = e.target.files[0];
  console.log(e.target.files[0])
};

const getList = () => {
  getTest()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getList();
});

let cover: any = ref("");
const submit = () => {
  const formData = new FormData();
  formData.append("file", imgData.value);
  uploadimg(formData)
    .then((res: any) => {
      console.log(res);
      cover.value = res.url;
      console.log(cover.value);
    })
    .catch((error) => {
      console.log(error);
    });
};

// 搜索
let search = ref(null);
const handleSearch = () => {
  let params = {
    test: search.value,
  };
  postSearch(params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 删除
let del = ref(null);
const handleDel = () => {
  let params = {
    id: del.value,
  };
  delUser(params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 修改
let anemdData = reactive({
  id: "",
  password: "",
  email: "",
});
const handleAmend = () => {
  anemdUser(anemdData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
