<!--
 * @Descripttion: TP下可能有多个用例概览（列表），每个用例概览下可新增多个用例
 * @Author: erised
 * @Date: 2023-08-18 16:56:40
-->
<template>
  <div class="caseParent_group">
    <el-drawer
      title="用例列表"
      :visible.sync="caseParentVisible"
      :before-close="handleCloseBefore"
      direction="rtl"
      size="50%"
    >
      <template #title>
        <span class="drawer_title">用例列表</span>
      </template>
      <div class="common">
        <el-button size="small" type="primary" plain style="float:left" icon="el-icon-refresh">预生成</el-button>
        <el-button size="small" style="float:left;margin-left:5px" icon="el-icon-lock">归档</el-button>
        <el-table :data="gridData" highlight-current-row class="table_list">
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column property="name" label="姓名" width="160"></el-table-column>
          <el-table-column property="address" label="地址"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <i class="el-icon-copy-document" @click="copyGroup(scope.row)"></i>
              </el-button>
              <el-button type="text" size="small">
                <i class="el-icon-edit" @click="editGroup(scope.row)"></i>
              </el-button>
              <el-button type="text" size="small">
                <i class="el-icon-delete" @click="deleteGroup(scope.row)"></i>
              </el-button>
              <el-button type="text" size="small">
                <i class="el-icon-lock" @click="lockGroup(scope.row)"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="drawer_footer">
        <el-button size="small" type="primary" plain @click="handleClose">关 闭</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "DialogTPList",
  components: {},
  props: {
    currentNode: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      gridData: [
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
          date: "2016-05-03",
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
          date: "2016-05-03",
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
        }
      ],
      caseParentVisible: false,
      loading: false,
      formLabelWidth: "130px",
      parentNode: null
    };
  },
  created() {},
  watch: {},
  methods: {
    open(currentNode) {
      console.log("dialog---", currentNode);
      this.parentNode = currentNode;
      this.caseParentVisible = true;
    },
    copyGroup(row) {},
    editGroup(row) {},
    deleteGroup(row) {},
    lockGroup(row) {},
    addGroup(row) {},
    handleClose() {
      this.caseParentVisible = false;
    },
    handleCloseBefore(){}
  }
};
</script>

<style scoped lang="scss">
.drawer_title {
  font-size: 15px;
  font-weight: bold;
  text-align: left;
}
.common {
  padding: 10px 20px;
  height: calc(100% - 65px);
}
.table_list {
  height: 100%;
  overflow-y: auto;
}
.drawer_footer {
  position: absolute;
  height: 30px;
  line-height: 30px;
  bottom: 0;
  margin: 8px 44%;
}
</style>
<style>
.el-drawer__header {
  padding: 12px 10px !important;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 0 !important;
}

.el-table .el-table__cell {
  padding: 7px 0 !important;
}
</style>

