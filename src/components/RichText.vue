<template>
  <div>
    <vue3-tinymce v-model="myValue" :setting="setting"/>
  </div>
</template>

<script setup>
/* eslint-disable camelcase */
import axios from 'axios'
import { reactive, defineProps, defineEmits, watch, toRefs, ref } from 'vue'
import Vue3Tinymce from '@jsdawn/vue3-tinymce'
// const token = JSON.parse(localStorage.getItem('access_token'))
const props = defineProps({
  value: {
    type: String,
    default: () => {
      return ''
    }
  },
  widthHeight: {
    type: Array,
    default: () => {
      return ''
    }
  }
})
const emits = defineEmits({
  input: null
})
const { myValue, setting } = toRefs(
  reactive({
    myValue: props.value,
    // editor 配置项
    setting: {
      height: props.widthHeight[0],
      width: props.widthHeight[1],
      toolbar_items_size: 'small',
      toolbar_drawer: 'sliding',
      resize: false,
      toolbar:
      'undo redo |stylescreen fullscreen | styleselect  | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link unlink openlink image charmap pastetext print preview | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | indent outdent | superscript subscript | removeformat |',
      language_url:
      'https://unpkg.com/@jsdawn/vue3-tinymce@1.1.6/dist/tinymce/langs/zh_CN.js',
      language: 'zh_CN',
      font_formats:
      "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';PingFang SC;Microsoft YaHei,sans-serif;楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
      statusbar: false, // 底部的状态栏
      style_formats: [
        {
          title: '文字大小',
          items: [
            { title: '12px', inline: 'span', styles: { 'font-size': '12px' } },
            { title: '14px', inline: 'span', styles: { 'font-size': '14px' } },
            { title: '15px', inline: 'span', styles: { 'font-size': '15px' } },
            { title: '16px', inline: 'span', styles: { 'font-size': '16px' } },
            { title: '18px', inline: 'span', styles: { 'font-size': '18px' } },
            { title: '20px', inline: 'span', styles: { 'font-size': '20px' } },
            { title: '22px', inline: 'span', styles: { 'font-size': '22px' } },
            { title: '24px', inline: 'span', styles: { 'font-size': '24px' } }
          ]
        },
        {
          title: '字体',
          items: [
            { title: '微软雅黑', inline: 'span', styles: { 'font-family': "微软雅黑='微软雅黑'" } },
            { title: '苹果苹方', inline: 'span', styles: { 'font-family': 'PingFang SC' } }
          ]
        },
        {
          title: '预先格式化的', inline: 'span', styles: { 'font-family': 'PingFang SC', 'font-size': '15px' }
        },
        { title: '首行缩进', block: 'p', styles: { 'text-indent': '2em' } }
      ],
      style_formats_merge: true,
      style_formats_autohide: true,
      fontsize_formats: '12px 14px 15px 16px 18px 20px 24px',
      paste_data_images: true,
      images_file_types: 'jpeg,jpg,png,gif,bmp,webp',
      plugins: 'code link image media table lists fullscreen quickbars',
      images_upload_handler: function (blobInfo, success, failure) {
        // blob转file
        const files = new window.File([blobInfo.blob()], blobInfo.filename(), {
          type: blobInfo.blob().type
        })
        console.log(files)
        fileSlice(files)
      }
    }
  })
)
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
const uploadCount = ref(0)
const totalBlob = ref(0)
function fileSlice (file) {
  const LENGTH = 1024 * 1024 * 2

  totalBlob.value = Math.ceil(file.size / LENGTH)
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
      'Content-Type': 'multipart/form-data'
      // Authorization: `Bearer ${token}`
    },
    data: formData
  })
    .then((res) => {
      if (res.status === 204) {
        uploadCount.value++
        if (uploadCount.value === totalBlob.value) {
          const formData_2 = new FormData()
          formData_2.append('required_id', uploadFileData.required_id)
          formData_2.append(
            'original_name',
            uploadFileData.original_name
          )
          console.log('done')
          axios({
            method: 'POST',
            url: 'https://robot.zjtntd.com/admin/slice-upload/merge',
            headers: {
              'Content-Type': 'multipart/form-data'
              // Authorization: `Bearer ${token}`
            },
            data: formData_2
          }).then((res) => {
            console.log(res)
          })
        }
      }
    })
    .catch((err) => {
      console.log(err.response)
    })
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
watch(
  () => props.value,
  (newValue) => {
    myValue.value = newValue
  }
)

watch(
  () => myValue.value,
  (newValue) => {
    emits('input', newValue)
  }
)

</script>
