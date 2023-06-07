<template>
  <ul class="upload-imgs" :class="{ cover_img: text == '封面图(5:7)' }">
    <li v-for="(item, index) in fileList.arr" :key="index">
      <img
        v-if="item.mine && item.mine.includes('image')"
        class="demo-image-viewer__item"
        :src="item.url ? item.url : domain + (item.path && item.path)"
        fit="cover"
      />
      <video
        v-else
        controls
        loop="loop"
        :src="item.url ? item.url : domain + (item.path && item.path)"
      />
      <span class="delBtn" @click="delImg(index)">删除</span>
      <input
        :id="'f_file' + inputId"
        ref="uploadInputer"
        class="f_file file2"
        type="file"
        :accept="accept"
        @change="beforeUpload"
      />
      <label :for="'f_file' + inputId" class="againUpload">编辑</label>
    </li>
    <li v-if="!fileList.arr.length >= 1">
      <input
        :id="'f_file' + inputId"
        ref="uploadInputer"
        class="f_file file1"
        type="file"
        :accept="accept"
        @change="beforeUpload"
      />
      <label :for="'f_file' + inputId" id="321312" class="upload"></label>

      <a class="add"><img src="../assets/icon/add-small.png" /></a>
      <div class="upload__text">
       <span> {{ text }}</span>
      </div>
    </li>
  </ul>
  <t-dialog header="裁切图片" width="1000px" v-model:visible="cuttingVisible">
    <template #body>
      <div class="tips">{{ cuttingTips }}</div>
      <div class="box">
        <div class="box_1">
          <img :src="cropperImg" ref="image" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="btns_box">
        <input
          :id="'f_file' + inputId"
          ref="uploadInputer"
          class="f_file file2"
          type="file"
          :accept="accept"
          @change="beforeUpload"
        />
        <label :for="'f_file' + inputId" class="againUpload_txt"
          >重新上传</label
        >
        <t-button @click="cuttingVisible = false" variant="outline"
          >取消</t-button
        >
        <t-button @click="sureSava">确定</t-button>
      </div>
    </template>
  </t-dialog>
