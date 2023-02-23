<template>
  <div>
    <!-- {{ fileInfo }} -->
    <t-upload
      v-model="fileDetail.arr"
      :request-method="requestMethod"
      :theme="props.theme"
      :accept="props.accept"
      draggable
      @change="onChange"
    />
  </div>
</template>
<script setup>
/* eslint-disable camelcase */
import { ref, defineProps, defineEmits, reactive } from 'vue'
import axios from 'axios'
const emits = defineEmits()
const props = defineProps({
  theme: {
    type: String,
    default: 'file'
  },
  accept: {
    type: String,
    default: 'application/pdf'
  },
  fileInfo: {
    type: Array,
    default: () => {
      return []
    }
  }
})
let uploadFileData = reactive({
  LENGTH: 1024 * 1024 * 2,
  start: 0,
  end: 0,
  blob: '',
  blob_num: 0,
  total_blob_num: 0,
  required_id: '',
  original_name: '',
  size: 0,
  mime: ''
})
const fileDetail = reactive({
  arr: props.fileInfo || []
})
// const file_ = reactive([])
// const aa = [{
//   name: '默认文件',
//   status: 'success',
//   size: 1024,
//   // 上传日期，如果接口返回的字段包含 uploadTime，则会以接口返回的为准，默认使用本地电脑时间。
//   // 如果希望使用接口返回的上传日期，但是接口字段名不是 uploadTime，则可以使用函数 formatResponse 格式化接口数据
//   uploadTime: '2022-09-25',
//   url: 'https://robot-1252839081.cos.ap-guangzhou.myqcloud.com/uploads/2023/02/21/4c5787cccdb1107d5c9c9c5086befe88.pdf'
// }]
function onChange (trigger) {
  console.log(trigger)
  if (trigger.length === 0) {
    emits('clearData')
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
      mime: ''
    }
  }
}
const token = JSON.parse(localStorage.getItem('access_token'))

const uploadCount = ref(0)
const totalBlob = ref(0)
const requestMethod = file => {
  return new Promise(resolve => {
    console.log(file)
    const LENGTH = 1024 * 1024 * 2
    totalBlob.value = Math.ceil(file.raw.size / LENGTH)
    const startNum = uploadFileData.start ? uploadFileData.start : 0
    uploadFileData = {
      LENGTH,
      start: 0,
      end: startNum + LENGTH,
      blob: '',
      blob_num: 0,
      total_blob_num: Math.ceil(file.raw.size / LENGTH),
      required_id: generaterequired_id(),
      original_name: file.raw.name,
      size: file.raw.size,
      mime: file.raw.type
    }
    for (let i = 0; i < totalBlob.value; i++) {
      uploadFileData.blob = totalBlob.value > 1 ? cutFile(file.raw) : file.raw
      uploadFileData.blob_num++
      const formData = new FormData()
      formData.append('file', uploadFileData.blob)
      formData.append('required_id', uploadFileData.required_id)
      formData.append('blob_num', Number(uploadFileData.blob_num))
      formData.append('total_blob_num', Number(totalBlob.value))
      formData.append('original_name', uploadFileData.original_name)
      formData.append('size', Number(uploadFileData.size))
      formData.append('mime', uploadFileData.mime)
      file.progress = 100
      console.log(uploadFileData.blob)
      axios({
        method: 'POST',
        url: 'https://robot.zjtntd.com/admin/slice-upload',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        data: formData
      })
        .then(res => {
          console.log(res)
          emits('fileSuccessData', res.data)
          if (res.status === 200) {
            resolve({
              status: 'success',
              response: { url: res.data.url }
            })
          }
          if (res.status === 204) {
            uploadCount.value++
            if (uploadCount.value === totalBlob.value) {
              const formData_2 = new FormData()
              formData_2.append('required_id', uploadFileData.required_id)
              formData_2.append('original_name', file.raw.name)
              console.log('done')
              axios({
                method: 'POST',
                url: 'https://robot.zjtntd.com/admin/slice-upload/merge',
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`
                },
                data: formData_2
              })
                .then(res => {
                  emits('fileSuccessData', res.data)
                  if (res.status === 200) {
                    uploadCount.value = 0
                    totalBlob.value = 0
                    resolve({
                      status: 'success',
                      response: { url: res.data.url }
                    })
                  }
                })
                .catch(err => {
                  console.log(err.response)
                  resolve({
                    status: 'fail',
                    response: { url: res.data.url }
                  })
                })
            }
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  })
}
// 生成唯一字段
function generaterequired_id () {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now()
  }
  const required_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    c => {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return required_id
}
// 切割文件
function cutFile (file) {
  const fileBlob = file.slice(uploadFileData.start, uploadFileData.end)
  uploadFileData.start = uploadFileData.end
  uploadFileData.end = uploadFileData.start + uploadFileData.LENGTH
  return fileBlob
}
</script>
<style></style>
