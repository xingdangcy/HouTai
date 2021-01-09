<template>
  <div>
    <!-- <div class="list-head">全民砍价 <van-icon name="arrow" /></div> -->
    <div class="cut-list" v-for="(item, index) in cutList" :key="item.id">
      <div class="cut-item">
        <img :src="item.pic" />
      </div>
      <div class="cut-info">
        <p class="title" v-html="item.name"></p>
        <p class="desc">{{ item.characteristic }}</p>
        <ul class="price">
          <li>
            <span>￥{{ item.minPrice }}</span>
            <p>低价</p>
          </li>
          <li>
            <span>￥{{ item.originalPrice }}</span>
            <p>原价</p>
          </li>
          <li>
            <span>{{ item.stores }}件</span>
            <p>限量</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:['cutList'],
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
//砍价列表区域
.cut-list {
  width: 100%;
  display: flex;
  padding-bottom: 10px;
  border-bottom: #dddddd 1px solid;
  .cut-item {
    width: 40%;
    padding: 0 10px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 200px;
    }
  }
  .cut-info {
    width: 60%;
    position: relative;
    font-size: 15px;
    .desc {
      width: 90%;
      color: #808080;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price {
      width: 100%;
      padding: 0px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      li {
        width: 30%;
        text-align: left;
      }
      li:nth-of-type(2),
      li:nth-of-type(3) {
        color: #808080;
      }
    }
  }
}
</style>