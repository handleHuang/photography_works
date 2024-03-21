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
          <span>赛事列表</span>
        </div>
        <div class="header_right">
          <t-button @click="router.push('/competition/create')">+ 新增赛事</t-button>
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
          <img v-if="row.cover" style="width: 183px; height: 96px; object-fit: cover" :src="row.cover" alt="" />
        </template>
        <template #cont="{ row }">
          <span
            style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; text-overflow: ellipsis;">{{
              row.cont }}</span>
        </template>
        <template #online="{ row }">
          <span :class="`status showStatus${row.online}`">{{
            row.online == 2 ? '未发布' : '已发布'
          }}</span>
        </template>
        <template #operat="{ row }">
          <span class="operat__btn" @click="docheck(row.id)">查看</span>
          <span class="operat__btn" @click="doeditor(row.id)">编辑</span>
          <span class="operat__btn" v-if="row.online === 2" @click="
            setcompetitionStatus({
              id: row.id,
              online: 1
            })
            ">上架</span>
          <span class="operat__btn operat__btn_del" v-if="row.online === 1" @click="
            setcompetitionStatus({
              id: row.id,
              online: 2
            })
            ">下架</span>
          <span class="operat__btn operat__btn_del" @click="dodelete(row.id)">删除</span>
        </template>
      </t-table>
      <div class="pagination_box">
        <t-pagination v-model="pagination.obj.current" :total="pagination.obj.total"
          v-model:page-size="pagination.obj.pageSize" show-jumper @change="rehandleChange" />
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
function rehandleChange(changeParams) {
  pagination.obj.pageSize = changeParams.pageSize
  pagination.obj.current = changeParams.current
  competitionList()
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
    colKey: 'cover',
    title: '分类封面',
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
const competitionList = () => {
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
  store.dispatch('competitionList', params).then(res => {
    tabelData.arr = res.data
    pagination.obj.total = res.totalCount
  }).catch((err) => {
    console.log(err)
    MessagePlugin.warning(err.response.data.message)
  })
}
// 设置分类状态
function setcompetitionStatus(params) {
  store.dispatch('setcompetitionStatus', params).then(res => {
    MessagePlugin.success('操作成功')
    competitionList()
  }).catch(err => {
    MessagePlugin.warning(err.response.data.message)
  })
}
// 筛选
const handleChange = () => {
  pagination.obj.current = 1
  competitionList()
}
// 删除
function dodelete(id) {
  const confirmDia = DialogPlugin.confirm({
    header: '确定删除此分类吗？',
    body: '删除后不可恢复',
    theme: 'warning',
    onConfirm: () => {
      store.dispatch('delcompetition', { id: id }).then(res => {
        MessagePlugin.success('删除成功')
        competitionList()
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
function docheck(id) {
  router.push({
    path: '/competition/detail',
    query: {
      id: id
    }
  })
}
// 编辑
function doeditor(id) {
  router.push({
    path: '/competition/update',
    query: {
      id: id
    }
  })
}
onMounted(() => {
  competitionList()
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
