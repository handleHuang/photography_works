<template>
  <div class="continer">
    <div class="page__breadcrumb back__breadcrumb">
        <!-- <div class="goback">
          <t-icon name="chevron-left" />
          返回上一级
        </div> -->
      </div>
    <div class="continer_box">
      <div class="header">
        <div class="header_left">
          <span>命题列表</span>
        </div>
        <div class="header_right">
          <t-button @click="router.push('/project/create')">+ 新增命题</t-button>
        </div>
      </div>
      <div class="search">
        <div class="search_left">
          <t-input type="text" placeholder="请输入标题搜索" v-model="keyword" @change="handleChange">
            <template #prefix-icon>
              <t-icon name="search" />
            </template>
          </t-input>
        </div>
        <div class="search_right">
          <t-radio-group size="large" v-model="showValue" @change="handleChange">
            <t-radio-button value="all">全部</t-radio-button>
            <t-radio-button :value="1">已发布</t-radio-button>
            <t-radio-button :value="2">未发布</t-radio-button>
          </t-radio-group>
        </div>
      </div>
      <t-table row-key="id" :data="tabelData.arr" :columns="columns" :max-height="619">
        <template #cover="{ row }">
          <img
          v-if="row.cover"
            style="width: 183px; height: 96px; object-fit: cover"
            :src="row.cover"
            alt=""
          />
        </template>
        <template #online="{ row }">
          <span :class="`status showStatus${row.online}`">{{
            row.online == 2 ? '未发布' : '已发布'
          }}</span>
        </template>
        <template #operat="{ row }">
          <span class="operat__btn" @click="docheck(row.id)">查看</span>
          <span class="operat__btn"  @click="doeditor(row.id)">编辑</span>
          <span
            class="operat__btn"
            v-if="row.online === 2"
            @click="
              setProjectStatus({
                id: row.id,
                online: 1
              })
            "
            >上架</span
          >
          <span
            class="operat__btn operat__btn_del"
            v-if="row.online === 1"
            @click="
              setProjectStatus({
                id: row.id,
                online: 2
              })
            "
            >下架</span
          >
          <span class="operat__btn operat__btn_del"  @click="dodelete(row.id)">删除</span>
        </template>
      </t-table>
      <div class="pagination_box">
        <t-pagination
          v-model="pagination.obj.current"
          :total="pagination.obj.total"
          v-model:page-size="pagination.obj.pageSize"
          show-jumper
          @change="rehandleChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import { reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
