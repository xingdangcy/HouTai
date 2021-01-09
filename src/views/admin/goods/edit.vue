<template>
  <div>
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
          <el-option
            :value="item.id"
            :label="item.name"
            v-for="(item, index) in cates"
            :key="index"
          ></el-option>
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
          <el-option
            :value="item.id"
            :label="item.name"
            v-for="(item, index) in express.list"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="fixed-btn">
      <el-button type="success" @click="addGoods">提交</el-button>
    </div>

    <el-backtop :bottom="100" :right="40">
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
        stock_display: "0",
        ischeck: 0,
      },

      cates: [],
      express: [],
    };
  },
  mounted() {},
  methods: {
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
</style>