<template>
  <div class="continer continer_detail">
    <div class="page__breadcrumb back__breadcrumb">
      <div class="goback" @click="router.back()">
        <t-icon name="chevron-left" />
        返回上一级
      </div>
    </div>
    <div class="continer_box">
      <div class="header">
        <div class="header_left">
          <span>赛事详情</span>
        </div>
      </div>
      <div class="body">
        <div class="item">
          <div class="title">{{ detailData.obj.title }}</div>
          <span :class="`status showStatus${detailData.obj.online}`">{{
            detailData.obj.online == 2 ? "未发布" : "已发布"
          }}</span>
        </div>
        <div class="item">
          <span class="label">封面</span>
          <img v-if="detailData.obj.cover" class="cover" :src="detailData.obj.cover" alt="" />
        </div>
        <div class="item">
          <span class="label">描述</span>
          <div class="description">{{ detailData.obj.cont }}</div>
        </div>
        <div class="item">
          <span class="label">描述2</span>
          <div class="description">{{ detailData.obj.cont2 }}</div>
        </div>
        <div class="item">
          <t-table row-key="id" :data="tabelData.arr" :columns="columns" :max-height="619">
            <template #cover="{ row }">
              <img v-if="row.cover" style="width: 50px; height: 50px; object-fit: cover" :src="row.cover" alt="" />
            </template>
            <template #operat="{ row }">
              <!-- <span class="operat__btn" @click="doeditor(row.id)">编辑</span> -->
              <span class="operat__btn operat__btn_del" @click="handleRowDel(row.id)">删除</span>
            </template>
          </t-table>
        </div>
      </div>
      <div class="operate_box">
        <t-button variant="outline" v-if="detailData.obj.online === 2" @click="
          setProjectStatus({
            id: projectId,
            online: 1,
          })
          ">上架</t-button>
        <t-button variant="outline" v-if="detailData.obj.online === 1" @click="
          setProjectStatus({
            id: projectId,
            online: 2,
          })
          ">下架</t-button>
        <t-button @click="dodelete(projectId)" variant="outline">删除</t-button>
        <t-button @click="doeditor">编辑</t-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()
// const domain = 'https://aigc-1311564431.cos.ap-guangzhou.myqcloud.com/'
const projectId = route.query.id
// 详情
const detailData = reactive({ obj: {} })
const getDetail = () => {
  store.dispatch('competitionDetail', { id: projectId }).then((res) => {
    detailData.obj = res
    tabelData.arr = res.item_list
  })
}
// 设置分类状态
function setProjectStatus(params) {
  store
    .dispatch('setProjectStatus', params)
    .then((res) => {
      MessagePlugin.success('操作成功')
      getDetail()
    })
    .catch((err) => {
      MessagePlugin.warning(err.response.data.message)
    })
}
// 删除
function dodelete(id) {
  const confirmDia = DialogPlugin.confirm({
    header: '确定删除此数据吗？',
    body: '删除后不可恢复',
    theme: 'warning',
    onConfirm: () => {
      store
        .dispatch('delcompetition', { id: id })
        .then((res) => {
          MessagePlugin.success('删除成功')
          router.push('/competition')
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
function doeditor() {
  router.push({
    path: '/competition/update',
    query: {
      id: projectId
    }
  })
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
    title: '作品',
    width: '100'
  },
  {
    colKey: 'name',
    title: '作者',
  },
  {
    colKey: 'title',
    title: '主题',
  },
  {
    colKey: 'cont',
    title: '描述',
  },
  {
    colKey: 'operat',
    title: '操作',
    fixed: 'right',
    width: '184'
  }
])

// 删除
function handleRowDel(id) {
  const confirmDia = DialogPlugin.confirm({
    header: '确定删除此数据吗？',
    body: '删除后不可恢复',
    theme: 'warning',
    onConfirm: () => {
      store
        .dispatch('competitionRowDel', { id: id })
        .then((res) => {
          MessagePlugin.success('删除成功')
          getDetail()
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

onMounted(() => {
  getDetail()
})
</script>
<style lang="less" scoped src="../../assets/style/manage/manage.less"></style>
