import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//导入持久化依赖包
import VuexPersistence from 'vuex-persist'
//实例化持久化插件对象
const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage,//存储介质,
     key: "03_vuex",//存储到本地存储
})

import user from "./store/user";

import goods  from "./store/goods";
import mobile from "./store/mobile"

export default new Vuex.Store({
  state: {
    token: "",//管理后台token值
    users: {},
    isLoading: false,
    bread: [],//空面包屑

    //测试的数据
    num:10    
  },
  mutations: {
    //管理后台登陆成功后，存储用户的登陆数据,
    doLogin(state, obj){
      console.log(obj);
      state.token = obj.token;
      state.users = obj;
    },
    //执行退出的操作
    logout(state){
      state.token = "";
      state.users = {};
    },
    //设置loading效果
    setLoading(state,status){
      state.isLoading = status;
    },
    //设置面包屑
    setBread(state,bread){
      console.log(bread);
      state.bread = bread;
    },

    //测试方法
    incr(state, num=1){
      console.log('调用增加的方法',num)
      state.num += num;
    },
    changeMsg(state,msg){
      console.log(msg);
    }
  },
  actions: {

  },

  getters:{
    totals(state){
        return Math.pow(state.num,3);
    }
  },

  modules:{
    user,goods,mobile,
  },

  plugins: [vuexLocal.plugin],//配置持久化插件即可
})
