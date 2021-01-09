<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="item">
        </div>
        </el-col>
      <el-col :span="6"><div class="item"></div></el-col>
      <el-col :span="6"><div class="item"></div></el-col>
      <el-col :span="6"><div class="item"></div></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12"><div class="item"></div></el-col>
      <el-col :span="12"><div class="item" id="echarts"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  name: "",
  data() {
    return {
      datas: {},
    };
  },
  mounted() {
    this.$axios.get("/json/data.json").then((res) => {
      console.log(res);
      this.datas = res;
      this.initEcharts();
    });
  },
  methods: {
    ...mapMutations({
      incr:'incr'
    }),

    ...mapMutations("goods",['jia']),
    ...mapMutations('user',{
      changeMsg: 'changeMsg'
    }),
    //初始化echarts
    initEcharts() {
      let myEchart = this.$echarts.init(document.getElementById("echarts"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: this.datas.type,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: this.datas.datas,
      };

      // 使用刚指定的配置项和数据显示图表。
      myEchart.setOption(option);
    },
  },
  computed: {
    ...mapState({num:'num'}),
    ...mapState('goods',['count','msg1']),
    ...mapGetters('goods',['sums'])
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  .item {
    background: #f8f8f8;
    border: #dddddd 1px solid;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
  }
  #echarts {
    width: 100%;
    height: 400px;
  }
}
</style>