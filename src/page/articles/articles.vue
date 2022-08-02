<template>
  <div class="artices">
    <div class="page__breadcrumb back__breadcrumb"></div>
    <div class="artices_box">
      <div class="header_title">文章管理</div>
      <div class="state_box">
        <div class="state_left">
          <t-button @click="toCreate">新建文章</t-button>
        </div>
        <div class="state_right">
          <t-radio-group
            size="large"
            v-model="checked"
            @change="handleSearchChange"
          >
            <t-radio-button value="all">全部</t-radio-button>
            <t-radio-button :value="1">已上架</t-radio-button>
            <t-radio-button :value="0">未上架</t-radio-button>
          </t-radio-group>
        </div>
      </div>
      <div class="search_box">
        <div class="search_left">
          <t-select
            v-model="categories"
            :options="options"
            placeholder="请选择"
            multiple
            clearable
            @change="categoriesChange"
          />
        </div>
        <div class="search_right">
          <t-input
            type="text"
            v-model="keyword"
            @change="handleInputChange"
            placeholder="请输入项目标题搜索"
          >
            <template #suffix-icon>
              <t-icon name="search" />
            </template>
          </t-input>
        </div>
      </div>
      <div class="page_table">
        <t-base-table
          row-key="id"
          :data="tabelData.arr"
          :columns="columns"
          hover
        >
          <template #cover="slotProps">
            <el-image
              :src="domain+slotProps.row.cover"
              :initial-index="4"
              :preview-src-list="imageList"
              fit="cover"
            />
          </template>
          <template #description="slotProps">
            <t-tooltip :content="slotProps.row.about" theme="light">
              <span>{{ ellipsis(slotProps.row.about) }}</span>
            </t-tooltip>
          </template>
          <template #categories="slotProps">
            <span
              v-for="item in slotProps.row.categories"
              :key="item.name"
              style="margin-right: 8px"
            >
              {{ item.name }}
            </span>
          </template>
          <template #type="slotProps">
            <div
              :class="`state state${
                slotProps.row.is_recommended
                  ? '2'
                  : slotProps.row.status === 1
                  ? '1'
                  : '0'
              }`"
            >
              <div class="state__sign" />
              <span class="state__text">
                {{
                  slotProps.row.is_recommended
                    ? "已置顶"
                    : slotProps.row.status === 1
                    ? "已上架"
                    : "未上架"
                }}
              </span>
            </div>
          </template>
          <template #operat="slotProps">
            <span class="operat__btn" @click="docheck(slotProps)">查看</span>
            <span class="operat__btn" @click="doeditor(slotProps)">编辑</span>
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
<script setup >
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const domain = JSON.parse(localStorage.getItem('user_info')).domain

const imageList = reactive([])
// 分页
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 20
})
function rehandleChange (changeParams) {
  pagination.pageSize = changeParams.pageSize
  pagination.current = changeParams.current
  articleList()
}
// select
let categories = reactive([])
function categoriesChange (e) {
  categories = e
  articleList()
}
const options = reactive([
  { label: '可持续', value: 1 },
  { label: '更健康', value: 2 },
  { label: '更多元', value: 3 },
  { label: '促平等', value: 4 },
  { label: '除污染', value: 5 },
  { label: '更公平', value: 6 },
  { label: '促增长', value: 7 },
  { label: '减碳排', value: 8 },
  { label: '无障碍', value: 9 }
])

// search
let keyword = ref('')
function handleInputChange (e) {
  keyword = e
  articleList()
}

// 表格数据
const columns = reactive([
  {
    width: '100',
    colKey: 'id',
    title: 'ID'
  },
  {
    colKey: 'cover',
    title: '文章封面'
  },
  {
    width: '190',
    colKey: 'title',
    title: '文章标题'
  },
  {
    width: '190',
    colKey: 'description',
    title: '项目简介'
  },
  {
    colKey: 'categories',
    title: '分类'
  },
  {
    width: '100',
    colKey: 'like_count',
    title: '点赞数'
  },
  {
    colKey: 'type',
    title: '展示状态'
  },
  {
    colKey: 'operat',
    title: '操作'
  }
])
const tabelData = reactive({
  arr: []
})
const checked = ref('all')
function handleSearchChange (e) {
  checked.value = e
  articleList()
}
// request
const store = useStore()
function articleList () {
  const params = {
    per_page: pagination.pageSize,
    page: pagination.current,
    categories_id: [],
    Status: ''
  }
  if (keyword.value !== '') {
    params.keyword = keyword
  }
  if (categories) {
    params.categories_id.push(...categories)
  }
  if (checked.value === 1) {
    params.Status = '1'
  } else if (checked.value === 0) {
    params.Status = '0'
  }
  store.dispatch('articleList', params).then((res) => {
    console.log(res)
    res.data.forEach(item => {
      imageList.push(domain + item.cover)
    })
    tabelData.arr = res.data
    pagination.total = res.pager.TotalCount
  })
}
onMounted(() => {
  articleList()
})
// function
function ellipsis (value) {
  if (!value) return ''
  if (value.length > 18) {
    return value.slice(0, 18) + '...'
  }
  return value
}
// 编辑
function doeditor ({ row }) {
  console.log(row.id)
  router.push({
    path: '/articles/edit',
    query: {
      id: row.id
    }
  })
}
// 查看
function docheck ({ row }) {
  console.log(row.id)
}
// 新建文章
function toCreate () {
  router.push('/articles/create')
}
</script>

<style lang="less" scoped src="../../assets/style/articles/articles.less">
</style>
