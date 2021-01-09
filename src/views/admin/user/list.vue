<template>
  <div>
    <div class="search">
      <el-form :inline="true">
        <el-form-item>
          <el-input
            type="text"
            placeholder="输入内容"
            size="small"
            v-model="keyword"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="levelId" placeholder="请选择">
            <el-option
              v-for="item in userLevel"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="info" size="small" @click="getUserList"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="user_form = true"
            >添加用户</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 用户列表数据 -->
    <el-table :data="userlist" style="width: 100%" border>
      <el-table-column prop="date" label="会员" width="180">
        <template slot-scope="scope">
          <div>
            <el-image :src="scope.row.avatar" style="width: 60px" />
            {{ scope.row.username }}
          </div> </template
        >
      </el-table-column>
      <el-table-column prop="user_level.name" label="会员等级" width="180">
      </el-table-column>
      <el-table-column prop="address" label="登陆注册">
        <template slot-scope="scope">
          <div>注册时间: {{ scope.row.create_time }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="danger" size="mini" v-if="scope.row.status == 0"
              >禁用</el-button
            >
            <el-button type="success" size="mini" v-else>启用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div id="page">
      <el-pagination
        @size-change="changeSize"
        @current-change="changePage"
        :current-page="page"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 添加用户的对话框显示 -->
    <el-dialog title="添加用户" :visible.sync="user_form">
      <el-form>
        <el-form-item label="用户名" :label-width="'80px'">
          <el-input
            v-model="users.username"
            autocomplete="off"
            placeholder="用户名"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="'80px'">
          <el-input
            type="password"
            v-model="users.password"
            autocomplete="off"
            placeholder="用户名字"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="爱称" :label-width="'80px'">
          <el-input
            v-model="users.nickname"
            autocomplete="off"
            placeholder="爱称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="'80px'">
          <el-button
            icon="el-icon-plus"
            size="small"
            v-if="users.avatar == ''"
            @click="sel_img = true"
          ></el-button>
          <el-image
            :src="users.avatar"
            v-else
            style="width: 80px; border-radius: 5px"
            @click="sel_img=true"
          />
        </el-form-item>
        <el-form-item label="会员等级" :label-width="'80px'">
          <el-select
            v-model="users.user_level_id"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in userLevel"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" :label-width="'80px'">
          <el-input
            v-model="users.phone"
            autocomplete="off"
            placeholder="手机"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'80px'">
          <el-input
            v-model="users.email"
            autocomplete="off"
            placeholder="手机"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="'80px'">
          <el-radio v-model="users.status" label="1" border size="small"
            >启用</el-radio
          >
          <el-radio v-model="users.status" label="0" border size="small"
            >禁用</el-radio
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="user_form = false">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 选择头像信息 -->
    <selClass :sel_img="sel_img" @select="confirmImg"/>
  </div>
</template>

<script>
import selClass from "../common/selClass";
export default {
  name: "",
  components:{
    selClass
  },
  data() {
    return {
      userlist: [],
      userLevel: [],
      keyword: "",
      levelId: "",
      page: 1,
      limit: 3,
      total: 0,

      //添加用户的操作
      user_form: false,
      users: {
        username: "",
        password: "",
        nickname: "",
        avatar: "",
        user_level_id: "",
        phone: "",
        email: "",
        status: "1",
      },

      //点击弹框选择对象
      sel_img: false,

    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    //获取用户列表数据
    getUserList() {
      this.$axios
        .get(
          `/admin/user/${this.page}?limit=${this.limit}&keyword=${this.keyword}&user_level_id=${this.levelId}`
        )
        .then((res) => {
          console.log(res);
          this.userlist = res.data.list;
          this.userLevel = res.data.user_level;
          this.total = res.data.totalCount;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    //添加用户的操作信息
    addUser() {
      if (this.users.username == "" || this.users.password == "") {
        this.$message.error("信息不能为空");
        return false;
      }

      this.$axios.post("/admin/user", this.users).then((res) => {
        this.$message.success("添加会员成功");
        this.getUserList();

        this.user_form = false;
      }).catch(error=>{
        this.$message.error(error.response.data.msg);
        return false;
      })
    },

    confirmImg(url){
      this.users.avatar = url;
      this.sel_img = false;
    },

    changeSize(size) {
      this.limit = size;
      this.getUserList();
    },
    changePage(page) {
      this.page = page;

      this.getUserList();
    },
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.search {
  padding: 10px;
  box-sizing: border-box;
}

</style>