<template>
  <div class="container">
    <el-container>
      <el-header class="header1">
        <div>
          <span>Login</span>
          <i class="el-icon-shopping-cart-2" style="font-size: 25px"></i>
        </div>
      </el-header>
      <header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>Home</el-breadcrumb-item>
          <el-breadcrumb-item>Goods</el-breadcrumb-item>
        </el-breadcrumb>
      </header>
      <el-container class="main-box">
        <el-header style="height: 45px">
          <div>
            Sort:
            <span
              :style="{ color: sort_flag == 0 ? '#FF8800' : '#303030' }"
              @click="sort_flag = 0"
              >Default</span
            >
            <span @click="changeSort">
              Price
              <van-icon name="arrow-up" v-show="sort_flag == 1" />
              <van-icon name="arrow-down" v-show="sort_flag == 2" />
            </span>
          </div>
        </el-header>
        <el-container>
          <el-aside style="width: 200px">
            <el-menu
              :default-active="active_price.toString()"
              background-color="#F3F3F3"
              active-text-color="#FF0000"
              style="border-right: none"
              @select="changePrice"
            >
              <el-menu-item
                v-for="(item, index) in price"
                :key="index"
                :index="index.toString()"
                >{{ item }}</el-menu-item
              >
            </el-menu>
          </el-aside>
          <el-main v-loading="loading">
            <div class="goods-list">
              <div class="goods-item" v-for="item in goodsList" :key="item._id">
                <img :src="`/style/img/${item.productImage}`" alt="" />
                <div>
                  <p class="title">{{ item.productName }}</p>
                  <p class="price">￥{{ item.salePrice }}</p>
                  <el-button style="width: 100%">加入购物车</el-button>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      sort_flag: 0, // 0 默认排序  1 升序  2 降序
      price: [
        "全部",
        "0.00-100.00",
        "100.00-500.00",
        "500.00-1000.00",
        "1000.00-5000.00",
      ],
      active_price: 0,
      list: [],
      page: 1,
      loading: false,
    };
  },
  mounted() {
    this.getGoodsList();

    window.addEventListener("scroll", () => {
      let html = document.documentElement || document.body;

      if (html.scrollTop + html.clientHeight >= html.scrollHeight) {
        setTimeout(()=>{
              this.getGoodsList(); //调用加载更多的函数
        },1000)
      
      }
    });
  },
  methods: {
    changeSort() {
      if (this.sort_flag == 1) {
        this.sort_flag = 2;
      } else {
        this.sort_flag = 1;
      }
    },
    changePrice(key) {
      console.log(key);
      this.active_price = key;
    },

    getGoodsList() {
      if (this.page > 3) {
        return false;
      }
      this.loading = true;
      this.$axios.get(`/style/data${this.page}.json`).then((res) => {
        this.list.push(...res.result.list);
        setTimeout(()=>{
            this.loading = false;
        },2000);
      });
      this.page++;
    },
  },
  computed: {
    goodsList() {
      let arr = this.list; //转存数据b

      //先获取价格区间
      let price = this.price[this.active_price];
      console.log(price);
      if (price.indexOf("-") > -1) {
        let tmp = price.split("-");
        let [min, max] = tmp;

        arr = arr.filter((item) => {
          return item.salePrice >= min && item.salePrice < max;
        });
      }

      //排序的功能
      if (this.sort_flag != 0) {
        arr.sort((a, b) => {
          return this.sort_flag == 1
            ? a.salePrice - b.salePrice
            : b.salePrice - a.salePrice;
        });
      }

      return arr;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background: #f3f3f3;
  min-height: 600px;
  .el-container {
    width: 100%;
    .el-header {
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        padding: 0px 20px 5px 10px;
        color: #404040;
        cursor: pointer;
      }
    }
    header {
      padding: 10px;
      background: #dddddd;
    }
    .main-box {
      width: 90%;
      margin: 50px auto;
      .el-header {
        height: 40px;
      }

      .el-main {
        .goods-list {
          cursor: pointer;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .goods-item {
            width: 23%;
            margin: 1%;
            border: #dddddd 1px solid;
            box-sizing: border-box;
            background: #fff;
            img {
              width: 100%;
            }
            div {
              padding: 5px;
              box-sizing: border-box;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>