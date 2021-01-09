<template>
  <div>
    <!-- 选项卡切换效果 -->
    <el-tabs v-model="tab" @tab-click="changeTab">
      <el-tab-pane
        :label="item.label"
        :name="item.type"
        v-for="(item, index) in tabs"
        :key="index"
      />
    </el-tabs>
    <!-- 表单区域 -->
    <el-form :inline="true">
      <el-form-item>
        <el-input
          size="small"
          placeholder="输入要搜索的商品名称"
          v-model="keyword"
        />
      </el-form-item>
      <!-- <el-form-item>
         <el-select v-model="goods.category_id">
          <el-option :value="item.id" :label="item.name" v-for="(item,index) in cates" :key="index"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button size="mini" type="info" @click="getGoodsList">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="success" @click="$router.push('/admin/goods/create')">发布商品</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="danger">批量删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" @click="changeStaus(1)">上架</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" @click="changeStaus(0)">下架</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表区域 -->
    <el-table border :data="goodsList" @selection-change="selectTable">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="商品">
          <template slot-scope="scope">
              <div>
                  <el-image :src="scope.row.cover" style="width:80px;"/>
                  <p>{{scope.row.title}}[{{scope.row.category.name}}]</p>
              </div>
          </template>
      </el-table-column>
      <el-table-column label="实际销量" prop="sale_count">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div>
              <el-tag type="danger" v-show="scope.row.status==0">仓库</el-tag>
              <el-tag type="success" v-show="scope.row.status==1">上架</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" >
         <template slot-scope="scope">
          <div>
              <el-button type="success" size="mini" v-show="scope.row.ischeck==0" @click="checkPass({id:scope.row.id})">审核通过</el-button>
              <el-button type="danger" size="mini" v-show="scope.row.ischeck==0" @click="checkPass({id:scope.row.id,status:2})">审核拒绝</el-button>
              <el-tag type="danger" v-show="scope.row.ischeck==2">拒绝</el-tag>
              <el-tag type="success" v-show="scope.row.ischeck==1">通过</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库存" prop="stock"></el-table-column>
      <el-table-column label="价格">
         <template slot-scope="scope">
          <div>
             ￥{{scope.row.min_price}}/￥{{scope.row.min_oprice}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template  slot-scope="scope">
          <div>
            <el-button type="text" @click="$router.push({name:'admin_goods_create',params:{id: scope.row.id}})">基础设置</el-button>
            <el-button type="text" style="color: #FF0000;">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <el-pagination
         @size-change="changeSize"
        @current-change="changePage"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      //头部tabs数据切换
      tabs: [
        { label: "全部", type: "all" },
        { label: "审核中", type: "checking" },
        { label: "出售中", type: "saling" },
        { label: "已下架", type: "off" },
        { label: "库存预警", type: "min_stock" },
        { label: "回收站", type: "delete" },
      ],
      tab: "all",

      //商品列表数据
      goodsList: [],
      page: 1,
      limit: 10,
      total: 0,
      keyword: "",
      cates: [],

      ids:[],//批量要操作的数组数据
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    //点击头部选项卡切换值
    changeTab(data) {
      console.log(data.name);
      console.log(this.tab);
      this.getGoodsList();
    },
    //获取商品列表数据
    getGoodsList() {
      this.$axios
        .get(
          `/admin/goods/${this.page}?limit=${this.limit}&tab=${this.tab}&title=${this.keyword}`
        )
        .then((res) => {
          console.log(res);
          this.goodsList = res.data.list;
          this.total = res.data.totalCount;

          this.cates = res.data.cates;
        });
    },
    //列表选中状态发生改变的时候触发,把ids筛选出来
    selectTable(table){
      console.log(table);
      let ids = [];

      table.forEach(item => {
        ids.push(item.id);
      });
      this.ids = ids;
    },

    changeStaus(status){
      if(this.ids.length == 0){
        this.$message.error('没有选择数据');
        return false;
      }
      this.$axios.post("/admin/goods/changestatus",{ids:this.ids,status:status}).then(res=>{
        this.getGoodsList();
      }).catch(res=>{

      })
    },

    //审核通过或者不通过的事件
    checkPass({id,status=1}){
      console.log(id,status);

      this.$axios.post(`/admin/goods/${id}/check`,{ischeck:status}).then(res=>{
        this.$message.success("审核成功");
        this.getGoodsList();
      })
    },

    changeSize(size) {
      this.limit = size;
      this.getGoodsList();
    },
    changePage(page) {
      this.page = page;

      this.getGoodsList();
    },
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>