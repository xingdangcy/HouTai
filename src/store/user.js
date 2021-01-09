export default {
    namespaced: true,
    state:{
        msg:"hello 用户你好",
    },
    mutations:{
        changeMsg(state,msg){
            state.msg =msg;
        }
    },
    getters:{

    }
}