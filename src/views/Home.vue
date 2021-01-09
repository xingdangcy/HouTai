<template>
  <div class="home">
    <el-button type="danger">点击按钮</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },

  mounted(){
    this.$axios.post("/admin/login",{username:'admin',password:'admin'}).then(res=>{
      console.log(res);
    }).catch(error=>{
      console.log(error.response.data);
    })
  }
}
</script>
