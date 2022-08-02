<template>
  <div class="contacts">
    <div class="page__breadcrumb back__breadcrumb"></div>
    <div class="contacts_box">
      <div class="header_title">联系我们</div>
      <div class="state_box">
        <div class="state_left">
          <t-button @click="toCreate">新建</t-button>
        </div>
      </div>
      <div class="page_table">
        <t-base-table
          row-key="id"
          :data="tabelData.arr"
          :columns="columns"
          hover
        >
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
  userList()
}
// 表格数据
const columns = reactive([
  {
    width: '100',
    colKey: 'id',
    title: 'ID'
  },
  {
    colKey: 'username',
    title: '标题'
  },
  {
    colKey: 'phone',
    title: '联系电话'
  },
  {
    colKey: 'email',
    title: '邮箱'
  },
  {
    colKey: 'updated_at',
    title: '更新时间'
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
function userList () {
  const params = {
    per_page: pagination.pageSize,
    page: pagination.current
  }
  store.dispatch('userList', params).then((res) => {
    console.log(res)
    res.data.forEach((item) => {
      item.updated_at = formatDateTime(item.updated_at)
      for (let index = 0; index < item.roles.length; index++) {
        item.roles[index] = item.roles[index].name
      }
      item.roles = item.roles.join(' , ')
    })
    tabelData.arr = res.data
    pagination.total = res.pager.TotalCount
  })
}
onMounted(() => {
  userList()
})
// function
// 编辑
function doeditor ({ row }) {
  console.log(row.id)
  router.push({
    path: '/contacts/edit',
    query: {
      id: row.id
    }
  })
}
function dodelete ({ row }) {
  console.log(row.id)
}
// 新建
function toCreate () {
  router.push('/contacts/create')
}
</script>

<style lang="less" scoped src="../../assets/style/contacts/contacts.less">
</style>
