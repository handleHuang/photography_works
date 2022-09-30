<template>
  <div>
    <t-upload
    v-model="aaa"
      :request-method="requestSuccessMethod"
      theme="file"
      draggable
    />
  </div>
</template>
<script setup>
/* eslint-disable camelcase */
import { ref } from 'vue'
import axios from 'axios'
const aaa = ref([])
const token = JSON.parse(localStorage.getItem('access_token'))
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
  mime: ''
}
const requestSuccessMethod = (file) => {
  console.log(file)
  fileSlice(file.raw)
  return new Promise((resolve) => {
    // resolve({
    //   status: 'success',
    //   response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' }
    // })
    resolve({
      status: 'fail',
      response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' }
    })
  })
}
function fileSlice (file) {
  const LENGTH = 1024 * 1024 * 2
  const startNum = uploadFileData.start
    ? uploadFileData.start
    : 0
  uploadFileData = {
    LENGTH,
    start: 0,
    end: startNum + LENGTH,
    blob: '',
    blob_num: 0,
    total_blob_num: Math.ceil(file.size / LENGTH),
    required_id: generaterequired_id(),
    original_name: file.name,
    size: file.size,
    mime: file.type
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
  formData.append(
    'total_blob_num',
    Number(uploadFileData.total_blob_num)
  )
  formData.append('original_name', uploadFileData.original_name)
  formData.append('size', Number(uploadFileData.size))
  formData.append('mime', uploadFileData.mime)
  console.log(formData)
  axios({
    method: 'POST',
    url: 'https://robot.zjtntd.com/admin/slice-upload',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
    data: formData
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err.response)
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
    (c) => {
      const r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return required_id
}
// 切割文件
function cutFile (file) {
  const fileBlob = file.slice(
    uploadFileData.start,
    uploadFileData.end
  )
  uploadFileData.start = uploadFileData.end
  uploadFileData.end =
        uploadFileData.start + uploadFileData.LENGTH
  return fileBlob
}

</script>
<style></style>
