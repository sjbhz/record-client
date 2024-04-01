<template>
  <div class="plan-manage" ref="planManage">
    <el-row type="flex" justify="space-around" align="top">
      <el-col :span="24">
        <div class="bigwrap" style="display: flex;justify-content: space-around;">
          <div :style="{ width: leftW }" class="left-wrap">
            <div class="case-list-tree" style="display: flex; justify-content: space-between">
              <div>
                <el-button size="small" @click="getDirTree" slot="append" icon="el-icon-plus">新建</el-button>
                <el-button size="small" @click="getDirTree" slot="append">更多操作</el-button>
              </div>
            </div>
            <div class="tree-search" style="margin-top: 10px">
              <el-input
                clearable
                size="small"
                class="inputSearch"
                v-model="sContent"
                placeholder="搜索模块..."
                @change="handleChangeSearch"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <!-- 产品tree -->
            <div>
              <div class="recycle_row" style="margin-top: 10px">
                <div style="float:left;margin-left:3px">
                  <i class="el-icon-delete"></i> 回收站
                </div>

                <div style="float:right">
                  <span>3</span>
                </div>
              </div>
              <div style="clear:both"></div>
              <div class="public_row" style="margin-top: 10px">
                <div style="float:left;margin-left:3px">
                  <i class="el-icon-folder-opened"></i> 公共用例库
                </div>
              </div>
              <div style="clear:both"></div>
              <div ref="treeWrap" style="overflow: auto;margin-top:10px" v-loading="isLoadingTree">
                <!-- default-expand-all -->
                <el-tree
                  :data="treeData"
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :default-checked-keys="defaultNodes"
                  @check="handleCheckChange"
                ></el-tree>
              </div>
            </div>
          </div>
          <!-- <div :style="{ width: rgihtW }" class="right-wrap" style="border: none">111</div> -->
          <div
            :style="{ width: rgihtW }"
            class="right-wrap"
            style="margin-left:10px;border:1px solid red"
          >
            <el-row>
              <el-col>
                <div class="btnTop">
                  <div style="float:left">
                    <el-button size="small" @click="getDirTree" slot="append">批量操作</el-button>
                  </div>
                  <el-link
                    type="primary"
                    :underline="false"
                    style="font-size: 12px;float:right;margin-left:10px;height:32px;line-height:32px"
                  >高级搜索</el-link>

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
                  <div style="float:right;margin-left:10px">
                    <el-button-group>
                      <el-button size="small" @click="getDirTree" type="primary" plain>列表</el-button>
                      <el-button size="small" @click="getDirTree">脑图</el-button>
                    </el-button-group>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px">
              <el-col>
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  :header-cell-style="styleObj"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="日期" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
                </el-table>
                <div class="pageBox">
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
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Notification, Message } from "element-ui";

export default {
  name: "plan-manage",
  components: {},
  props: {},
  data() {
    return {
      isLoadingTree: false,
      offset: "0",
      rate: 80,
      treeData1: [],
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      styleObj: {
        "background-color": "#f8f9f9",
        "border-left": "1px solid #fff"
      },
      Pagetask: 1,
      limitp: 10,
      schedulenumtask: 0,

      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  created() {},
  mounted() {
    // this.$refs.planManage.style.height = window.innerHeight - 110 + "px";
    this.$refs["treeWrap"].style.height = window.innerHeight - 300 + "px";
    this.$refs["treeWrap"].style.minHeight = window.innerHeight - 460 + "px";
    this.$refs["treeWrap"].style.maxHeight = window.innerHeight - 160 + "px";
    this.dragControllerDiv();
  },
  computed: {
    mygh() {
      return window.innerHeight - 200;
    },
    isModal() {
      return this.dialogVisible;
    },
    isModalInner() {
      return this.dialogInner;
    },
    leftW() {
      return `calc(${100 - this.rate}% + ${this.offset}px)`;
    },
    rgihtW() {
      return `calc(${this.rate}% - ${this.offset}px)`;
    },
    pageConfig() {
      return {
        page: this.currentPage,
        size: this.pageSize
      };
    },
    placeH() {
      if (this.activeName2 == "first") {
        return "请选择标签";
      } else {
        this.tagId = "";
        return "暂无标签";
      }
    },
    uploadBtnDisabled() {
      if (this.csItem.label) {
        if (!this.isClicked) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  methods: {
    dragControllerDiv() {
      let that = this;
      let resize = document.getElementsByClassName("resize")[0];
      resize.onmousedown = function(e) {
        let startX = e.clientX;
        // resize.left = resize.offsetLeft;
        document.onmousemove = function(e) {
          let endX = e.clientX;
          // let moveLen = resize.left + (endX - startX);
          // let maxT = box.clientWidth - resize.offsetWidth;
          // if (moveLen < 150) moveLen = 360;
          // if (moveLen > maxT - 800) moveLen = maxT - 800;
          // resize.style.left = moveLen;
          // left.style.width = moveLen + "px";
          // right.style.width = box.clientWidth - moveLen - 5 + "px";
          that.offset = endX - startX;
        };
        document.onmouseup = function() {
          let www = String(
            that.getStyle(
              document.getElementsByClassName("bigwrap")[0],
              "width"
            )
          );
          let rate = (that.offset / www.split("px")[0]) * 100;
          that.offset = 0;
          that.rate = that.rate - rate;
          document.onmousemove = null;
          document.onmouseup = null;
          resize.releaseCapture && resize.releaseCapture();
        };
        resize.setCapture && resize.setCapture();
        return false;
      };
    }
  }
};
</script>

<style lang='less' scoped>
.plan-manage {
  background-color: #fff;
  font-size: 12px;
  padding: 10px;
  // height: 100%;
  .left-wrap {
    border-right: 1px solid #ccc;
    padding: 15px;
  }
}
</style>

