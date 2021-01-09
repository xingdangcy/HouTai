<template>
  <div class="container">
    <!-- 轮播图区域 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <van-image :src="item.picUrl" />
        </van-swipe-item>
      </van-swipe>
      <ul class="nav">
        <li>
          <van-icon name="like" />
          <p>签到</p>
        </li>
        <li>
          <van-icon name="gift" />
          <p>礼券</p>
        </li>
        <li @click="$router.push('/m/cut')">
          <van-icon name="coupon" />
          <p>砍价</p>
        </li>
        <li>
          <van-icon name="fire" />
          <p>专栏</p>
        </li>
      </ul>
    </div>

    <!-- 砍价列表区域 -->
    <div class="cut">
      <lhead title="全民砍价" @click.native="$router.push('/m/cut')" />
      <cut :cutList="cutList" />
    </div>

    <!-- 专题栏 -->
    <div class="special">
      <lhead title="精选专题" />
      <div class="special_list">
        <van-swipe :loop="false" :width="300" :show-indicators="false">
          <van-swipe-item v-for="item in specialList" :key="item.id">
            <img :src="item.pic" >
            <p v-html="item.title"></p>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <!-- 精选商品 -->
    <div class="recommand">
      <lhead title="人气推荐" @click.native="$router.push('/m/recommand')"/>
      <recommand :recommandList="recommandList"/>
    </div>
  </div>
</template>

<script>
import lhead from "../common/lhead";
import cut from "../common/cut";
import recommand from "../common/recommand"
export default {
  name: "",
  components: {
    lhead,
    cut,
    recommand,
  },
  data() {
    return {
      url: "",
      bannerList: [],
      cutList: [],
      specialList:[],
      recommandList:[],
    };
  },
  mounted() {
    this.url = this.$store.state.mobile.yxUrl;
    this.getBanner(); //banner
    this.getCut(); //砍价信息
    this.getSpecial();//精选专题
    this.getRecommand();
  },
  methods: {
    //首页banner管理接口
    getBanner() {
      // this.$axios.get('');

      this.$axios.get(`${this.url}/banner/list`).then((res) => {
        console.log(res);
        this.bannerList = res.data;
      });
    },

    //砍价列表接口
    getCut() {
      this.$axios.get(`${this.url}/shop/goods/kanjia/list`).then((res) => {
        console.log(res);
        let arr = res.data.result; //返回的result的数组 砍价列表
        let goodMap = res.data.goodsMap; //返回的goodsMap对象,商品详情
        //获取列表最后两条
        arr.slice(-2).forEach((item) => {
          this.cutList.push(goodMap[item.goodsId]);
        });

        console.log(this.cutList);
      });
    },

    //精选专题
    getSpecial() {
      this.$axios.get(`${this.url}/cms/news/list`).then(res=>{
        console.log(res);
        this.specialList = res.data;
      })
    },

    //推荐商品列表
    getRecommand() {
      this.$axios.get(`${this.url}/shop/goods/list`).then(res=>{
        console.log(res.data);
        //先过滤掉测试
        let arr = res.data.filter(item=>{
          return item.name.indexOf('测试') == -1;
        })
        console.log(arr);

        this.recommandList = arr.slice(-4);
      })
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background: #f0f0f0;
  //轮播图样式
  .banner {
    width: 100%;
    position: relative;
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
    }
    //导航栏
    .nav {
      width: 100%;
      padding: 0px;
      margin: 0px;
      background: #fff;
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 0px;
      left: 0px;
      padding-top: 20px;
      border-radius: 20% 20% 0 0;
      li {
        width: 25%;
        text-align: center;
        .van-icon {
          font-size: 30px;
          color: #a00000;
        }
        p {
          font-size: 18px;
        }
      }
    }
  }

  //砍价列表
  .cut,
  .special,
  .recommand {
    width: 100%;
    background: #fff;
    margin-top: 15px;
    //精选专题
    .special_list{
      img{
        width: 100%;
        height: 180px;
      }
      .van-swipe-item{
        margin-right: 10px;
      }
    }
  }

  


  
}
</style>