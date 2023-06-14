<template>
  <div class="continer">
    <div class="page__breadcrumb back__breadcrumb">
      </div>
    <div class="continer_box">
      <div class="header">
        <div class="header_left">
          <span>作品列表</span>
        </div>
      </div>
      <div class="search">
        <div class="search_left">
          <t-input type="text" placeholder="请输入作品名称搜索" v-model="title" @change="handleChange">
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
      <t-table row-key="id" :data="tabelData.arr" :columns="columns">
        <template #cover="{ row }">
          <img
          v-if="row.articles"
            style="width: 183px; height: 96px; object-fit: cover"
            :src="domain + row.articles[0].path"
            alt=""
          />
        </template>
        <template #projectName="{row}">
          {{ row.project&&row.project.title }}
        </template>
        <template #description="{row}">
          <t-tooltip :content="row.description" theme="light">
              <span>{{ ellipsis(row.description) }}</span>
            </t-tooltip>
          </template>
        <template #ai_json="{row}" >

        {{ row.ai_json&&row.ai_json.title }}
          </template>
        <template #online_status="{ row }">
          <span :class="`status showStatus${row.online_status}`">{{
            row.online_status == 2 ? '未发布' : '已发布'
          }}</span>
        </template>
        <template #operat="{ row }">
          <span class="operat__btn" @click="docheck(row.id)">查看</span>
          <span
            class="operat__btn"
            v-if="row.online_status === 2"
            @click="
              setArticleStatus({
                article_id: row.id,
                online_status: 1
              })
            "
            >上架</span
          >
          <span
            class="operat__btn operat__btn_del"
            v-if="row.online_status === 1"
            @click="
              setArticleStatus({
                article_id: row.id,
                online_status: 2
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
const domain = 'https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/'
const showValue = ref('all')
const title = ref('')
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
  ]
})

// 表头
const columns = reactive([
  {
    colKey: 'id',
    title: 'ID',
    fixed: 'left',
    width: '80'
  },
  {
    colKey: 'cover',
    title: '作品封面',
    width: '180'
  },
  {
    colKey: 'title',
    title: '作品名称',
    width: '140',
    ellipsis: {
      theme: 'light'
    }
  },
  {
    colKey: 'projectName',
    title: '参赛命题',
    width: '140'
  },
  {
    colKey: 'description',
    title: '关键词描述',
    width: '240'
  },
  {
    colKey: 'ai_json',
    title: '所用AI平台',
    width: '140'
  },
  {
    colKey: 'online_status',
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
  if (title.value) {
    params.title = title.value
  }
  if (showValue.value !== 'all') {
    params.online_status = showValue.value
  }
  store.dispatch('articleList', params).then(res => {
    tabelData.arr = res.data
    pagination.obj.total = res.total
  })
}
// 设置命题状态
function setArticleStatus (params) {
  store.dispatch('setArticleStatus', params).then(res => {
    MessagePlugin.success('操作成功')
    projectList()
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
    header: '确定删除此作品吗？',
    body: '删除后不可恢复',
    theme: 'warning',
    onConfirm: () => {
      store.dispatch('delArticle', { ids: [id] }).then(res => {
        MessagePlugin.success('删除成功')
        projectList()
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
    path: '/article/detail',
    query: {
      id: id
    }
  })
}
const ellipsis = (value) => {
  if (!value) return ''
  if (value.length > 25) {
    return value.slice(0, 25) + '...'
  }
  return value
}
onMounted(() => {
  projectList()
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
