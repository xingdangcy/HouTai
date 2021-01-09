<template>
  <div>
    <van-nav-bar
      title="人气推荐"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <div style="padding-top:50px;">
        <recommand :recommandList="recommandList" />
    </div>
    
  </div>
</template>

<script>
import recommand from "../common/recommand";
export default {
  name: "",
  components: {
    recommand,
  },
  data() {
    return {
      recommandList: [],
    };
  },
  mounted() {
    let url = this.$store.state.mobile.yxUrl;
    this.$axios.get(`${url}/shop/goods/list`).then((res) => {
      console.log(res.data);

      this.recommandList = res.data;
    });
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>