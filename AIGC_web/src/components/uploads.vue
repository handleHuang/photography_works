<template>
  <div>
    <ul class="upload-imgs" :class="{ cover_img: text == '封面图(5:7)' }">
      <li v-for="(item, index) in file_list" :key="index" :style="{ width: props.width, height: props.height }">
        <img class="demo-image-viewer__item" :src="item.url" v-show="item.mine.indexOf('image') !== -1" fit="cover" />
        <video class="right_pic" v-show="item.mine.indexOf('video') !== -1" :src="item.url" />
        <div class="video_pic" v-show="item.mine.indexOf('video') !== -1"></div>
        <icon name="close" style="color: rgba(0, 0, 0, 0.35)"  size="24px" @click="delImg(index)" />
      </li>

      <li v-if="file_list.length >= uploadNumber ? false : true" :style="{ width: props.width, height: props.height }">
        <input :id="'f_file' + input_id" ref="uploadInputer" class="f_file" type="file" :accept="accept" @change="beforeUpload" multiple />
        <label :for="'f_file' + input_id" class="upload"></label>
        <icon name="add" style="color: rgba(16, 28, 41, 0.6)" size="24px" />
        <p class="upload__text">{{ props.text }}</p>
      </li>
    </ul>
    <div class="upload_tips">{{ props.tips }}</div>
  </div>
</template>
<script lang="ts" setup>
import axios from "axios";
import { Icon } from "tdesign-icons-vue-next";
import { ref, reactive, onMounted, watchEffect } from "vue";
const props = defineProps({
  names: {
    type: String,
    default: "",
  },
  accept: {
    type: String,
    default: "image/*",
  },
  list: {
    type: Array,
    default: () => [],
  },
  uploadNumber: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    default: "",
    // default: "封面比例16:9，大小限20MB以下"
  },
  tips: {
    type: String,
    default: "",
    // default: "文案"
  },
  width: {
    type: String,
    default: "",
    // default: "宽"
  },
  height: {
    type: String,
    default: "",
    // default: "高"
  },
  userName: {
    type: String,
    default: "",
  }
});
let file_list: any = ref([]);
watchEffect(() => {
  file_list.value = props.list
})
const domain = "https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/";
let input_id = Math.random();
let count: any = 0;
let uploadCount: any = 0;
let imgs: any = [];
let uploadFileData: any = {
  LENGTH: 1024 * 1024 * 2,
  start: 0,
  end: 0,
  blob: "",
  blob_num: 0,
  total_blob_num: 0,
  uuid: "",
  original_name: "",
  size: 0,
  mime: "",
  required_id: "",
};
const emits = defineEmits({
  fileList: null,
});

