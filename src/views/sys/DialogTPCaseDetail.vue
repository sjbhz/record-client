<!--
 * @Descripttion: TP下可能有多个用例概览（列表），每个用例概览下可新增多个用例
 * @Author: erised
 * @Date: 2023-08-18 16:56:40
-->
<template>
  <div class="caseParent_group">
    <el-dialog
      title="用例详情"
      :visible.sync="casParentVisible"
      width="65%"
      top="50px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      11
      <span slot="footer" class="dialog-footer">
        <!-- <el-button size="mini" type="primary" @click="addGroup" style="float: left">
          <i class="el-icon-plus"></i> 新增群组
        </el-button>-->
        <el-button size="small" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "DialogCaseD",
  components: {},
  props: {
    visible: Boolean,
    currentNode: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      caseVisible: false,
      formLabelWidth: "130px",
      queryGroupDetail: {
        name: "",
        remark: "",
        emails: [],
        createTime: ""
      },

    };
  },
  created() {},
  watch: {},
  methods: {
    open(currentNode) {
      console.log("dialog---", currentNode);
      this.caseVisible = true;
    },
    saveAddEmailGroup() {},

    handleClose() {}
  }
};
</script>

<style scoped lang="scss">
.noneDataLog {
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  text-align: center;
  color: #333;
  font-size: 14px;
}
</style>
<style>
.caseParent_group .el-dialog__body {
  padding: 0;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.el-table__body tr.current-row > td {
  background: #f5f8ff;
}
.caseParent_group .el-form-item__error {
  margin-top: -3px;
}
</style>
