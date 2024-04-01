<template>
  <el-container>
    <el-aside :width="sideMenuWd">
      <el-menu
        :default-active="navigationName"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#333"
        text-color="#333"
        background-color="#fff"
        class="ui-navig"
      >
        <div v-for="(menu, index) in menuListTot" :key="index + menu.id">
          <!-- 无二级菜单 -->
          <el-menu-item v-if="!menu.menuList" :index="menu.link" @click="handleClick(menu)">
            <img
              v-show="isCollapse"
              style="position: relative; left: 10px"
              :src="menu.iconPath"
              class="nav-icon"
              alt
            />
            <template slot="title">
              <span slot="title">
                <span>
                  <img :src="menu.iconPath" class="nav-icon" alt />
                  <span>{{ menu.label }}</span>
                </span>
              </span>
            </template>
          </el-menu-item>
          <!-- 有二级菜单 -->
          <el-submenu v-else :index="menu.id">
            <template slot="title">
              <span slot="title">
                <span>
                  <img :src="menu.iconPath" class="nav-icon" alt />
                  <span v-show="!isCollapse">{{ menu.label }}</span>
                </span>
              </span>
            </template>
            <el-menu-item
              v-for="submenu in menu.menuList"
              :key="submenu.id"
              :index="submenu.link"
              @click="handleClick(submenu)"
            >
              <span slot="title">
                <img :src="submenu.iconPath" class="nav-icon" alt />
                <span>{{ submenu.label }}</span>
              </span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container :style="{ height: mainH }">
      <el-main class="mainPart">
        <!-- <keep-alive :include="tagsList"> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Notification, Message } from "element-ui";

export default {
  name: "system-lists",
  components: {},
  props: {},
  data() {
    return {
      tagsList: [],
      menuListTot: [
        {
          id: "1",
          label: "项目概览",
          iconPath: "/images/yuansu.svg",
          index: "1",
          link: "/sys/systemLists/totalScan",
          code: "1000"
        },
        {
          id: "2",
          label: "测试管理",
          iconPath: "/images/yongli.svg",
          index: "4",
          menuList: [
            {
              id: "5",
              label: "计划管理",
              iconPath: "/images/yuansu.svg",
              index: "4-3",
              link: "/sys/systemLists/planManage",
              menuList: null
            },
            {
              id: "6",
              label: "需求管理",
              iconPath: "/images/yuansu.svg",
              index: "4-1",
              link: "/sys/systemLists/requireManage",
              menuList: null
            },
            {
              id: "7",
              label: "用例管理",
              iconPath: "/images/yuansu.svg",
              index: "4-2",
              link: "/sys/systemLists/caseManage",
              menuList: null
            },
            {
              id: "8",
              label: "任务管理",
              iconPath: "/images/yuansu.svg",
              index: "4-4",
              link: "/sys/systemLists/taskManage",
              menuList: null
            },
            {
              id: "9",
              label: "报告管理",
              iconPath: "/images/yuansu.svg",
              index: "4-5",
              link: "/sys/systemLists/reportManage",
              menuList: null
            }
          ]
        },
        {
          id: "4",
          label: "测试服务",
          iconPath: "/images/baogao.svg",
          index: "6",
          menuList: [
            {
              id: "10",
              label: "数据管理",
              iconPath: "/images/baogao.svg",
              index: "6-2",
              link: "/autoTest/reportTotal",
              menuList: null
            }
          ]
        }
      ],
      navigationName: "",
      isCollapse: null
    };
  },
  created() {},
  mounted() {},
  computed: {
    sideMenuWd() {
      return this.isCollapse ? "64px" : "200px";
    },
    keyWord() {
      return this.$route.meta.title !== undefined
        ? this.$route.meta.title + +new Date()
        : this.$route + +new Date();
    },
    mainH() {
      return window.innerHeight + "px";
      // return window.innerHeight - 50 + "px";
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {},
    handleClick(item) {
      this.$router.push(item.link);
    }
  }
};
</script>

<style lang='less' scoped>
.system-lists {
  height: 100%;
  width: 100%;
}
</style>
<style>
.el-aside {
  background-color: #fff;
  /* color: #333; */
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  /* color: #333; */
  text-align: center;
}
</style>
