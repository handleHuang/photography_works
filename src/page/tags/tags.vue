<template>
  <div class="tags">
    <div class="page__breadcrumb back__breadcrumb"></div>
    <div class="tags_box">
      <div class="header_title">文章标签</div>
      <div class="state_box">
        <div class="state_left">
          <t-button @click="toCreate">新建</t-button>
        </div>
      </div>
      <div class="page_table">
        <t-base-table row-key="id" :data="tabelData.arr" :columns="columns">
          <template #updated_at="slotProps">
            <span>{{ slotProps.row.updated_at }}</span>
          </template>
          <template #operat="slotProps">
            <span class="operat__btn" @click="doeditor(slotProps)">编辑</span>
            <span class="operat__btn" @click="dodelete(slotProps)">删除</span>
          </template>
        </t-base-table>
        <div class="pagination_box">
          <t-pagination
            v-model="pagination.current"
            :total="pagination.total"
            v-model:page-size="pagination.pageSize"
            @change="rehandleChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { formatDateTime } from '../../utils /transfertime'
const router = useRouter()
// 分页
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 20
})
function rehandleChange (changeParams) {
  pagination.pageSize = changeParams.pageSize
  pagination.current = changeParams.current
  tagList()
}
// 表格数据
const columns = reactive([
  {
    width: '100',
    colKey: 'id',
    title: 'ID'
  },
  {
    width: '180',
    colKey: 'name',
    title: '标签名称'
  },
  {
    colKey: 'description',
    title: '描述',
    ellipsis: true
  },
  {
    colKey: 'updated_at',
    title: '最新发布'
  },
  {
    colKey: 'operat',
    title: '操作'
  }
])
const tabelData = reactive({
  arr: []
})
// request
const store = useStore()
function tagList () {
  const params = {
    per_page: pagination.pageSize,
    page: pagination.current
  }
  store.dispatch('tagList', params).then((res) => {
    console.log(res)
    res.data.forEach((item) => {
      item.updated_at = formatDateTime(item.updated_at)
    })
    tabelData.arr = res.data
    pagination.total = res.pager.TotalCount
  })
}
onMounted(() => {
  tagList()
})
// function
// 编辑标签
function doeditor ({ row }) {
  router.push({
    path: '/tags/edit',
    query: {
      id: row.id
    }
  })
}
// 删除标签
function dodelete ({ row }) {
  console.log(row.id)
}
// 创建标签
function toCreate () {
  router.push('/tags/create')
}
</script>

<style lang="less" scoped src="../../assets/style/tags/tags.less">
</style>
