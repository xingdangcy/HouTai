import axios from "axios";//导入axios对象
import store from "../store";//导入vuex对象
import router from '../router';

//创建axios的对象
const Server = axios.create({
    baseURL: "",//请求接口的基地址
    timeout: 5000,//超时时间
})

//设置请求拦截器
Server.interceptors.request.use((config) => {
    console.log(config);
    console.log(store.state.token);
    config.headers['token'] = store.state.token;

    store.commit("setLoading", true);
    return config;
}, (error) => {
    return Promise.reject(error);
})

//设置响应拦截器
Server.interceptors.response.use((response) => {

    if (response.status == 200) {
        setTimeout(() => {
            store.commit("setLoading", false);
        }, 1500)

        return response.data;
    }
    return response;
}, (error) => {
    console.log(error.response.data);

    // if (error.response.data.msg == '') {
    //     store.commit("logout");//退出登录
    //     router.push("/admin/login");
    // }

    return Promise.reject(error);
});

//导出Serve模块对象
export default Server;