const beforeUpload = (event: any) => {
  count = file_list.value.length;
  const fileList = Array.from(event.target.files);
  fileList.forEach((file: any,index) => {
    // console.log(file)
    if (count >= props.uploadNumber) {
      return false;
    }
    count++;
    // console.log(file);
    imgs.push(URL.createObjectURL(file));
    fileSlice(file);
  });
  event.target.value = null;
};
const fileSlice = (file: any) => {
  const LENGTH = 1024 * 1024 * 2;
  const startNum = uploadFileData.start ? uploadFileData.start : 0;
  uploadFileData = {
    LENGTH,
    start: 0,
    end: startNum + LENGTH,
    blob: "",
    blob_num: 0,
    total_blob_num: Math.ceil(file.size / LENGTH),
    uuid: generateUUID(),
    original_name: file.name,
    size: file.size,
    mime: file.type,
    required_id: file.type,
  };
  for (let i = 0; i < uploadFileData.total_blob_num; i++) {
    uploadFileData.blob = uploadFileData.total_blob_num > 1 ? cutFile(file) : file;
    sendFile();
  }
};
const baseUrl = import.meta.env.VITE_URL_BASE
const sendFile = () => {
  uploadFileData.blob_num++;
  // this.uploadCount++;
  const form_data = new FormData();
  form_data.append("file", uploadFileData.blob);
  form_data.append("uuid", uploadFileData.uuid);
  form_data.append("blob_num", uploadFileData.blob_num);
  form_data.append("total_blob_num", uploadFileData.total_blob_num);
  // if (uploadFileData.blob_num === 1) {
  form_data.append("original_name", uploadFileData.original_name);
  form_data.append("size", uploadFileData.size);
  form_data.append("mime", uploadFileData.mime);
  form_data.append("required_id", uploadFileData.mime);
  // }
  axios({
    method: "POST",
    // url: `${this.uploadUrl}/admin/v2/public/upload`,
    // url: "https://aigc.emergelab.com.cn/api/file/upload",
    url: `${baseUrl}/api/file/upload`,
    headers: {
      "Content-Type": "multipart/form-data",
      "Staffname": `${props.userName}`,
      //   Authorization: `Bearer ${this.token}`,
    },
    data: form_data,
  })
    .then(async (res) => {
      //   console.log(res);
      if (res.status == 200) {
        // console.log(res.data.data)
        // file_list.push(res.data);
        file_list.value.push({
          path: res.data.path,
          mine: res.data.mime,
          original_name: res.data.original_name,
          size: res.data.size,
          filename: res.data.filename,
          extension: res.data.extension,
          type: props.names,
          url: res.data.url
        });
        emits("fileList", {
          names: props.names,
          list: file_list.value,
        });
      }
      if (res.status == 204) {
        uploadCount++;
      }
      //  this.uploadCount == this.uploadFileData.total_blob_num &&
      if (uploadCount == uploadFileData.total_blob_num) {
        let formData_2 = new FormData();
        formData_2.append("uuid", uploadFileData.uuid);
        formData_2.append("total_blob_num", uploadFileData.total_blob_num);
        formData_2.append("original_name", uploadFileData.original_name);
        formData_2.append("required_id", uploadFileData.mime);
        await axios({
          method: "POST",
          //   url: `${this.uploadUrl}/admin/v2/public/upload-done`,
          // url: "https://aigc.emergelab.com.cn/api/file/merge",
          url: `${baseUrl}/api/file/merge`,
          headers: {
            "Content-Type": "multipart/form-data",
            "Staffname": `${props.userName}`,
            // Authorization: `Bearer ${this.token}`,
          },
          data: formData_2,
        }).then((res1) => {
          uploadCount = null;
          (uploadFileData = {
            LENGTH: 1024 * 1024 * 2,
            start: 0,
            end: 0,
            blob: "",
            blob_num: 0,
            total_blob_num: 0,
            uuid: "",
            original_name: "",
            size: 0,
            mime: "",
            required_id: "",
          }),
            // file_list.push(res1.data);
            file_list.value.push({
              path: res1.data.path,
              mine: res1.data.mime,
              original_name: res1.data.original_name,
              size: res1.data.size,
              filename: res1.data.filename,
              extension: res1.data.extension,
              type: props.names,
              url: res1.data.url
            });
          emits("fileList", {
            names: props.names,
            list: file_list.value,
          });
        });
      }
    })
    .catch((error) => {
      // console.log(error.response);
    });
};
// 生成唯一字段
const generateUUID = () => {
  /* eslint-disable no-bitwise, no-mixed-operators */
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};
// 切割文件
const cutFile = (file: any) => {
  const file_blob = file.slice(uploadFileData.start, uploadFileData.end);
  uploadFileData.start = uploadFileData.end;
  uploadFileData.end = uploadFileData.start + uploadFileData.LENGTH;
  return file_blob;
};

const delImg = (index: any) => {
  imgs.splice(index, 1);
  file_list.value.splice(index, 1);
  uploadFileData = {
    LENGTH: 1024 * 1024 * 2,
    start: 0,
    end: 0,
    blob: "",
    blob_num: 0,
    total_blob_num: 0,
    required_id: "",
    original_name: "",
    size: 0,
    mime: "",
    uuid: "",
  };
  emits("fileList", {
    names: props.names,
    list: file_list.value,
  });
};
</script>

<style lang="less" src="../assets/css/upload.less" scoped></style>
