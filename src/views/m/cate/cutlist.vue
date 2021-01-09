<template>
  <div>
    <van-nav-bar
      title="砍价列表"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <div style="padding-top: 50px">
      <cut :cutList="cutList" />
    </div>
  </div>
</template>

<script>
import cut from "../common/cut";
export default {
  name: "",
  components: {
    cut,
  },
  data() {
    return {
      url: "",
      cutList: [],
    };
  },
  mounted() {
    this.url = this.$store.state.mobile.yxUrl;
    this.$axios.get(`${this.url}/shop/goods/kanjia/list`).then((res) => {
      for (let key in res.data.goodsMap) {
        this.cutList.push(res.data.goodsMap[key]);
      }
      console.log(this.cutList);
    });
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>