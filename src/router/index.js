import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Details from '@/components/Details'
import Edit from '@/components/Edit'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Details',
      name: 'Details',
      component: Details,
      meta: {
        keepAlive: false //不需要缓存
      }
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit,
      meta: {
        keepAlive: false //不需要缓存
      }
    }
  ],

  //设置缓存返回跳转原页面
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }


})
