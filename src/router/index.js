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
        redirect: '/upload'
      },
      {
        path: 'upload',
        name: 'upload',
        component: () => import('../page/upload/upload.vue')
      },
      {
        path: 'upload/thesisForm',
        name: 'upload_thesisForm',
        component: () => import('../page/upload/thesisForm.vue')
      },
      {
        path: 'upload/newsForm',
        name: 'upload_newsForm',
        component: () => import('../page/upload/newsForm.vue')
      },
      {
        path: 'manage',
        name: 'manage',
        component: () => import('../page/manage/manage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_APP_URL_BASE),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   ifLogin(to, next)
// })
// const ifLogin = (to, next) => {
//   const userInfo = localStorage.getItem('user_info')
//   if (!userInfo && to.name !== 'login') {
//     next('/login')
//   } else if (userInfo && to.name === 'login') {
//     next('/')
//   } else {
//     next()
//   }
// }

export default router
