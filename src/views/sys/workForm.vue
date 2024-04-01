<template>
  <div class="work-form" ref="workForm">
    <!-- <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>-->
    <el-row class="row_1 row_normal">
      <el-col>
        <div>
          <span class="span_normal">早上好,张三</span>
          <div clss="textRight" style="text-align:right">
            <el-button size="small" type="primary">编辑工作台</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="row_2">
      <el-col>
        <div>
          <div class="row_far">
            <span class="span_normal fontSet">切换工具</span>
            <div style="clear:both"></div>
            <div class="poolIconFar"   @click="$router.push('/sys/testcaseMinder')" >
              <div class="poolIcon">
                <img src="@/assets/images/fun-envor.png" alt />
              </div>
              <div class="funEnvor">脑图管理1</div>
            </div>
            <div class="poolIconFar" @click="$router.push('/sys/xmind')">
              <div class="poolIcon">
                <img src="@/assets/images/fun-envor.png" alt />
              </div>
              <div class="funEnvor">脑图管理2</div>
            </div>
            <div class="poolIconFar" @click="projectManage">
              <div class="poolIcon">
                <img src="@/assets/images/fun-envor.png" alt />
              </div>
              <div class="funEnvor">项目管理</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="row_3 row_normal">
      <el-col :span="14" style="padding-right:10px;">
        <div class="rowMid_far">
          <div class="row_far">
            <span class="span_normal fontSet titleH">工作事项</span>
            <span class="setIcon">
              <i class="el-icon-setting"></i>
            </span>
            <div style="clear:both"></div>
            <div>
              <el-tabs v-model="activeName" @tab-click="handleClickTab">
                <el-tab-pane label="任务一 10" name="first">
                  <el-table :data="tableData">
                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="任务二 5" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="任务三 10" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="任务四 5" name="fourth">定时任务补偿</el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="10">
        <div class="rowMid_far">
          <div class="row_far">
            <span class="span_normal fontSet titleH">我的项目</span>
            <div clss="textRight" style="text-align:right">
              <el-button size="small" type="primary" >新建</el-button>
              <el-button size="small">查看全部</el-button>
            </div>
            <div style="clear:both"></div>
            <div>
              <el-table :data="tableData">
                <el-table-column prop="address" label="项目名称"></el-table-column>
                <el-table-column prop="name" label="我的待办" width="130"></el-table-column>
                <el-table-column prop="name" label="我的待办" width="130"></el-table-column>
                <el-table-column prop="date" label="我的提交" width="130"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="row_4 row_normal">
      <el-col>
        <div style="background-color:#fff;">
          <div class="row_far">
            <span class="span_normal fontSet titleH">项目进度</span>
            <span class="setIcon">
              <i class="el-icon-setting"></i>
            </span>
            <div style="clear:both"></div>
            <div>
              <el-tabs v-model="activeName" @tab-click="handleClickTab">
                <el-tab-pane label="里程碑" name="first">
                  <el-table :data="tableData">
                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="迭代" name="second">配置管理</el-tab-pane>
              </el-tabs>
            </div>
          </div>
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
      activeName: "first",
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
    this.$refs.workForm.style.width = window.innerWidth - 60 + "px";
  },
  computed: {},
  methods: {
    handleClick(item) {},
    projectManage() {
      this.$router.push({
        path: "/sys/systemLists"
      });
    }
  }
};
</script>

<style lang='less' scoped>
.work-form {
  margin: 20px;
  background-color: #eff1f4;
  .row_normal {
    margin: 10px 0;
  }
  .span_normal {
    display: inline-block;
    float: left;
  }
  .row_1 {
    .textRight {
    }
  }
  .row_normal {
    .row_far {
      .setIcon {
        display: inline-block;
        float: right;
        border-radius: 2px;
        border: 1px solid #d9d9d9;
        box-sizing: border-box;
        width: 32px;
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .row_2 {
    margin: 10px 0px;
    background-color: #fff;
    .poolIconFar {
      cursor: pointer;
      float: left;
      padding: 20px 0;
      padding-right: 80px;
      .poolIcon {
        margin: 5px auto;
        width: 50px;
        height: 50px;
        background-color: #337dff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        img {
          width: 30px;
          height: 30px;
          background-color: #337dff;
        }
      }
      .funEnvor {
        font-size: 13px;
      }
    }
  }

  .titleH {
    height: 32px;
  }
  .fontSet {
    font-size: 18px;
  }
  .rowMid_far {
    background-color: #fff;
    height: 350px;
  }
  .row_far {
    padding: 15px;
    height: 100%;
  }
}
</style>

