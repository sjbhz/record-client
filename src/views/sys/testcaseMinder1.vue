<template>
  <div>
    <VueTestcaseMinderEditor
      v-if="mindFlag"
      @afterMountEditor="afterMountEditor"
      @changeNodeLabel="changeNodeLabel"
      :initJson="initJsonD"
      ref="minderEditor"
      :allowEditPriority="true"
      :allowEditLabel="true"
      :allowEditResult="true"
      :allowEditNode="true"
      class="vueTestcaseMinderEditor"
    ></VueTestcaseMinderEditor>
    <div class="toolBar">
      <el-popover placement="top" width="200" trigger="click">
        <slot name="title">
          <div style="display:inline-block;margin-bottom:12px;font-size:16px;font-weight:600;">节点操作</div>
        </slot>
        <div style="text-align: left; margin: 0;">
          <div class="listNode">
            <span class="name">新增子节点</span>
            <span class="value">Tab</span>
          </div>
          <div class="listNode">
            <span class="name">新增邻节点</span>
            <span class="value">Enter</span>
          </div>
          <div class="listNode">
            <span class="name">删除节点</span>
            <span class="value">Delete</span>
          </div>
          <div class="listNode">
            <span class="name">上移节点</span>
            <span class="value">Alt+up</span>
          </div>
          <div class="listNode">
            <span class="name">下移节点</span>
            <span class="value">Alt+down</span>
          </div>
          <div class="listNode">
            <span class="name">新建用例</span>
            <span class="value">Ctrl+q</span>
          </div>
        </div>
        <el-button style="line-height:1px" type="primary" plain slot="reference">快捷键</el-button>
      </el-popover>
    </div>
    <DialogTPList ref="dialogTPList" :currentNode="currentNode" :projectId="projectId" />
  </div>
</template>

