import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Login from '../components/login.vue'
import Layout from '../components/layout.vue'
import Bubble from '../components/bubble.vue'

const routerHistory = createWebHashHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/login'
      // component: HelloWorld
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/layout',
      component: Layout,
    },
    {
      path: '/bubble',
      component: Bubble,
    },
  ]
})
 
export default router