import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//导入axios对象，配置Vue原型
import axios from "./utils/request";
Vue.prototype.$axios = axios;

//配置element-ui信息
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


//配置vant-ui组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

//配置echarts 
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

//全局路由守卫
router.beforeEach((to, from, next) => {

  //判断是管理后台的路由地址
  if (to.path.indexOf("/admin") > -1) {
    //判断登陆页面
    if (to.path == "/admin/login") {//访问的是登陆页面

      if (store.state.token != "") {//用户已经登陆了
        next("/admin/home");
      }
    } else {//除了登陆页面其他页面
      //用户未登录的时候
      if (store.state.token == "") {
        next("/admin/login");
      }
    }

    //路由守卫中添加面包屑
    console.log(to.meta);
    if(to.meta.hasOwnProperty('bread')){
      //添加面包屑，调用vuex的方法
      store.commit("setBread",to.meta.bread);
    }else{
      store.commit("setBread",[]);
    }
  }

  console.log(to.meta);
  if(to.meta.hasOwnProperty("title")){
    document.title= to.meta.title;
  }else{
    document.title = "XD";
  }


  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
