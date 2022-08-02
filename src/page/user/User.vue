<template>
  <div class="User" ref="getHeight">
    <div class="page__breadcrumb back__breadcrumb"></div>
    <div class="User_box">
      <div class="header_title">用户管理</div>
      <div class="state_box">
        <div class="state_left">
          <t-button>新建</t-button>
        </div>
      </div>
      <div class="page_table">
        <t-base-table row-key="id" :data="tabelData.arr" :columns="columns" hover>
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
    title: '用户名'
  },
  {
    colKey: 'phone',
    title: '手机号'
  },
  {
    colKey: 'email',
    title: '邮箱'
  },
  {
    colKey: 'roles',
    title: '角色'
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
function doeditor ({ row }) {
  console.log(row.id)
}
function dodelete ({ row }) {
  console.log(row.id)
}
</script>

<style lang="less" scoped src="../../assets/style/User/User.less">
</style>
