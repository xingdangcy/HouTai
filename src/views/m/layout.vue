<template>
  <div>
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar route active-color="#FF0000">
      <van-tabbar-item icon="home-o" to="/m/index">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/m/cate">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/m/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/m/my">我的</van-tabbar-item>
    </van-tabbar>
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

<style lang="scss" scoped>
.main{
  width: 100%;
  padding-bottom: 50px;
}
</style>