</template>
<script setup>
/* eslint-disable camelcase */
import axios from 'axios'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref, reactive, defineProps, defineEmits, onMounted, watch } from 'vue'
import { base64ToFile } from '../utils/base64ToFile'
const props = defineProps({
  names: {
    type: String,
    default: ''
  },
  types: {
    type: String,
    default: ''
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  list: {
    type: Array,
    default: () => []
  },
  uploadNumber: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: ''
  },
  cuttingTips: {
    type: String,
    default: '*图片尺寸固定比例6:4，推荐尺寸750px*500px'
  },
  aspectRatio: {
    type: Number,
    default: 6 / 4
  }
})
// 裁切弹窗
const cuttingVisible = ref(false)
const emits = defineEmits({
  fileList: null
})
const inputId = Math.random()
const uploadCount = ref(0)
const totalBlob = ref(0)
const domain = 'https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/'
const fileList = reactive({
  arr: []
})
watch(
  () => props.list,
  newValue => {
    fileList.arr = JSON.parse(JSON.stringify(newValue || []))
  }
)
const imgs = reactive({
  arr: []
})
let uploadFileData = {
  LENGTH: 1024 * 1024 * 2,
  start: 0,
  end: 0,
  blob: '',
  blob_num: 0,
  total_blob_num: 0,
  required_id: '',
  original_name: '',
  size: 0,
  mine: ''
}
// 原始图片的src
const cropperImg = ref('')
// 裁剪后的图片
const afterImg = ref('')
// 裁剪的图片
const image = ref(null)
// 进行裁剪
const myCropper = ref(null)
function beforeUpload (event) {
  if (myCropper.value) myCropper.value.destroy()
  // console.log(myCropper.value)
  const className = event.currentTarget.getAttributeNode('class').value
  const file = Array.from(event.target.files)[0]
  imgs.arr.push(URL.createObjectURL(file))
  if (file.type.includes('image')) {
    cuttingVisible.value = true
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      // 显示图片
      cropperImg.value = reader.result
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = reader.result
      img.onload = () => {
        initCropper()
      }
    }
  } else {
    if (className.includes('file1')) {
      fileSlice(file)
    } else {
      if (imgs.arr.length > 0) {
        clearindex0()
      }
      fileSlice(file)
    }
  }
  if (myCropper.value) myCropper.value.destroy()
  event.target.value = null
}
const sureSava = () => {
  // console.log(myCropper.value)
  // 拿到裁剪后的图片
  afterImg.value = myCropper.value
    .getCroppedCanvas({ imageSmoothingQuality: 'high' })
    .toDataURL()
  // 设置图片格式
  const file = base64ToFile(afterImg.value, 'file')
  fileSlice(file)
  imgs.arr.splice(0, 1)
  fileList.arr.splice(0, 1)
  cuttingVisible.value = false
}
function initCropper () {
  myCropper.value = new Cropper(image.value, {
    /*
          * viewMode 视图控制
            - 0 无限制
            - 1 限制裁剪框不能超出图片的范围
            - 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
            - 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
          * */
    viewMode: 0,
    // 设置图片是否可以拖拽功能
    /*
          * dragMode 拖拽图片模式
            - crop 形成新的裁剪框
            - move 图片可移动
            - none 什么也没有
          * */
    dragMode: 'move',
    // 是否显示图片后面的网格背景,一般默认为true
    background: true,
    // 设置裁剪区域占图片的大小 值为 0-1 默认 0.8 表示 80%的区域
    autoCropArea: 0.8,
    // 设置图片是否可以进行收缩功能
    zoomOnWheel: true,
    // 是否显示 + 箭头
    center: true,
    aspectRatio: props.aspectRatio
  })
}
function clearindex0 () {
  if (imgs.arr.length > 0 && fileList.arr.length > 0) {
    imgs.arr.splice(0, 1)
    fileList.arr.splice(0, 1)
    myCropper.value = null
    cropperImg.value = ''
    afterImg.value = ''
    image.value = ''
    uploadFileData = {
      LENGTH: 1024 * 1024 * 2,
      start: 0,
      end: 0,
      blob: '',
      blob_num: 0,
      total_blob_num: 0,
      required_id: '',
      original_name: '',
      size: 0,
      mine: ''
    }
    emits('fileList', {
      names: props.names,
      list: fileList.arr
    })
  }
}
function fileSlice (file) {
  const LENGTH = 1024 * 1024 * 2
  totalBlob.value = Math.ceil(file.size / LENGTH)
  const startNum = uploadFileData.start ? uploadFileData.start : 0
  uploadFileData = {
    LENGTH,
    start: 0,
    end: startNum + LENGTH,
    blob: '',
    blob_num: 0,
    total_blob_num: Math.ceil(file.size / LENGTH),
    required_id: generateUUID(),
    original_name: file.name,
    size: file.size,
    mine: file.type
  }
  for (let i = 0; i < uploadFileData.total_blob_num; i++) {
    uploadFileData.blob =
      uploadFileData.total_blob_num > 1 ? cutFile(file) : file
    sendFile()
  }
}
function sendFile () {
  uploadFileData.blob_num++
  const formData = new FormData()
  formData.append('file', uploadFileData.blob)
  formData.append('required_id', uploadFileData.required_id)
  formData.append('blob_num', Number(uploadFileData.blob_num))
  formData.append('total_blob_num', Number(uploadFileData.total_blob_num))
  formData.append('original_name', uploadFileData.original_name)
  formData.append('size', Number(uploadFileData.size))
  formData.append('mine', uploadFileData.mine)
  axios({
    method: 'POST',
    url: 'https://aigc.emergelab.com.cn/api/file/upload',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
    .then(res => {
      if (res.status === 200) {
        console.log(res)
        fileList.arr.push({
          path: res.data.path,
          mine: res.data.mime,
          original_name: res.data.original_name,
          url: res.data.url,
          extension: res.data.extension,
          size: res.data.size,
          filename: res.data.filename,
          type: props.types
        })
        emits('fileList', {
          names: props.names,
          list: fileList.arr
        })
      }
      if (res.status === 204) {
        uploadCount.value++
        if (uploadCount.value === totalBlob.value) {
          const formData_2 = new FormData()
          formData_2.append('required_id', uploadFileData.required_id)
          formData_2.append('original_name', uploadFileData.original_name)
          axios({
            method: 'POST',
            url: 'https://aigc.emergelab.com.cn/api/file/merge',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: formData_2
          }).then(res => {
            uploadCount.value = 0
            totalBlob.value = 0
            fileList.arr.push({
              path: res.data.path,
              mine: res.data.mime,
              original_name: res.data.original_name,
              extension: res.data.extension,
              size: res.data.size,
              filename: res.data.filename,
              type: props.types,
              url: res.data.url
            })
            emits('fileList', {
              names: props.names,
              list: fileList.arr
            })
          })
        }
      }
    })
    .catch(error => {
      console.log(error, 11)
    })
}
// 生成唯一字段
function generateUUID () {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now()
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
// 切割文件
function cutFile (file) {
  const fileBlob = file.slice(uploadFileData.start, uploadFileData.end)
  uploadFileData.start = uploadFileData.end
  uploadFileData.end = uploadFileData.start + uploadFileData.LENGTH
  return fileBlob
}
function delImg (index) {
  imgs.arr.splice(index, 1)
  fileList.arr.splice(index, 1)
  uploadFileData = {
    LENGTH: 1024 * 1024 * 2,
    start: 0,
    end: 0,
    blob: '',
    blob_num: 0,
    total_blob_num: 0,
    required_id: '',
    original_name: '',
    size: 0,
    mine: ''
  }
  emits('fileList', {
    names: props.names,
    list: fileList.arr
  })
}
onMounted(() => {
  imgs.arr = JSON.parse(JSON.stringify(props.list)).map(
    res => domain + res.path
  )
})
</script>

<style lang="less" src="../assets/style/upload.less" scoped></style>