// const domain = 'https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/'
const showValue = ref('all')
const keyword = ref('')
// 分页
const pagination = reactive({
  obj: {
    total: 0,
    current: 1,
    pageSize: 20
  }
})
function rehandleChange (changeParams) {
  pagination.obj.pageSize = changeParams.pageSize
  pagination.obj.current = changeParams.current
  projectList()
}
const tabelData = reactive({
  arr: [
    // {
    //   id: 1,
    //   title: '用AI共绘⻓城',
    //   description:
    //     '共绘⻓城故事，针对⻓城经典故事《孟姜女哭⻓城》、《冰山运石》、《嘉峪山传说》、《山羊驮砖》，选取其中一个故事，为故事章节/画面进行文生图配图，制作⻓城故事绘本。',
    //   file_id: 1,
    //   online: 1,
    //   cover: {
    //     id: 1,
    //     path: 'uploads/2023/05/30/ab78e6caaf041bf44fe81528db2c3d09.png',
    //     mine: 'image/png',
    //     original_name: 'dkbmftegp',
    //     size: 475465,
    //     filename: 'ab78e6caaf041bf44fe81528db2c3d09.png',
    //     extension: 'png',
    //     type: 'cover'
    //   }
    // },
    // {
    //   id: 2,
    //   title: '用孩子的眼睛看世界',
    //   description:
    //     '探索孩子们想象丰富的世界和独特的视⻆，组委会将收集到的各地方、学校和年级的X位孩子们的画 作或文字，形成资料，提供给参赛者进行二次创作。',
    //   file_id: 2,
    //   online: 0,
    //   cover: {
    //     id: 2,
    //     path: 'uploads/2023/05/30/929ae24ef553897140d1a80ea173e83a.png',
    //     mine: 'image/png',
    //     original_name: 'dkbmftegp',
    //     size: 734546,
    //     filename: '929ae24ef553897140d1a80ea173e83a.png',
    //     extension: 'png',
    //     type: 'cover'
    //   }
    // },
    // {
    //   id: 1,
    //   title: '用AI共绘⻓城',
    //   description:
    //     '共绘⻓城故事，针对⻓城经典故事《孟姜女哭⻓城》、《冰山运石》、《嘉峪山传说》、《山羊驮砖》，选取其中一个故事，为故事章节/画面进行文生图配图，制作⻓城故事绘本。',
    //   file_id: 1,
    //   online: 1,
    //   cover: {
    //     id: 1,
    //     path: 'uploads/2023/05/30/ab78e6caaf041bf44fe81528db2c3d09.png',
    //     mine: 'image/png',
    //     original_name: 'dkbmftegp',
    //     size: 475465,
    //     filename: 'ab78e6caaf041bf44fe81528db2c3d09.png',
    //     extension: 'png',
    //     type: 'cover'
    //   }
    // },
    // {
    //   id: 2,
    //   title: '用孩子的眼睛看世界',
    //   description:
    //     '探索孩子们想象丰富的世界和独特的视⻆，组委会将收集到的各地方、学校和年级的X位孩子们的画 作或文字，形成资料，提供给参赛者进行二次创作。',
    //   file_id: 2,
    //   online: 0,
    //   cover: {
    //     id: 2,
    //     path: 'uploads/2023/05/30/929ae24ef553897140d1a80ea173e83a.png',
    //     mine: 'image/png',
    //     original_name: 'dkbmftegp',
    //     size: 734546,
    //     filename: '929ae24ef553897140d1a80ea173e83a.png',
    //     extension: 'png',
    //     type: 'cover'
    //   }
    // },
    // {
    //   id: 1,
    //   title: '用AI共绘⻓城',
    //   description:
    //     '共绘⻓城故事，针对⻓城经典故事《孟姜女哭⻓城》、《冰山运石》、《嘉峪山传说》、《山羊驮砖》，选取其中一个故事，为故事章节/画面进行文生图配图，制作⻓城故事绘本。',
    //   file_id: 1,
    //   online: 1,
    //   cover: {
    //     id: 1,
    //     path: 'uploads/2023/05/30/ab78e6caaf041bf44fe81528db2c3d09.png',
    //     mine: 'image/png',
    //     original_name: 'dkbmftegp',
    //     size: 475465,
    //     filename: 'ab78e6caaf041bf44fe81528db2c3d09.png',
    //     extension: 'png',
    //     type: 'cover'
    //   }
    // },
    // {
    //   id: 2,
    //   title: '用孩子的眼睛看世界',
    //   description:
    //     '探索孩子们想象丰富的世界和独特的视⻆，组委会将收集到的各地方、学校和年级的X位孩子们的画 作或文字，形成资料，提供给参赛者进行二次创作。',
    //   file_id: 2,
    //   online: 1,
    //   cover: {
    //     id: 2,
    //     path: 'uploads/2023/05/30/929ae24ef553897140d1a80ea173e83a.png',
    //     mine: 'image/png',
    //     original_name: 'dkbmftegp',
    //     size: 734546,
    //     filename: '929ae24ef553897140d1a80ea173e83a.png',
    //     extension: 'png',
    //     type: 'cover'
    //   }
    // },
    // {
    //   id: 1,
    //   title: '用AI共绘⻓城',
    //   description:
    //     '共绘⻓城故事，针对⻓城经典故事《孟姜女哭⻓城》、《冰山运石》、《嘉峪山传说》、《山羊驮砖》，选取其中一个故事，为故事章节/画面进行文生图配图，制作⻓城故事绘本。',
    //   file_id: 1,
    //   online: 1,
    //   cover: {
    //     id: 1,
    //     path: 'uploads/2023/05/30/ab78e6caaf041bf44fe81528db2c3d09.png',
    //     mine: 'image/png',
    //     original_name: 'dkbmftegp',
    //     size: 475465,
    //     filename: 'ab78e6caaf041bf44fe81528db2c3d09.png',
    //     extension: 'png',
    //     type: 'cover'
    //   }
    // },
    // {
    //   id: 2,
    //   title: '用孩子的眼睛看世界',
    //   description:
    //     '探索孩子们想象丰富的世界和独特的视⻆，组委会将收集到的各地方、学校和年级的X位孩子们的画 作或文字，形成资料，提供给参赛者进行二次创作。',
    //   file_id: 2,
    //   online: 1,
    //   cover: {
    //     id: 2,
    //     path: 'uploads/2023/05/30/929ae24ef553897140d1a80ea173e83a.png',
    //     mine: 'image/png',
    //     original_name: 'dkbmftegp',
    //     size: 734546,
    //     filename: '929ae24ef553897140d1a80ea173e83a.png',
    //     extension: 'png',
    //     type: 'cover'
    //   }
    // }
  ]
})

// 表头
const columns = reactive([
  {
    colKey: 'id',
    title: 'ID',
    width: '60'
  },
  {
    colKey: 'cover',
    title: '命题封面',
    width: '180'
  },
  {
    colKey: 'title',
    title: '标题',
    fixed: 'left',
    width: '140',
    ellipsis: {
      theme: 'light'
    }
  },
  {
    colKey: 'cont',
    title: '描述',
    width: '240'
  },
  {
    colKey: 'online',
    title: '状态',
    width: '100'
  },
  {
    colKey: 'operat',
    title: '操作',
    fixed: 'right',
    width: '184'
  }
])
const projectList = () => {
  const params = {
    per_page: pagination.obj.pageSize,
    page: pagination.obj.current
  }
  if (keyword.value) {
    params.keyword = keyword.value
  }
  if (showValue.value !== 'all') {
    params.online = showValue.value
  }
  store.dispatch('projectList', params).then(res => {
    tabelData.arr = res.data
    pagination.obj.total = res.totalCount
  })
}
// 设置命题状态
function setProjectStatus (params) {
  store.dispatch('setProjectStatus', params).then(res => {
    MessagePlugin.success('操作成功')
    projectList()
  }).catch(err => {
    MessagePlugin.warning(err.response.data.message)
  })
}
// 筛选
const handleChange = () => {
  pagination.obj.current = 1
  projectList()
}
// 删除
function dodelete (id) {
  const confirmDia = DialogPlugin.confirm({
    header: '确定删除此命题吗？',
    body: '删除后不可恢复',
    theme: 'warning',
    onConfirm: () => {
      store.dispatch('delProject', { id: id }).then(res => {
        MessagePlugin.success('删除成功')
        projectList()
      }).catch(err => {
        MessagePlugin.warning(err.response.data.message)
      })
      confirmDia.destroy()
    },
    onClose: () => {
      confirmDia.hide()
    }
  })
}
// 查看
function docheck (id) {
  router.push({
    path: '/project/detail',
    query: {
      id: id
    }
  })
}
// 编辑
function doeditor (id) {
  router.push({
    path: '/project/update',
    query: {
      id: id
    }
  })
}
onMounted(() => {
  projectList()
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
