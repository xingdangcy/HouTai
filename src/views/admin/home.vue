<template>
  <div>
    <el-container>
      <el-header>
        <div class="logo">UNI-ADMIN</div>
        <div>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="selectMenu"
          >
            <el-menu-item
              :index="String(index)"
              v-for="(item, index) in menus"
              :key="index"
              >{{ item.name }}</el-menu-item
            >
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">修改</el-menu-item>
              <el-menu-item index="logout">退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>

      <el-container>
        <el-aside class="open" id="aside">
          <div id="toggle" @click="toggleMenu">|||</div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            router
          >
            <el-menu-item
              :index="item.url"
              v-for="(item, index) in subMenu"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main v-loading="this.$store.state.isLoading">
          <bread />
          <div class="box">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import nav from "@/utils/navMenu"; //导入菜单栏
import bread from "./common/bread";
export default {
  name: "",
  components: { bread },
  data() {
    return {
      activeIndex: 0,
      isCollapse: false,
      menus: [], //一级菜单
      subMenu: [], //二级菜单
    };
  },
  created() {
    console.log(nav);
    this.menus = nav; //把一级菜单进行赋值
    this.subMenu = this.menus[0].children;
  },
  mounted() {
    this.setMenuH();
  },
  methods: {
    //点击折叠菜单
    toggleMenu() {
      //菜单直接进行折叠的操作
      this.isCollapse = !this.isCollapse;

      if (this.isCollapse) {
        aside.className = "el-aside close";
      } else {
        aside.className = "el-aside open";
      }
    },

    //设置左侧菜单栏的高度，充满屏幕
    setMenuH() {
      //1. 计算出浏览器可视化高度
      let html = document.documentElement || document.body;
      let wh = html.clientHeight; //可视化窗口的高度

      //2. aside高度=wh-60
      aside.style.height = wh - 60 + "px";
    },
    //点击头部导航栏切换菜单样式
    selectMenu(index) {
      console.log(index);
      this.subMenu = this.menus[index].children;
      console.log(this.subMenu);
      //执行退出的操作
      if (index == "logout") {
        //1. 先请求退出的接口地址
        this.$axios
          .post("/admin/logout")
          .then((res) => {
            //清空token值，清空vuex中的内容
            this.$store.commit("logout");
            this.$message.success("退出成功");
            //回到登陆页面去
            this.$router.push("/admin/login");
          })
          .catch((error) => {
            this.$message.error(error.response.data.msg);
            return false;
          });
      }
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;

  .el-header {
    width: 100%;
    background: #545c64;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }

  .el-aside {
    cursor: pointer;
    transition: width 1.5s ease;
    border-right: #dddddd 1px solid;
    .el-menu {
      border-right: none;
    }
    #toggle {
      width: 100%;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      font-weight: bold;
    }
  }
  .open {
    width: 200px !important;
  }
  .close {
    width: 68px !important;
  }

  .el-main {
    padding: 0px;
    box-sizing: border-box;
    .bread {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border-bottom: #dddddd 1px solid;
    }
    .box{
      padding: 15px;
      box-sizing: border-box;
    }
  }
}
</style>