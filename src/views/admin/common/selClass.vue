<template>
  <el-dialog
    title="图片管理"
    :visible.sync="sel_img"
    width="80%"
    @open="getImgClass"
  >
    <div class="imgList">
      <el-container>
        <el-aside width="150px">
          <ul>
            <li
              v-for="(item, index) in classList"
              :key="index"
              :class="{ act: item.id == cid }"
              @click="changeLeft(item.id)"
            >
              <span>{{ item.name }}</span>
              <span>{{ item.images_count }}</span>
            </li>
          </ul>
        </el-aside>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in imgList" :key="item.id">
              <el-card
                :body-style="{ padding: '0px' }"
                :class="{ act: avatar == item.url }"
              >
                <el-image
                  :src="item.url"
                  style="width: 100%; height: 150px"
                  @click="selectImg(item.url)"
                />
                <div style="padding: 14px">
                  <span>{{ item.name }}</span>
                  <div class="bottom clearfix">
                    <el-button
                      type="text"
                      class="button"
                      icon="el-icon-edit"
                    ></el-button>
                    <el-button
                      type="text"
                      class="button"
                      icon="el-icon-delete"
                    ></el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
    <div id="footer">
      <el-button type="success" @click="confirmImg">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  props:['sel_img'],
  data() {
    return {
      //选择图片
      classList: [],
      cid: "", //相册分类id
      imgList: [],
      avatar:''
    };
  },
  mounted() {},
  methods: {
    //获取图片相册列表
    getImgClass(flag = false) {
      this.$axios
        .get("/admin/imageclass/1")
        .then((res) => {
          console.log(res);
          this.classList = res.data.list;
          this.cid = res.data.list[0].id;
          this.getImgList();
        })
        .catch((error) => {});
    },
    //获取右侧的图片列表数据
    getImgList() {
      this.$axios
        .get(`/admin/imageclass/${this.cid}/image/1`)
        .then((res) => {
          console.log(res);
          this.imgList = res.data.list;
        })
        .catch((error) => {});
    },
    //选择头像的信息
    selectImg(url) {
      this.avatar = url;
      //this.sel_img = false;
    },
    //点击它，子传父触发
    confirmImg(){
        this.$emit('select', this.avatar);
    },
    //点击左侧菜单栏进行切换
    changeLeft(id) {
      this.cid = id; //改变id的值
      this.page = 1;
      this.getImgList();
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.imgList {
  width: 100%;
  .el-aside {
    min-height: 500px;
    overflow: auto;

    ul {
      width: 100%;
      padding: 0px;
      list-style: none;

      li {
        padding: 20px 10px;
        border-bottom: #dddddd 1px solid;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
      }
      li.act {
        background: #f0f9eb;
        color: #67c23a;
      }
    }
  }
  .el-main {
    .el-card {
      margin-bottom: 15px;
    }
    .el-card.act {
      border: #ff0000 1px solid;
    }
  }
}
</style>