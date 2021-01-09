<template>
  <div>
    <el-container>
      <el-header>
        <el-form :inline="true">
          <el-form-item>
            <el-select size="small" v-model="sort">
              <el-option value="asc">升序</el-option>
              <el-option value="desc">降序</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              size="small"
              placeholder="输入图片名字"
              v-model="keyword"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="getImgList">搜索</el-button>
          </el-form-item>
        </el-form>

        <div>
           <el-button type="primary" size="small" @click="removeCheckedImg"  v-show="ids.length>0"
            >选中删除</el-button>
          <el-button type="success" size="small" @click="class_form = true"
            >创建相册</el-button
          >
          <el-button type="warning" size="small" @click="upload_img = true"
            >上传图片</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside style="width: 200px">
          <ul>
            <li
              v-for="(item, index) in classList"
              :key="index"
              :class="{ act: item.id == cid }"
              @click.self="changeLeft(item.id)"
            >
              <span>{{ item.name }}</span>
              <el-dropdown @command="changeDrop">
                <span class="el-dropdown-link">
                  {{ item.images_count
                  }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{ type: 'edit', obj: item }"
                    >修改</el-dropdown-item
                  >
                  <el-dropdown-item :command="{ type: 'del', id: item.id }"
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </el-aside>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in imgList" :key="index">
              <el-card :body-style="{ padding: '0px' }">
                <el-image
                  :src="item.url"
                  style="width: 100%; height: 150px"
                  :preview-src-list="[item.url]"
                />
                <div style="padding: 14px">
                  <span>{{ item.name }}</span>
                  <div class="bottom clearfix">
                    <input type="checkbox" v-model="ids" :value="item.id"/>
                    <el-button
                      type="text"
                      class="button"
                      icon="el-icon-edit"
                      @click="modifyImg(item.id,item.name)"
                    ></el-button>
                    <el-button
                      type="text"
                      class="button"
                      icon="el-icon-delete"
                      @click="removeImg(item.id)"
                    ></el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer>
        <el-pagination
          @current-change="changePage"
          @size-change="changeSize"
          :current-page="page"
          :page-sizes="[10,20,30,40]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-footer>
    </el-container>

    <!-- 添加相册的dialog对话框 -->
    <el-dialog title="添加相册" :visible.sync="class_form">
      <el-form>
        <el-form-item label="相册名称" :label-width="'80px'">
          <el-input
            v-model="class_name"
            autocomplete="off"
            placeholder="输入相册的名字"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="'80px'">
          <el-input-number
            v-model="class_order"
            label="相册排序"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="class_form = false">取 消</el-button>
        <el-button type="primary" @click="addImgClass">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 添加相册的dialog对话框 -->
    <el-dialog title="编辑相册" :visible.sync="class_form1">
      <el-form>
        <el-form-item label="相册名称" :label-width="'80px'">
          <el-input
            v-model="classEdit.name"
            autocomplete="off"
            placeholder="输入相册的名字"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="'80px'">
          <el-input-number
            v-model="classEdit.order"
            label="相册排序"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="class_form1 = false">取 消</el-button>
        <el-button type="primary" @click="editImageClass">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 图片上传的逻辑 -->
    <el-dialog title="上传相册" :visible.sync="upload_img" @close="getImgClass">
      <div class="upload">
        <el-upload
          class="upload-demo"
          drag
          action="/admin/image/upload"
          multiple
          name="img"
          :headers="{token: this.$store.state.token}"
          :data="{image_class_id:this.cid}"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </el-dialog>
    <!-- 修改图片的表单值 -->
    <el-dialog title="修改图片" :visible.sync="edit_img">
       <el-form>
        <el-form-item label="相册名称" :label-width="'80px'">
          <el-input
            v-model="imgEdit.name"
            autocomplete="off"
            placeholder="输入相册的名字"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit_img = false">取 消</el-button>
        <el-button type="primary" @click="doModifyImg">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      sort: "",
      keyword: "",
      classList: [],
      cid: "", //相册分类id
      ids:[],//选中的图片ID
      page: 1,
      limit: 10,
      total: 0,
      imgList: [],

      // 相册表单数据
      class_form: false,
      class_name: "",
      class_order: 0,
      //编辑相册
      class_form1: false,
      classEdit: {
        name: "",
        order: "",
        id: "",
      },

      //上传图片
      upload_img: false,

      //图片名称的编辑
      edit_img: false,
      imgEdit:{
        id: 0,
        name: "",
      }
    };
  },
  mounted() {
    this.getImgClass(true);
  },
  methods: {
    //获取图片相册列表
    getImgClass(flag=false) {
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
        .get(
          `/admin/imageclass/${this.cid}/image/${this.page}?limit=${this.limit}&order=${this.sort}&keyword=${this.keyword}`
        )
        .then((res) => {
          console.log(res);
          this.imgList = res.data.list;
          this.total = res.data.totalCount;
        })
        .catch((error) => {});
    },
    //点击左侧菜单栏进行切换
    changeLeft(id) {
      this.cid = id; //改变id的值
      this.page = 1;
      this.getImgList();
    },
    //页码或者每页显示条数的切换操作
    changePage(page) {
      this.page = page;
      this.getImgList();
    },
    changeSize(size) {
      this.page = 1;
      this.limit = size;
      this.getImgList();
    },
    //页码或者每页显示条数的切换操作

    //添加相册的操作方法
    addImgClass() {
      if (this.class_name == "" || this.class_order == "") {
        this.$message.error("名字或者排序不能为空");
        return false;
      }

      //请求添加的接口
      this.$axios
        .post("/admin/imageclass", {
          order: this.class_order,
          name: this.class_name,
        })
        .then((res) => {
          this.$message.success("添加相册成功");

          this.getImgClass();
          this.class_form = false;
        })
        .catch((error) => {
          this.$message.error(error.response.data.msg);
          return false;
        });
    },
    //点击切换下拉菜单的时候的内容
    changeDrop(command) {
      console.log(command);

      if (command.type == "edit") {
        //点击编辑的操作
        this.class_form1 = true;
        this.classEdit = {
          id: command.obj.id,
          name: command.obj.name,
          order: command.obj.order,
        };
      }

      if (command.type == "del") {
        //删除的操作
        this.$confirm("你确定要删除吗?", "删除")
          .then((res) => {
            this.removeImageClass(command.id); //执行删除的方法
          })
          .catch(() => {});
      }
    },
    //编辑相册的内容
    editImageClass() {
      this.$axios
        .post("/admin/imageclass/" + this.classEdit.id, {
          name: this.classEdit.name,
          order: this.classEdit.order,
        })
        .then((res) => {
          this.$message.success("编辑相册成功");
          this.getImgClass();
          this.class_form1 = false;
        });
    },
    //删除相册的操作
    removeImageClass(id) {
      this.$axios
        .delete("/admin/imageclass/" + id, {
          name: this.classEdit.name,
          order: this.classEdit.order,
        })
        .then((res) => {
          this.$message.success("删除相册成功");
          this.getImgClass();
        });
    },
    
    //删除图片
    removeImg(id){
      this.$confirm("你确定要删除图片吗?,删除后不能取消了",'删除图片').then(res=>{
        this.$axios.delete(`/admin/image/${id}`).then(res=>{
          console.log(res);
          this.$message.success('删除图片成功');
          this.getImgClass();
        })
      }).catch(()=>{

      })
    },
    //批量删除图片
    removeCheckedImg(){
      this.$confirm("你确定要删除图片吗?,删除后不能取消了",'删除图片').then(res=>{
        this.$axios.post(`admin/image/delete_all`,{ids:this.ids}).then(res=>{
          console.log(res);
          this.$message.success('删除图片成功');
          this.getImgClass();
        })
      }).catch(()=>{

      })
    },
    //修改图片的名字,回调函数
    modifyImg(id,name){
      this.edit_img = true;
      this.imgEdit = {
        id: id,
        name: name,
      }
    },

    //执行图片名称的修改操作
    doModifyImg(){
      this.$axios.post("/admin/image/"+this.imgEdit.id,this.imgEdit).then(res=>{
        this.$message.success("修改图片名称成功");

        this.getImgClass();

        this.edit_img = false;
      })
    }
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
    background: #f0f0f0;
    border-bottom: #dddddd 1px solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-form {
      margin-top: 20px;
    }
  }
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
  }
  .el-footer {
    width: 100%;
    background: #f8f8f8;
    display: flex;
    align-items: center;
  }
}

.upload{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>