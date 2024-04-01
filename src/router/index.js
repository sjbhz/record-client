import Vue from 'vue'
import VueRouter from 'vue-router'
import systemHome from '../views/sys/systemHome.vue'
import workForm from '../views/sys/workForm.vue'
import xmind from '../views/sys/xmind.vue'
import testcaseMinder from '../views/sys/testcaseMinder.vue'
import systemLists from '../views/sys/systemLists.vue'
import totalScan from '../views/testManage/totalScan.vue'
import caseManage from '../views/testManage/caseManage.vue'
import planManage from '../views/testManage/planManage.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'system-home',
    component: systemHome,
    redirect: '/sys/workForm'
  },
  {
    path: "/sys",
    name: "system-home",
    meta: {
      title: "系统首页",
      keepAlive: true,
    },
    component: systemHome,
    redirect: '/sys/workForm',
    children: [
      {
        path: "workForm",
        name: "work-form",
        meta: {
          title: "系统首页",
          keepAlive: false,
        },
        component: workForm,
      },
      {
        path: "systemLists",
        name: "系统列表",
        meta: {
          title: "系统列表",
          keepAlive: false,
        },
        component: systemLists,
        children: [
          {
            path: "totalScan",
            name: "测试总览",
            meta: {
              title: "测试总览",
              keepAlive: false,
            },
            component: totalScan,
          },
          {
            path: "caseManage",
            name: "测试用例管理",
            meta: {
              title: "测试用例管理",
              keepAlive: false, //不需要被缓存的组件
            },
            component: caseManage,
          },
          {
            path: "planManage",
            name: "测试计划管理",
            meta: {
              title: "测试计划管理",
              keepAlive: false, //不需要被缓存的组件
            },
            component: planManage,
          },
        ]
      },
      {
        path: "testcaseMinder",
        name: "testcaseMinder",
        meta: {
          title: "脑图1",
          keepAlive: false,
        },
        component: testcaseMinder,
      },
      {
        path: "xmind",
        name: "xmind",
        meta: {
          title: "脑图2",
          keepAlive: false,
        },
        component: xmind,
      },
    ]
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
