<template>
  <div>
    <vue3-tinymce v-model="state.content" :setting="state.setting" />
  </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, ref, defineProps, defineEmits, watch, onMounted } from 'vue'
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce'
onMounted(() => {
  console.log(state.content)
})
let uploadFileData = reactive({
  LENGTH: 1024 * 1024 * 2,
  start: 0,
  end: 0,
  blob: '',
  blob_num: 0,
  total_blob_num: 0,
  uuid: '',
  original_name: '',
  size: 0,
  mime: ''
})
const editImgSum = ref(0)
const props = defineProps({
  value: {
    type: String,
    default: () => {
      return ''
    }
  }
})
const emits = defineEmits({
  input: null
})
const state = reactive({
  content: props.value,
  // editor 配置项
  setting: {
    height: 400,
    width: 800,
    toolbar_items_size: 'small',
    toolbar_drawer: 'sliding',
    toolbar:
      'undo redo | fullscreen | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link unlink openlink image charmap pastetext print preview | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | indent outdent | superscript subscript | removeformat |',
    language_url:
      'https://unpkg.com/@jsdawn/vue3-tinymce@1.1.6/dist/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    font_formats:
      "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
    statusbar: false, // 底部的状态栏
    paste_data_images: true,
    images_file_types: 'jpeg,jpg,png,gif,bmp,webp',
    plugins: 'link image media table lists fullscreen quickbars',
    images_upload_handler: function (blobInfo, success, failure) {
      console.log(blobInfo)
      // blob转file
      const files = new window.File([blobInfo.blob()], blobInfo.filename(), {
        type: blobInfo.blob().type
      })
      console.log(files)
      // if (blobInfo.blob().size > 1000000) {
      //   alert('单张图片大小不能超过10MB')
      //   return false
      // }
      fileSlice(files)
    },
    init_instance_callback: editor => {
      editor.on('paste', e => {
        const remoteImages = reactive([])
        const doc = editor.getDoc()
        const items = doc.getElementsByTagName('img')
        console.log(items)
        // let picSize = 0;
        setTimeout(() => {
          if (items.length > 0) {
            for (let i = editImgSum.value; i < items.length; i++) {
              const element = items[i]
              var newSrc = element.getAttribute('_src') || element.src || ''
              const path = newSrc.replace(/(\?|#)[^'"]*/, '')
              const mime = path.substr(path.lastIndexOf('.') + 1)
              if (path.indexOf('http') === -1) {
                remoteImages.push({
                  path,
                  mime: 'jpeg' + i
                })
              } else {
                remoteImages.push({
                  path,
                  mime
                })
              }
            }
          }
          if (remoteImages.length > 0) {
            CatchRemoteImage(remoteImages, {
              success: data => {
                console.log(data)
                editor.save()
              },
              error: data => {
                // 上传出错回调
                console.log('error')
                console.log(data)
              }
            })
          }
        }, 200)
      })
    }
  }
})
function fileSlice (file) {
  const LENGTH = 1024 * 1024 * 2
  const startNum = uploadFileData.start ? uploadFileData.start : 0
  uploadFileData = {
    LENGTH,
    start: 0,
    end: startNum + LENGTH,
    blob: '',
    blob_num: 0,
    total_blob_num: Math.ceil(file.size / LENGTH),
    uuid: generateUUID(),
    original_name: file.name,
    size: file.size,
    mime: file.type
  }
  console.log(uploadFileData)
  for (let i = 0; i < uploadFileData.total_blob_num; i++) {
    uploadFileData.blob =
      uploadFileData.total_blob_num > 1 ? cutFile(file) : file
    sendFile(file)
  }
}
function sendFile () {
  uploadFileData.blob_num++
  const formData = new FormData()
  console.log(formData)
  formData.append('file', uploadFileData.blob)
  formData.append('uuid', uploadFileData.uuid)
  formData.append('blob_num', Number(uploadFileData.blob_num))
  formData.append('total_blob_num', Number(uploadFileData.total_blob_num))
  formData.append('size', Number(uploadFileData.size))
  formData.append('mime', uploadFileData.mime)
  formData.append('original_name', uploadFileData.original_name)
  axios({
    method: 'POST',
    url: 'https://ssvt.emergelab.com.cn/admin/upload/slice',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer 191|nQrnqd1HZAxbjz9g2AackyAq72LLVgTf2vghohMd'
    },
    data: formData
  })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      console.log(error.response)
    })
}
// 切割文件
function cutFile (file) {
  const fileBlob = file.slice(uploadFileData.start, uploadFileData.end)
  uploadFileData.start = uploadFileData.end
  uploadFileData.end = uploadFileData.start + uploadFileData.LENGTH
  return fileBlob
}
function CatchRemoteImage (images, callback) {
  console.log(images)
  axios({
    url: 'https://ssvt.emergelab.com.cn/admin/upload/images', // 接收远程图片抓去的后端地址
    method: 'post',
    data: { images: images },
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 191|nQrnqd1HZAxbjz9g2AackyAq72LLVgTf2vghohMd'
    }
  })
    .then(res => {
      if (res.status === 200) {
        callback.success(res.data)
        return !1
      }
      callback.error(res.data)
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
watch(() => props.value, newValue => {
  state.content.value = newValue
}
)
watch(() => state.content.value, newValue => {
  console.log(newValue)
  emits('input', newValue)
}
)
</script>
