<template>
  <div class="box1">
    <el-form label-width="100px">
      <el-form-item label="商品名称">
        <el-input
          type="text"
          placeholder="输入商品名称"
          v-model="goods.title"
        />
      </el-form-item>
      <el-form-item label="商品名称封面">
        <el-button
          icon="el-icon-plus"
          size="small"
          @click="sel_img = true"
          v-if="goods.cover == ''"
        ></el-button>
        <el-image
          :src="goods.cover"
          v-else
          style="width: 150px"
          @click="sel_img = true"
        />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="goods.category_id">
          <el-option :value="item.id" :label="item.name" v-for="(item,index) in cates" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          placeholder="输入商品描述"
          v-model="goods.desc"
        />
      </el-form-item>
      <el-form-item label="单位">
        <el-input placeholder="输入单位" v-model="goods.unit" />
      </el-form-item>

      <el-form-item label="总库存">
        <el-input
          placeholder="输入商品名字"
          type="number"
          v-model="goods.stock"
          style="width: 200px"
        >
          <el-button slot="append">件</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="库存预警">
        <el-input
          placeholder="输入商品名字"
          type="number"
          v-model="goods.min_stock"
          style="width: 200px"
        >
          <el-button slot="append">件</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="最低销售价">
        <el-input
          placeholder="输入商品名字"
          v-model="goods.min_price"
          type="number"
          style="width: 200px"
        >
          <el-button slot="append">元</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="最低原价">
        <el-input
          placeholder="输入商品名字"
          v-model="goods.min_oprice"
          type="number"
          style="width: 200px"
        >
          <el-button slot="append">元</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="库存显示">
        <el-radio v-model="goods.stock_display" label="1" border>是</el-radio>
        <el-radio v-model="goods.stock_display" label="0" border>否</el-radio>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-radio v-model="goods.status" label="1" border>上架</el-radio>
        <el-radio v-model="goods.status" label="0" border>放入仓库</el-radio>
      </el-form-item>
      <el-form-item label="运费模板">
        <el-select v-model="goods.express_id">
          <el-option :value="item.id" :label="item.name" v-for="(item,index) in express.list" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="fixed-btn">
      <el-button type="success" @click="addGoods" v-if="id==0">提交</el-button>
      <el-button type="success" @click="editGoods" v-else>修改</el-button>
    </div>
    <el-backtop
      :bottom="100"
      :right="40"
    >
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        UP
      </div>
    </el-backtop>
    <selClass :sel_img="sel_img" @select="confirmImg" />
  </div>
</template>

<script>
import selClass from "../common/selClass";
export default {
  name: "",
  components: {
    selClass,
  },
  data() {
    return {
      sel_img: false,
      goods: {
        cover: "",
        category_id: "",
        title: "",
        express_id: "",
        desc: "",
        unit: "",
        stock: "",
        min_stock: "",
        min_price: "",
        min_oprice: "",
        status: "0",
        stock_display: "1",
        ischeck: 0,
      },

      cates:[],
      express:[],
      id: 0,//商品的id值
    };
  },
  mounted() {
    //如果是编辑的情况，读取一下详情的接口
    if(this.$route.params.hasOwnProperty('id')){
      this.id = this.$route.params.id;

      this.$axios.get(`/admin/goods/read/${this.id}`).then(res=>{
        this.goods = res.data;
      })
    }
    this.getData();
  },
  methods: {
    //获取创建商品所需要的数据
    getData(){
      this.$axios.get("/admin/goods/create").then(res=>{
        console.log(res);
        this.cates = res.data.cates;
        console.log(this.cates);
        this.express = res.data.express;
      }).catch(res=>{

      })
    },
    addGoods(){
      if(this.goods.title==""){
        this.$message.error("表单内容不能为空");
        return false;
      }

      //请求发布商品的接口地址
      this.$axios.post("/admin/goods",this.goods).then(res=>{
        this.$message.success('添加商品成功');
        this.$router.push("/admin/goods/list");
      }).catch(error=>{
        this.$message(error.response.data.msg);
      })
    },

    editGoods(){

      //请求发布商品的接口地址
      this.$axios.post(`/admin/goods/${this.goods.id}`,this.goods).then(res=>{
        this.$message.success('添加商品成功');
        this.$router.push("/admin/goods/list");
      }).catch(error=>{
        this.$message(error.response.data.msg);
      })
    },
    //点击确认选择头像的信息
    confirmImg(url) {
      console.log(url);
      this.sel_img = false;
      this.goods.cover = url;
    },
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>