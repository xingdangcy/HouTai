export default {
    namespaced: true,
    state:{
        count: 5,
        msg1:"积云琴姐爱大人",
    },
    mutations:{
        jia(state){
            state.count++;
        }
    },
    getters:{
        sums(state){
            return Math.pow(state.count,2);
        }
    }
}