<template>
  <div>
    <VueTestcaseMinderEditor
      @afterMountEditor="afterMountEditor"
      @changeNodeLabel="changeNodeLabel"
      @handleAppendSiblingNode="handleAppendSiblingNode"
      @handleAppendChildNode="handleAppendChildNode"
      @handleDel="handleDel"
      :initJson="initJsonD"
      ref="minderEditor"
      :sceneViewName="sceneViewName"
      :showHeaderFlag="showHeaderFlag"
      :showNavigatorFlag="showNavigatorFlag"
      :isNavOpen="isNavOpenSmall"
      :allowEditPriority="true"
      :allowEditLabel="true"
      :allowEditResult="true"
      :allowEditNode="true"
      class="vueTestcaseMinderEditor"
    ></VueTestcaseMinderEditor>
    <DialogTPList ref="dialogTPList" :currentNode="currentNode" />
  </div>
</template>

<script>
// 初始化数据，加载脑图时自动更新。同时也会监听数据变化，数据一更新就重新加载
// 组件应用名称
// 是否允许增删改优先级，实时更新状态
// 是否允许增删改标签，实时更新状态
// 是否允许增删改测试结果，实时更新状态
// 是否允许增删改节点内容，实时更新状态
import DialogTPList from "./DialogTPList";

export default {
  name: "testcaseMinder",
  components: { DialogTPList },
  data() {
    return {
      // 测试数据，实际可不必引入
      initJson: {
        data: {
          id: 2,
          text: "Design project",
          image: "https://testerhome.com/uploads/user/avatar/6109.jpg",
          imageSize: { width: 200, height: 200 }
        }
      },
      initJsonD: {
        root: {
          data: {
            text: "百度产品",
            id: "0"
          },
          children: [
            { data: { text: "新闻", id: "1", resource: ["自定义标签"] } },
            { data: { text: "网页", id: "2", priority: 1 } },
            { data: { text: "贴吧", id: "3", priority: 2 } },
            { data: { text: "知道", id: "4", priority: 2 } },
            { data: { text: "音乐", id: "5", priority: 3 } },
            { data: { text: "图片", id: "6", priority: 3 } },
            { data: { text: "视频", id: "7", priority: 3 } },
            { data: { text: "地图", id: "8", priority: 3 } },
            { data: { text: "百科", id: "9", priority: 3 } }
            // {
            //   data: {
            //     text: "更多",
            //     id: "10",
            //     hyperlink: "http://www.baidu.com/more"
            //   }
            // }
          ]
        }
      },
      sceneViewName: "场景1",
      showHeaderFlag: true,
      showNavigatorFlag: true,
      isNavOpenSmall: false,
      currentNode: null
    };
  },
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
          if (currentNode) {
            //编辑后回车
            // _this.handleEditSceneNode(currentNode);
          } else {
            //编辑后失焦
            let currentemp = localStorage.getItem("inputChangeNode");
          }
        } else if (execCommandNameTemp == "AppendChildNode") {
          // 添加子节点
          // currentNode.data.id = "";
          // _this.handleAddSceneNode(currentNode);
          console.log(
            _this.initJsonD.root.children,
            editor.minder.exportJson()
          );
          // _this.initJsonD=editor.minder.exportJson()
          // _this.initJsonD.root.children.push({
          //   text: "更多",
          //   id: "10"
          // });
          // return;

          // window.minder.importJson(_this.initJson);

        } else if (execCommandNameTemp == "AppendSiblingNode") {
          // 添加同级节点
        } else if (execCommandNameTemp == "RemoveNode") {
          // 删除节点
          // _this.handleDeleteSceneNode(currentNode);
        } else if (execCommandNameTemp == "movetoparent") {
          // 拖动节点
        } else if (execCommandNameTemp == "arrange") {
          // 拖动节点到兄弟节点
        }
      });
    }

    // 监听快捷键事件，未放在脑图源码内定义
    document.addEventListener("keydown", e => {
      // if (e.ctrlKey && e.keyCode === 67) {
      //   console.log("Ctrl+c");
      // }
      if (e.ctrlKey && e.keyCode === 81) {
        console.log("ctrl+q");
      }
    });
    // 监听单个键盘事键
    // document.addEventListener("keyup", e => {
    //   console.log(e);
    // });
  },
  methods: {
    setNewForcs(minder) {
      function afterAppend() {
        window.editor.editText();
        minder.off("layoutallfinish", afterAppend);
      }
      minder.on("layoutallfinish", afterAppend);
    },
     // header 插入同级
     handleAppendSiblingNode() {
      // AppendLock++;
      minder.execCommand("AppendSiblingNode", "分支主题");
      this.setNewForcs(minder);
    },
    // header 插入子级
    handleAppendChildNode() {
      minder.execCommand("AppendChildNode", "分支主题");
      function afterAppend() {
        window.editor.editText();
        minder.off("layoutallfinish", afterAppend);
      }
      minder.on("layoutallfinish", afterAppend);
    },
    // header 删除
    handleDel() {
      console.log("RemoveNode===", minder.getSelectedNode());
      minder.execCommand('RemoveNode');
      window.editor.fsm.jump("normal", "command-executed");
    },
    // 示例方法，实际可根据需要绑定到其他元素事件中，比如 v-on:click="logCurrentData"
    logCurrentData: function(event) {
      console.log(
        "编辑器中的最新用例内容：",
        this.$refs.minderEditor.getJsonData()
      );
    },
    //添加-新建用例操作
    afterMountEditor() {
      let hotboxEditor = window.editor.hotbox;
      let main = hotboxEditor.state("main");
      this.setInitHoxBox(main);
      this.addIssueHotBox(this);
    },
    addIssueHotBox(_this) {
      let hotboxEditor = window.editor.hotbox;
      let main = hotboxEditor.state("main");

      main.button({
        position: "ring",
        label: "新建用例",
        key: "R",
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
      var runtime = window.editor;
      var fsm = runtime.fsm;
      var buttons = [
        "新增子节点:Tab|Insert:AppendChildNode",
        "新增邻节点:Enter:AppendSiblingNode",
        "删除节点:Delete|Backspace:RemoveNode"
      ];
      // "上级:Shift+Tab|Shift+Insert:AppendParentNode",
      // "下移节点:Alt+Down:ArrangeDown",
      // "上移节点:Alt+Up:ArrangeUp",
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
            if (command.indexOf("Append") === 0) {
              AppendLock++;
              minder.execCommand(command, "分支主题");

              function afterAppend() {
                if (!--AppendLock) {
                  runtime.editText();
                }
                minder.off("layoutallfinish", afterAppend);
              }
              minder.on("layoutallfinish", afterAppend);
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
    }
  }
};
</script>

<style>
</style>
