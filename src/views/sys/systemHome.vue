<template>
  <div class="system-home" ref="systemHome">
    <el-container class="container_out">
      <el-header style="height:50px;width:100%;">
        <el-row type="flex" class="sys-header">
          <span class="totalBtn">
            <img src="@/assets/images/totalScan.png" alt />
          </span>
          <div class="sys-logo" @click="$router.push('/man/sys')">
            <span>
              <!-- <img src="@/assets/images/sys-logo.png" alt /> -->
            </span>
            <span>
              <!-- <img class="font1" src="@/assets/images/yii.svg" alt />
              <img class="font2" src="@/assets/images/doong.svg" alt />
              <img class="font3" src="@/assets/images/yuun.svg" alt /> -->
              <img src="" alt="">
            </span>
          </div>

          <div class="totalPT">
            <div class="line"></div>
            <span class="titlePT">xxx 平台</span>
          </div>

          <div class="rightPart" ref="rightPart">
            <el-menu
              :default-active="activeIndex1"
              mode="horizontal"
              background-color="rgba(28, 36, 48, 1)"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelectPerson"
              class="system-menu"
            >
              <el-submenu index="1">
                <template slot="title">
                  <img class="per" src="@/assets/images/person.svg" alt />
                  管理员
                </template>
                <el-menu-item index="1-1">
                  <span style="margin: 0 1rem">个人设置</span>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <span style="margin: 0 1rem">退出登录</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
            <el-menu
              :default-active="activeIndex2"
              mode="horizontal"
              background-color="rgba(28, 36, 48, 1)"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelect"
              class="help-menu"
            >
              <el-submenu index="2">
                <template slot="title">
                  <span class="help">
                    <img src="@/assets/images/help.svg" alt />
                  </span>
                </template>
                <el-menu-item index="2-1">
                  <span>帮助中心</span>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <span>更新日志</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
            <el-menu
              :default-active="activeIndex3"
              mode="horizontal"
              background-color="rgba(28, 36, 48, 1)"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelect"
              class="warining-menu"
            >
              <el-submenu index="3">
                <template slot="title">
                  <span class="warinings">
                    <el-badge :value="12" class="badge">
                      <img src="@/assets/images/warning.svg" alt />
                    </el-badge>
                  </span>
                </template>
                <el-menu-item index="3-1">
                  <span>全部通知</span>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <span>未知通知</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
            <div class="searchPart">
              <el-input class="inputPart" placeholder="请选择">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <span class="searTitle">搜素项目</span>
            </div>
          </div>
        </el-row>
      </el-header>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-row>
      <el-col>
        <el-dialog
          :modal="true"
          title="用户设置"
          :visible.sync="dialogVisible"
          :before-close="closeCapsLock"
          width="50%"
        >
          <el-tabs v-model="activeName" tab-position="top" @tab-click="handleClick">
            <el-tab-pane label="重置密码" name="first">
              <div style="padding: 0.5rem 1rem">
                <el-form
                  :model="settingForm"
                  :rules="registerFormRules"
                  label-width="100px"
                  label-position="right"
                  ref="ruleForm"
                  status-icon
                >
                  <el-form-item label="用户名" prop="userId">
                    <el-select
                      class="userId"
                      v-model="settingForm.userId"
                      clearable
                      filterable
                      style="width: 100%"
                    >
                      <el-option
                        v-for="(item, index) in userList"
                        :key="item + index"
                        :value="item.userId"
                        :label="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="margin-top: 2rem" label="新密码" prop="newPassword">
                    <el-input
                      class="newPassword"
                      type="password"
                      v-model="settingForm.newPassword"
                      autocomplete="off"
                      placeholder="密码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top: 2rem" label="确认密码" prop="surePassword">
                    <el-input
                      class="surePassword"
                      type="password"
                      v-model="settingForm.surePassword"
                      autocomplete="off"
                      placeholder="确认密码"
                    ></el-input>
                    <span
                      style="float:left;color:#2C8DF4;padding-top:10px"
                    >*&nbsp;密码必须由8位及以上大小写字母、数字、特殊字符组成</span>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="个人信息修改" name="second">
              <div style="padding: 1rem">
                <el-form
                  :model="settingForm"
                  :rules="registerFormRules"
                  label-width="100px"
                  label-position="right"
                  ref="ruleForm"
                  status-icon
                >
                  <el-form-item label="邮箱" prop="email">
                    <el-input
                      class="email"
                      v-model="settingForm.email"
                      autocomplete="off"
                      placeholder="请输入新的邮箱"
                    ></el-input>
                  </el-form-item>

                  <el-form-item style="margin-top:2rem" label="手机号" prop="phoneNum">
                    <el-input
                      class="phoneNum"
                      v-model="settingForm.phoneNum"
                      autocomplete="off"
                      placeholder="请输入新的手机号"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" size="small" :disabled="notMaySave" @click="handleSave">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "systemHome",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.settingForm.surePassword !== "") {
          this.$refs.ruleForm.validateField("surePassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
        return;
      }
      if (this.roleId == 1) {
        //管理员重置密码
        // if (value !== this.settingForm.password) {
        //   callback(new Error("两次输入密码不一致!"));
        //   return;
        // }
      } else {
        if (value !== this.settingForm.newPassword) {
          callback(new Error("两次输入密码不一致!"));
          return;
        }
      }
      callback();
    };
    return {
      activeIndex1: "",
      activeIndex2: "",
      activeIndex3: "",
      dialogVisible: false,
      activeName: "first",
      notMaySave: false,
      userList: [],
      settingForm: {
        userId: "",
        surePassword: "",
        newPassword: "",
        email: "",
        phoneNum: ""
      },
      registerFormRules: {
        userId: [
          { required: true, trigger: "blur" },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            min: 8,
            message: "长度至少 8 个字符",
            trigger: "blur"
          },
          {
            pattern: /[A-Z]+/,
            message: "至少有 1 个大写字母",
            trigger: "blur"
          },
          {
            pattern: /[a-z]+/,
            message: "至少有 1 个小写字母",
            trigger: "blur"
          },
          {
            pattern: /\d+/,
            message: "至少有 1 个数字 ",
            trigger: "blur"
          },
          {
            pattern: /[!@#$%^&*]+/,
            message: "至少有 1 个特殊字符 ",
            trigger: "blur"
          }
        ],
        surePassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
          { min: 8, message: "长度至少 8 个字符", trigger: "blur" },
          {
            pattern: /[A-Z]+/,
            message: "至少有 1 个大写字母",
            trigger: "blur"
          },
          {
            pattern: /[a-z]+/,
            message: "至少有 1 个小写字母",
            trigger: "blur"
          },
          {
            pattern: /\d+/,
            message: "至少有 1 个数字 ",
            trigger: "blur"
          },
          {
            pattern: /[!@#$%^&*]+/,
            message: "至少有 1 个特殊字符 ",
            trigger: "blur"
          }
        ],
        email: [{ required: true, trigger: "blur" }],
        phoneNum: [{ required: true, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$refs.systemHome.style.height = window.innerHeight + "px";
    this.$refs.rightPart.style.width = window.innerWidth - 350 + "px";
  },
  methods: {
    handler(e) {
      this.CapsLockFlag = event.getModifierState("CapsLock");
    },
    closeCapsLock() {
      window.removeEventListener("keyup", this.handler);
      this.dialogVisible = false;
    },
    handleClick() {},
    handleSelectPerson(value) {
      if (value == "1-1") {
        this.dialogVisible = true;
        window.addEventListener("keyup", this.handler);
        this.settingForm.newPassword = "";
        this.settingForm.surePassword = "";
      }
    },
    handleSelect() {},
    handleSave() {}
  }
};
</script>

<style lang='less' scoped>
.system-home {
  .el-header {
    padding: 0;
  }
  .container_out {
    width: 100%;
    height: 100%;
    .sys-header {
      width: 100%;
      height: 50px;
      background-color: rgba(28, 36, 48, 1);
      color: #fff;
      .totalBtn {
        float: left;
        display: inline-block;
        background-color: #337dff;
        width: 52px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 30px;
          height: 29px;
          cursor: pointer;
        }
      }
      .sys-logo {
        float: left;
        width: 150px;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        img {
          width: 31px;
          height: 23px;
          padding-top: 13px;
          cursor: pointer;
        }

        .font1 {
          width: 17px;
          height: 13px;
          padding-top: 18px;
          cursor: pointer;
        }
        .font2 {
          width: 16px;
          height: 13px;
          padding-top: 18px;
          cursor: pointer;
        }
        .font3 {
          width: 14px;
          height: 13px;
          padding-top: 18px;
          cursor: pointer;
        }
      }

      .totalPT {
        display: left;
        height: 50px;
        width: 200px;
        line-height: 50px;
        .line {
          width: 1px;
          height: 15px;
          background-image: radial-gradient(#4d4d4d 0%, #4d4d4d 100%);
          border-radius: 5px;
          float: left;
          margin-top: 1.1rem;
        }
        .titlePT {
          padding-left: 20px;
          font-weight: 650;
          font-style: normal;
          font-size: 12px;
          color: #ffffff;
          line-height: 46px;
        }
      }
      .rightPart {
        font-size: 12px;
        width: 100%;

        .system-menu {
          float: right;
          .per {
            margin-right: 15px;
          }
        }
        .help-menu {
          float: right;
          .help {
            img {
              width: 21px;
              height: 21px;
              cursor: pointer;
            }
          }
        }
        .warining-menu {
          float: right;
          .warinings {
            img {
              width: 21px;
              height: 23px;
              cursor: pointer;
            }
            .el-badge {
              /deep/.el-badge__content {
                margin-top: 13px;
              }
            }
          }
        }
        .searchPart {
          height: 50px;
          line-height: 50px;
          justify-content: center;
          .inputPart {
            float: right;
            width: 300px;
          }
          .searTitle {
            float: right;
            display: inline-block;
            margin-right: 10px;
            font-size: 13px;
          }
        }
      }
    }
  }
}

.el-main {
  margin: 0;
  padding: 0;
}
</style>

<style>
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
  border-bottom: 2px solid transparent;
  color: #fff;
  font-size: 12px;
}

.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 80px !important;
}

.help-menu > .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
.warining-menu > .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}

.el-form-item {
  margin-top: 0 !important;
  margin-bottom: 15px !important;
}

.el-input__inner {
  height: 30px !important;
}

/* 父级的类名 */
.el-submenu__title:hover {
  background-color: rgb(3, 19, 33) !important;
}

/* 子级的类名 */
.el-menu-item:hover {
  background-color: rgb(3, 19, 33) !important;
}
</style>
