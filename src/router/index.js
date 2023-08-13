// 路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main,
    redirect: '/home',
    children: [
      { path: 'home', name: 'home', component: Home }, // 首页
      { path: 'user', name: 'user', component: User }, // 用户管理
      { path: 'mall', name: 'mall', component: Mall }, // 商品管理
      { path: 'page1', name: 'page1', component: PageOne },
      { path: 'page2', name: 'page2', component: PageTwo }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
