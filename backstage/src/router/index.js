import { createWebHashHistory, createRouter } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('../page/MainLayout.vue'),
    // 嵌套路由
    children: [
      {
        // 这里不设置值，是把main作为默认页面
        path: '',
        redirect: '/project'
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../page/login/index.vue')
      },
      {
        path: '/project',
        name: 'project',
        component: () => import('../page/project/project.vue')
      },
      {
        path: '/project/detail',
        name: 'project_detail',
        component: () => import('../page/project/detail.vue')
      },
      {
        path: '/project/create',
        name: 'project_create',
        component: () => import('../page/project/form.vue')
      },
      {
        path: '/project/update',
        name: 'project_update',
        component: () => import('../page/project/form.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('../page/articles/article.vue')
      },
      {
        path: '/article/detail',
        name: 'article_detail',
        component: () => import('../page/articles/detail.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_APP_URL_BASE),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  ifLogin(to, next)
})
const ifLogin = (to, next) => {
  const userInfo = localStorage.getItem('user_info')
  if (!userInfo && to.name !== 'login') {
    next('/login')
  } else if (userInfo && to.name === 'login') {
    next('/')
  } else {
    next()
  }
}

export default router