<script>
import { getCurrentProjectID } from "@/common/js/utils";
import "testcase-factor-minder-editor/lib/VueTestcaseMinderEditor.css";
// import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import DialogTPList from "./componentFactor/DialogTPList";
import { jsonToMap } from "../../../../common/js/utils";
// 初始化数据，加载脑图时自动更新。同时也会监听数据变化，数据一更新就重新加载
export default {
  name: "PublicFactorMind",
  components: { DialogTPList },
  data() {
    return {
      mindFlag: true,
      projectId: null,
      currentNode: null,
      sceneId: null,
      initJsonD: { root: { data: {}, children: [] } },
      initJsonD1: {
        root: {
          data: {
            text: "百度产品",
            id: "0"
          },
          children: [
            { data: { text: "新闻", id: "1", resource: ["自定义标签"] } },
            { data: { text: "网页", id: "2", priority: 1 } },
            { data: { text: "地图", id: "8", priority: 3 } },
            { data: { text: "百科", id: "9", priority: 3 } }
          ]
        }
      }
    };
  },
  computed: {
    // 引用模块
    // ...mapState('caseEditorStore', [
    //     'callbackQueue',
    //     'working'
    // ]),
    // 引用的全局store
    // ...mapState(["caseEditorStore"]),
    // ...mapGetters({
    //   minder: "getMinder",
    //   editor: "getEditor",
    //   config: "config",
    //   view: "getView",
    //   count: "count"
    // }),
    // projectId() {
    //   return getCurrentProjectID();
    // }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  watch: {
    $route(to, from) {}
  },
  activated() {
    this.sceneId = this.$route.params.sceneId;
    this.projectId = this.$route.query.projectId;
    this.getinitJOSN();
  },
  created() {},
  mounted() {
    console.log(
      "this.caseEditorStore-----",
      this.caseEditorStore,
      this.minder,
      this.editor,
      this.config
    );
    // window.localStorage.mindText = JSON.stringify(editor.minder.exportJson());
    // if (window.localStorage.mindText) {
    //   editor.minder.importJson(JSON.parse(window.localStorage.mindText));
    // }
    let _this = this;
    let editor = window.editor;
    if (editor) {
      editor.minder.on("contentchange", function(e) {
        let execCommandNameTemp = localStorage.getItem("execCommandName");
        let currentNode = minder.getSelectedNode();
        console.log("execCommandNameTemp---", execCommandNameTemp);
        if (execCommandNameTemp == "inputChange") {
          // 编辑节点
          _this.handleEditSceneNode(currentNode);
        } else if (execCommandNameTemp == "priority") {
          // 点击标签
          _this.handleEditSceneNode(currentNode);
        } else if (execCommandNameTemp == "AppendChildNode") {
          // 添加子节点---在button处理-忽略
          _this.handleAddSceneNode(currentNode);
        } else if (execCommandNameTemp == "AppendSiblingNode") {
          // 添加同级节点---在button处理-忽略
        } else if (execCommandNameTemp == "RemoveNode") {
          // 删除节点---在button处理-忽略
        } else if (execCommandNameTemp == "movetoparent") {
          // 拖动节点
          _this.handleDragSceneNode(currentNode, execCommandNameTemp);
        } else if (execCommandNameTemp == "arrange") {
          // 拖动兄弟节点(上/下移)====会调用2次？
          _this.handleDragSceneNode(currentNode, execCommandNameTemp);
        }
      });
    }

    // 监听快捷键事件，未放在脑图源码内定义
    document.addEventListener("keydown", e => {
      if (e.ctrlKey && e.keyCode === 81) {
        console.log("ctrl+q");
      }
    });
  },
  methods: {
    // ...mapMutations("caseEditorStore", ["changeShowModal"]),
    // ...mapMutations(["setMinder", "setEditor"]),
    // ...mapActions(["executeCallback"]),
    // ...mapActions([
    //   "changeCount",
    //   "increment",
    // ]),

    //获取根
    promiseGetRoot() {
      return new Promise((resolve, reject) => {
        let url = `/ylgl/test/scene/get/${this.sceneId}`;
        this.$post(url, {})
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //获取节点
    promiseGetNode() {
      return new Promise((resolve, reject) => {
        let url = `/ylgl/test/SceneNode/node/getTree/${this.sceneId}`;
        this.$post(url, {})
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getinitJOSN0() {
      let _this = this;
      Promise.all([this.promiseGetRoot(), this.promiseGetNode()]).then(res => {
        console.log("res----", res);
        if (res[0].status == 200 && res[0].data.success) {
          _this.$set(res[0].data.data, "text", res[0].data.data.name);
          _this.initJsonD.root.data = res[0].data.data;
        }
        if (res[1].status == 200 && res[1].data.success) {
          _this.initJsonD.root.children = [...res[1].data.data];
        }

        window.minder.importJson(_this.initJson);
        console.log(
          "_this.initJsonD===",
          _this.initJsonD,
          window.minder.exportJson(),
          this.$refs.minderEditor.getJsonData()
        );

        //需要重新渲染脑图--刷新后最为最新的视图
        let jsonImport = window.minder.exportJson();
        _this.setJsonImport(jsonImport);
        _this.$nextTick(() => {
          _this.reload();
        });
      });
    },
    //获取当前节点
    getinitJOSN() {
      let url = `/ylgl/test/SceneNode/node/getTree/${this.sceneId}`;
      this.$post(url, {}).then(res => {
        if (res.status == 200 && res.data.success) {
          let treeNodeAll = res.data.data;
          // 根节点
          let rootTemp = {
            pageId: null,
            caseNum: treeNodeAll.caseNum,
            id: treeNodeAll.id,
            type: treeNodeAll.type,
            level: treeNodeAll.level,
            name: treeNodeAll.name,
            text: treeNodeAll.name,
            parentId: treeNodeAll.parentId,
            sceneId: treeNodeAll.sceneId,
            creator: treeNodeAll.creator,
            creatorId: treeNodeAll.creatorId,
            updater: treeNodeAll.updater,
            updaterId: treeNodeAll.updaterId
          };
          // _this.$set(res.data.data, "text", res.data.data.name);
          let nodeListchild = treeNodeAll.children || [];

          this.getAllchildNode(nodeListchild);
          this.$nextTick(() => {
            this.initJsonD = {
              root: { data: rootTemp, children: nodeListchild }
            };
            console.log("this.initJsonD===", this.initJsonD);
          });
        }
      });
    },

    // 遍历子节点
    getAllchildNode(nodeListchild) {
      if (nodeListchild.length > 0) {
        nodeListchild.forEach((item, index) => {
          item.text = item.name;
          let nodeTemp = {
            pageId: null,
            caseNum: item.caseNum,
            priority: item.type ? Number(item.type) : null,
            type: item.type,
            id: item.id,
            level: item.level,
            name: item.name,
            text: item.name,
            parentId: item.parentId,
            sceneId: item.sceneId,
            creator: item.creator,
            pos: item.pos,
            creatorId: item.creatorId,
            createTime: item.createTime,
            updateTime: item.updateTime,
            updater: item.updater,
            updaterId: item.updaterId
          };
          nodeListchild[index] = { data: nodeTemp, children: item.children };

          if (item.children.length > 0) {
            this.getAllchildNode(item.children);
          }
        });
      }
    },

    // 重新加载
    reload() {
      let _this = this;
      _this.mindFlag = false;
      _this.$nextTick(() => {
        _this.mindFlag = true;
      });
    },
    setJsonImport(data) {
      // root不允许编辑
      if (data.root && data.root.data) {
        if (data.root.data.text === "root") {
          data.root.data.disable = true;
        }
      }
      this.initJsonD = data;
      console.log("this.initJsonD ", this.initJsonD);
    },
    // 示例方法，实际可根据需要绑定到其他元素事件中，比如 v-on:click="logCurrentData"
    logCurrentData: function(event) {
      console.log(
        "编辑器中的最新用例内容：",
        this.$refs.minderEditor.getJsonData()
      );
    },
    listenBeforeExecCommand(callback) {
      let minder = window.minder;
      minder.on("beforeExecCommand ", function(even) {
        if (callback) {
          callback(even);
        }
      });
    },
    //添加-新建用例操作
    afterMountEditor() {
      let hotboxEditor = window.editor.hotbox;
      let main = hotboxEditor.state("main");
      this.setInitHoxBox(main);
      this.addIssueHotBox(this, main);
    },
    addIssueHotBox(_this, main) {
      main.button({
        position: "ring",
        label: "新建用例",
        key: "Ctrl+q",
        action: function() {
          let currentNode = minder.getSelectedNode();
          console.log("currentNode---", currentNode);
          _this.currentNode = currentNode;
          _this.$refs.dialogTPList.open(currentNode);
        },
        enable: function() {
          let currentNode = minder.getSelectedNode(); //获取当前点击的node
          //如果是 TP 则可新建用例，其他都不给建
          return currentNode.data.priority && currentNode.data.priority == 2
            ? true
            : false;
        },
        beforeShow: function() {}
      });
    },
    setInitHoxBox(main) {
      let _this = this;
      var runtime = window.editor;
      var fsm = runtime.fsm;
      var buttons = [
        "新增子节点:Tab|Insert:AppendChildNode",
        "新增邻节点:Enter:AppendSiblingNode",
        "删除节点:Delete|Backspace:RemoveNode",
        "上移节点:Alt+up:ArrangeUp",
        "下移节点:Alt+down:ArrangeDown"
      ];
      // "上级:Shift+Tab|Shift+Insert:AppendParentNode",
      var AppendLock = 0;

      buttons.forEach(function(button) {
        var parts = button.split(":");
        var label = parts.shift();
        var key = parts.shift();
        var command = parts.shift();
        main.button({
          position: "ring",
          label: label,
          key: key,
          action: function() {
            let currentNode = minder.getSelectedNode();
            //新增子/邻
            if (command.indexOf("Append") === 0) {
              AppendLock++;
              // console.log("command---", command);
              if (command == "AppendChildNode") {
                // _this.handleAddSceneNode(currentNode);
                // currentNode.renderTree();
                // currentNode.render()
              } else {
                _this.handleAddNeighbor(currentNode);
              }

              minder.execCommand(command, "分支主题");
              function afterAppend() {
                if (!--AppendLock) {
                  runtime.editText();
                }
                // minder.off("layoutallfinish", afterAppend);
              }
              // minder.on("layoutallfinish", afterAppend);
              console.log("layoutallfinish====");
            } else if (command.indexOf("Remove") == 0) {
              // 删除
              _this.handleDeleteSceneNode(currentNode);

              minder.execCommand(command);
              fsm.jump("normal", "command-executed");
            } else {
              minder.execCommand(command);
              fsm.jump("normal", "command-executed");
            }
          },
          enable: function() {
            return minder.queryCommandState(command) != -1;
          }
        });
      });
    },
    //点击菜单栏上的标签即触发该事件
    changeNodeLabel(currentNodeTemp) {
      console.log("currentNodeTemp--", currentNodeTemp);
    },
    // 遍历寻找新增的node===找其父节点
    // handleAddNode0(nodeListForAdd, parentIdTemp, newNode, parseFrontLocalCopy) {
    //   if (nodeListForAdd.length > 0) {
    //     nodeListForAdd.forEach((item, index) => {
    //       console.log("item.data.id---", item.data.id, parentIdTemp);
    //       if (item.data.id == parentIdTemp) {
    //         // 不要直接替换，要留住页面临时生成的id号（当对新节点进行增删改操作时，方便寻找）
    //         let chileLen = item.children.length;
    //         item.children[chileLen - 1].data = {
    //           newId: newNode.id,
    //           id: item.children[chileLen - 1].data.id,
    //           text: item.children[chileLen - 1].data.text,
    //           created: item.children[chileLen - 1].data.created
    //         };
    //         console.log("parseFrontLocalCopy---", parseFrontLocalCopy);
    //         // 更新脑图存档
    //         localStorage.setItem(
    //           "mindText",
    //           JSON.stringify(parseFrontLocalCopy)
    //         );
    //         localStorage.setItem(
    //           "mindTextCopy",
    //           JSON.stringify(parseFrontLocalCopy)
    //         );
    //         return;
    //       }
    //       if (item.children.length > 0) {
    //         this.handleAddNode(
    //           item.children,
    //           parentIdTemp,
    //           newNode,
    //           parseFrontLocalCopy
    //         );
    //       }
    //     });
    //   }
    // },

    handleAddNode(nodeListForAdd, parentIdTemp) {
      if (nodeListForAdd.length > 0) {
        nodeListForAdd.forEach((item, index) => {
          console.log("item.data.id---", item, item.data.id, parentIdTemp);
          if (item.data.id == parentIdTemp) {
            // newNodeId =
            return;
          }
          if (item.children.length > 0) {
            this.handleAddNode(item.children, parentIdTemp);
          }
        });
      }
    },
    //新增场景节点--调用稍晚
    handleAddSceneNode(currentNode) {
      let param = {
        id: currentNode.data.id,
        name: "",
        parentId: currentNode.parent.data.id,
        sceneId: this.sceneId
      };
      this.$post(`/ylgl/test/SceneNode/node/add`, param).then(res => {
        console.log("res---", res, window.minder.exportJson(), this.initJsonD);
        if (res.data.success) {
          // 新增节点后需要更新存档结构
          // let newNode = res.data.data; //新生成的Node信息
          // let parseFrontLocal = JSON.parse(localStorage.getItem("mindText"));
          // let parseFrontLocalCopy = JSON.parse(JSON.stringify(parseFrontLocal)); //深拷贝
          // this.initJsonD = parseFrontLocal
          // let jsonImport = window.minder.exportJson();
          // 更新parseFrontLocal值--对应找parentId,在children中直接push即可，页面中initJsonD不能更新，更新后页面会重新加载

          this.$notify({
            title: "操作成功",
            message: "",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
    // 当为临时节点时去存档中找newId
    getNewIdLocal(chilrenFrontLocal, idFront, newIdtemp) {
      if (chilrenFrontLocal.length > 0) {
        chilrenFrontLocal.forEach((item, index) => {
          console.log("getNewIdLocal===", item, item.data.id, idFront);
          if (item.data.id == idFront) {
            newIdtemp = item.data.newId;
            return;
          }
          if (item.children.length > 0) {
            this.getNewIdLocal(item.children, idFront, newIdtemp);
          }
        });
      }
    },
    // 增加同级节点
    handleAddNeighbor(currentNode) {
      this.$post(
        `/ylgl/test/SceneNode/node/addNeighbor/${currentNode.data.id}`,
        {}
      ).then(res => {
        if (res.data.success) {
          this.$notify({
            title: "操作成功",
            message: "",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
    //修改场景节点
    handleEditSceneNode(currentNode) {
      console.log("currentNode---", currentNode);
      let param = {};
      if (currentNode) {
        //编辑后回车
        param = {
          id: currentNode.data.id,
          name: currentNode.data.text,
          parentId: currentNode.parent.data.id,
          sceneId: this.sceneId,
          type: currentNode.data.priority
        };
        if (currentNode.data.id.length > 9) {
          // 临时节点
          let newIdtemp = null;
          let parseFrontLocal = JSON.parse(localStorage.getItem("mindText"));
          let chilrenFrontLocal = parseFrontLocal.root.children;
          this.getNewIdLocal(chilrenFrontLocal, currentNode.data.id, newIdtemp);
          console.log("newIdtemp---", newIdtemp);
          param.id = newIdtemp;
        }
      } else {
        //编辑后失焦
        let currentemp = JSON.parse(localStorage.getItem("inputChangeNode"));
        console.log("currentemp---", currentemp);
        param = {
          id: currentemp.current.id,
          name: currentemp.current.text,
          parentId: currentemp.parent.id,
          sceneId: this.sceneId,
          type: currentemp.current.priority
        };
      }
      this.$post(`/ylgl/test/SceneNode/node/edit`, param).then(res => {
        console.log("res---", res);
        if (res.data.success) {
          this.$notify({
            title: "操作成功",
            message: "",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
    // 删除场景节点
    handleDeleteSceneNode(currentNode) {
      let nodeIdTemp = currentNode.data.id;
      this.$post(`/ylgl/test/SceneNode/node/delete/${nodeIdTemp}`, {}).then(
        res => {
          console.log("res---", res);
          if (res.data.success) {
            this.$notify({
              title: "操作成功",
              message: "",
              type: "success",
              duration: 2000
            });
          } else {
            this.$message.warning(res.data.message);
          }
        }
      );
    },
    // 拖拽节点
    handleDragSceneNode(currentNode, execCommandNameTemp) {
      console.log("currentNode---", currentNode);
      let param = {
        nodeId: currentNode.data.id,
        parentId: currentNode.parent.data.id
      };
      if (execCommandNameTemp == "movetoparent") {
        param.order = null;
      }
      if (execCommandNameTemp == "arrange") {
        let orderTemp = null;
        currentNode.parent.children.forEach((item, index) => {
          if (item.data.id == currentNode.data.id) {
            orderTemp = index;
            return;
          }
        });

        param.order = orderTemp;
      }
      this.$post(`/ylgl/test/SceneNode/node/drag`, param).then(res => {
        console.log("res---", res);
        if (res.data.success) {
          this.$notify({
            title: "操作成功",
            message: "",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    }
  }
};
</script>

<style scoped>
.toolBar {
  padding: 0 12px;
  position: fixed;
  /* left: 190px; */
  right: 10px;
  bottom: 20px;
  z-index: 1000;
  background: hsla(0, 0%, 100%, 0.8);
  border-radius: 2px;
  opacity: 0.8;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  display: flex;
}
.titleNode {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 26px 0 20px;
}
.listNode {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.name {
  color: #333;
}
.value {
  color: #909090;
  margin-left: auto;
}
</style>
