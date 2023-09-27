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
          <span>用户列表</span>
        </div>
        <div class="header_right">
          <!-- <t-button @click="router.push('/project/create')">+ 新增命题</t-button> -->
        </div>
      </div>
      <div class="search">
        <div class="search_left">
          <t-input
            type="text"
            placeholder="请输入标题搜索"
            v-model="keyword"
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
            <t-radio-button :value="0">超级管理员</t-radio-button>
            <t-radio-button :value="1">管理员</t-radio-button>
            <t-radio-button :value="2">普通用户</t-radio-button>
          </t-radio-group>
        </div>
      </div>
      <t-table
        row-key="id"
        :data="tabelData.arr"
        :columns="columns"
        :max-height="619"
      >
        <template #identity="{ row }">
          <span :class="`status showStatus${row.identity}`">{{
            row.identity == 2
              ? "普通用户"
              : row.identity == 0
              ? "超级管理员"
              : "管理员"
          }}</span>
        </template>
        <template #operat="{ row }">
          <span class="operat__btn" @click="doeditor(row.id)">编辑</span>
          <span
            class="operat__btn operat__btn_del"
            @click="dodelete(row.id)"
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
  arr: []
})

// 表头
const columns = reactive([
  {
    colKey: 'id',
    title: 'ID',
    width: '60'
  },
  {
    colKey: 'username',
    title: '账号',
    width: '180'
  },
  {
    colKey: 'email',
    title: '邮箱',
    width: '140'
  },
  {
    colKey: 'identity',
    title: '身份',
    width: '100'
  },
  {
    colKey: 'operat',
    title: '操作',
    fixed: 'right',
    width: '184'
  }
])
// 用户列表
const projectList = () => {
  const params = {
    pageSize: pagination.obj.pageSize,
    page: pagination.obj.current
  }
  if (keyword.value) {
    params.keyword = keyword.value
  }
  if (showValue.value !== 'all') {
    params.identity = showValue.value
  }
  store.dispatch('getUserList', params).then((res) => {
    tabelData.arr = res.data
    pagination.obj.total = res.totalCount
  })
}
// 筛选
const handleChange = () => {
  pagination.obj.current = 1
  projectList()
}
const userIdentity = JSON.parse(localStorage.getItem('user_info')).identity
// 删除
function dodelete (id) {
  const confirmDia = DialogPlugin.confirm({
    header: '确定删除此命题吗？',
    body: '删除后不可恢复',
    theme: 'warning',
    onConfirm: () => {
      store
        .dispatch('delUser', { id: id, identity: userIdentity })
        .then((res) => {
          MessagePlugin.success('删除成功')
          projectList()
        })
        .catch((err) => {
          MessagePlugin.warning(err.response.data.message)
        })
      confirmDia.destroy()
    },
    onClose: () => {
      confirmDia.hide()
    }
  })
}
// 编辑
function doeditor (id) {
  router.push({
    path: '/userList/updata',
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
