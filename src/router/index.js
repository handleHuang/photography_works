import { createWebHistory, createRouter } from 'vue-router'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../page/login/Login.vue')
  },
  {
    path: '/',
    component: () => import('../page/MainLayout.vue'),
    // 嵌套路由
    children: [
      {
        // 这里不设置值，是把main作为默认页面
        path: '',
        redirect: '/articles'
      },
      {
        // 这里不设置值，是把main作为默认页面
        path: 'articles',
        name: 'articles',
        component: () => import('../page/articles/articles.vue')
      },
      {
        path: '/articles/create',
        name: 'articles_create',
        component: () => import('../page/articles/articlesForm.vue')
      },
      {
        path: '/articles/edit',
        name: 'articles_edit',
        component: () => import('../page/articles/articlesForm.vue')
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('../page/tags/tags.vue')
      },
      {
        path: 'tags/create',
        name: 'tags_create',
        component: () => import('../page/tags/tagsForm.vue')
      },
      {
        path: 'tags/edit',
        name: 'tags_edit',
        component: () => import('../page/tags/tagsForm.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('../page/user/User.vue')
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: () => import('../page/contacts/contacts.vue')
      },
      {
        path: 'contacts/create',
        name: 'contacts_create',
        component: () => import('../page/contacts/contactsForm.vue')
      },
      {
        path: 'contacts/edit',
        name: 'contacts_edit',
        component: () => import('../page/contacts/contactsForm.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes // `routes: routes` 的缩写
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
