import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

//导入路由admin.js
import admin from "./router/admin";
import mobile from "./router/mobile";

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: "/admin/login"
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path:"/mi/index",
      component: ()=>import("@/views/mi/index")
    },
    ...admin,//扩展运算符导入模块
    ...mobile, //移动端路由定义 
  ]
})
