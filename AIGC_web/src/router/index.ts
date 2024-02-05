import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '../pages/index/index.vue'
import Updata from '../pages/updata/index.vue'
import Detail from '../pages/detail/index.vue'
import WorkList from '../pages/workList/index.vue'
import User from '../pages/user/index.vue'
import Login from '../pages/login/index.vue'
import Teaching from '../pages/teaching/index.vue'

const routes: RouteRecordRaw[] = [
  // {
  //   name: 'index',
  //   path: '/index',
  //   component: Index
  // }
  {
    path: '/',
    redirect: "/index",
    // 嵌套路由
    children: [
      {
        path: 'index',
        name: 'index',
        component: Index,
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: 'updata',
        name: 'updata',
        component: Updata,
      },
      {
        path: 'detail',
        name: 'detail',
        component: Detail,
      },
      {
        path: 'workList',
        name: 'workList',
        component: WorkList,
      },
      {
        path: 'user',
        name: 'user',
        component: User,
      },
      {
        path: 'teaching',
        name: 'teaching',
        component: Teaching,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  
});
export default router