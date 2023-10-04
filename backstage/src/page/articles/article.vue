<template>
  <div class="continer">
    <div class="page__breadcrumb back__breadcrumb"></div>
    <div class="continer_box">
      <div class="header">
        <div class="header_left">
          <span>作品列表</span>
        </div>
        <div class="header_right">
          <t-switch v-model="checked" size="large" :label="['收藏数最多', '正常']" @change="handleSwitch"></t-switch>
        </div>
      </div>
      <div class="search">
        <div class="search_left">
          <t-input
            type="text"
            placeholder="请输入作品名称搜索"
            v-model="title"
            @change="handleChange"
          >
            <template #prefix-icon>
              <t-icon name="search" />
            </template>
          </t-input>
        </div>
        <div class="search_right">
          <t-radio-group
            size="large"
            v-model="showValue"
            @change="handleChange"
          >
            <t-radio-button value="all">全部</t-radio-button>
            <t-radio-button :value="1">已发布</t-radio-button>
            <t-radio-button :value="2">未发布</t-radio-button>
          </t-radio-group>
        </div>
      </div>
      <t-table
        row-key="id"
        :data="tabelData.arr"
        :columns="columns"
        :selected-row-keys="selected.arr"
        @select-change="rehandleSelectChange"
      >
        <template #cover="{ row }">
          <img
            style="width: 100%; height: 100%; object-fit: cover"
            :src="row.cover[0]"
            alt=""
          />
        </template>
        <template #title="{ row }">
          <t-tooltip :content="row.title" theme="light">
            <span>{{ ellipsis(row.title) }}</span>
          </t-tooltip>
        </template>
        <template #topic="{ row }">
          {{ row.topic }}
        </template>
        <template #cont="{ row }">
          <t-tooltip :content="row.cont" theme="light">
            <span>{{ ellipsis(row.cont) }}</span>
          </t-tooltip>
        </template>
        <template #user_name="{ row }">
          {{ row.user_name && row.user_name }}
        </template>
        <template #state="{ row }">
          <span :class="`status showStatus${row.state}`">{{
            row.state == 2 ? "未发布" : "已发布"
          }}</span>
        </template>
        <template #operat="{ row }">
          <span class="operat__btn" @click="docheck(row.id)">查看</span>
          <span
            class="operat__btn"
            v-if="row.state === 2"
            @click="
              setArticleStatus({
                id: row.id,
                state: 1,
              })
            "
            >上架</span
          >
          <span
            class="operat__btn operat__btn_del"
            v-if="row.state === 1"
            @click="
              setArticleStatus({
                id: row.id,
                state: 2,
              })
            "
            >下架</span
          >
          <span class="operat__btn operat__btn_del" @click="dodelete(row.id)"
            >删除</span
          >
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
  articleList()
}
const tabelData = reactive({
  arr: []
})

// 表头
const columns = reactive([
  {
    colKey: 'row-select',
    type: 'multiple',
    width: '40',
    fixed: 'left'
  },
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
    width: '240'
  },
  {
    colKey: 'topic',
    title: '参赛命题',
    width: '140'
  },
  {
    colKey: 'cont',
    title: '关键词描述',
    width: '200'
  },
  {
    colKey: 'collect_number',
    title: '收藏数',
    width: '140'
  },
  {
    colKey: 'user_name',
    title: '创建人',
    width: '140'
  },
  {
    colKey: 'state',
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
const articleList = () => {
  const params = {
    per_page: pagination.obj.pageSize,
    page: pagination.obj.current
  }
  if (title.value) {
    params.title = title.value
  }
  if (showValue.value !== 'all') {
    params.state = showValue.value
  }
  if (checked.value) {
    params.top = 1
  }
  store.dispatch('articleList', params).then((res) => {
    tabelData.arr = res.data
    pagination.obj.total = res.totalCount
  })
}
// 设置命题状态
function setArticleStatus (params) {
  store.dispatch('setArticleStatus', params).then((res) => {
    MessagePlugin.success('操作成功')
    articleList()
  })
}
// 筛选
const handleChange = () => {
  pagination.obj.current = 1
  articleList()
}
// 删除
function dodelete (id) {
  const confirmDia = DialogPlugin.confirm({
    header: '确定删除此作品吗？',
    body: '删除后不可恢复',
    theme: 'warning',
    onConfirm: () => {
      store.dispatch('delArticle', { id: id }).then((res) => {
        MessagePlugin.success('删除成功')
        articleList()
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
// 批量
const selected = reactive({
  arr: []
})
const rehandleSelectChange = (value) => {
  selected.arr = value
}

// 开关
const checked = ref(true)
const handleSwitch = () => {
  articleList()
}
const ellipsis = (value) => {
  if (!value) return ''
  if (value.length > 25) {
    return value.slice(0, 25) + '...'
  }
  return value
}
onMounted(() => {
  articleList()
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
