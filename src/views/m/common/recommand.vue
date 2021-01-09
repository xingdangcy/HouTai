<template>
  <div class="recommand-list">
    <div class="item" v-for="item in recommandList" :key="item.id">
      <img :src="item.pic" />
      <p v-html="item.name"></p>
      <p>
        {{ item.characteristic == "" ? "hello 你好" : item.characteristic }}
      </p>
      <p>￥{{ item.originalPrice }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:['recommandList'],
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
//商品列表
.recommand-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 48%;
    margin: 2% 1%;
    padding: 10px;
    box-sizing: border-box;
    border: #dddddd 1px solid;
    img {
      width: 100%;
      height: 210px;
    }
    p:nth-of-type(2) {
      color: #808080;
      font-size: 13px;
    }
    p:nth-of-type(3) {
      color: #ff0000;
      font-size: 14px;
    }
  }
}
</style>