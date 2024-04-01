<template>
  <div class="plan-manage" ref="planManage">
    <el-row>
      <el-col>
        <div class="btnTop">
          <div style="float:left">
            <el-button size="small" type="primary">创建</el-button>
          </div>
          <div style="float:right;margin-left:10px">
            <el-button size="small">筛选</el-button>
          </div>

          <div style="float:right;margin-left:10px">
            <el-input
              clearable
              size="small"
              class="inputSearch"
              v-model="sContent"
              placeholder="根据名称搜索..."
              @change="handleChangeSearch"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px">
      <el-col>
        <div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            :header-cell-style="styleObj"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="date" label="序号" min-width="120"></el-table-column>
            <el-table-column prop="name" label="标题" align="left">
              <template slot-scope="scope" @click="clickPlanDetail">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column prop="name" label="状态" align="center" min-width="180"></el-table-column>
            <el-table-column prop="name" label="负责人" align="center" min-width="180"></el-table-column>
            <el-table-column prop="date" label="计划结束时间" align="center" min-width="180"></el-table-column>
            <el-table-column label="操作" min-width="140" align="center">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  class="setstart"
                  @click="handleStart(scope.row)"
                >启动</el-link>
                <el-link
                  type="primary"
                  :underline="false"
                  class="setstop"
                  @click="handleStop(scope.row)"
                >暂停</el-link>
                <el-link
                  type="primary"
                  :underline="false"
                  class="setend"
                  @click="details(scope.row)"
                >结束</el-link>
                <el-link
                  type="primary"
                  class="setedit"
                  :underline="false"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-link>
                <el-link
                  type="primary"
                  class="setfinish"
                  :underline="false"
                  @click="handleFinish(scope.$index, scope.row)"
                >归档</el-link>
                <el-link
                  type="primary"
                  :underline="false"
                  class="setdelete"
                  @click="handledelete(scope.$index, scope.row)"
                >删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="pageBox">
            <div style="float:left">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChangetask"
                :current-page.sync="Pagetask"
                :page-sizes="[10,20,50,100]"
                :page-size="limitp"
                layout="total, sizes"
                :total="schedulenumtask"
              ></el-pagination>
            </div>
            <div style="float:right">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChangetask"
                :current-page.sync="Pagetask"
                :page-sizes="[10,20,50,100]"
                :page-size="limitp"
                layout="prev, pager, next, jumper"
                :total="schedulenumtask"
              ></el-pagination>
            </div>
          </div>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Notification, Message } from "element-ui";

export default {
  name: "work-form",
  components: {},
  props: {},
  data() {
    return {
      styleObj: {
        "background-color": "#f8f9f9",
        "border-left": "1px solid #fff"
      },
      Pagetask: 1,
      limitp: 10,
      schedulenumtask: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {},
  mounted() {
    // this.$refs.planManage.style.height = window.innerHeight + "px";
  },
  computed: {},
  methods: {
    clickPlanDetail() {
      console.log("")
      this.$router.push({
        path: "/sys/systemLists"
      });
    },
    handleChangeSearch() {},
    handleSelectionChange() {}
  }
};
</script>

<style lang='less' scoped>
.plan-manage {
  background-color: #fff;
  font-size: 12px;
  padding: 18px;
  height: 90%;

  .setstart,
  .setstop,
  .setend,
  .setedit,
  .setfinish,
  .setdelete {
    font-size: 14px;
    margin-right: 8px;
  }
}
</style>

