<template>
  <!-- 面包屑区域 -->
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">后台首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in this.$store.state.bread" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>