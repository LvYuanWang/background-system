<template>
  <div class="app-container">
    <el-form
      :model="adminInfo"
      :rules="setRules"
      ref="loginForm"
      label-width="100px"
      width="500px"
    >
      <!-- 用户名 -->
      <el-form-item label="Key">
        <el-input v-model="key" placeholder="请输入Key值"></el-input>
      </el-form-item>
      <!-- 用户名 -->
      <el-form-item label="用户名">
        <el-input
          v-model="adminInfo.name"
          placeholder="请输入用户名"
          tabindex="1"
        ></el-input>
      </el-form-item>
      <!-- 旧密码 -->
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          id="oldLoginPwd"
          show-password
          v-model="adminInfo.oldLoginPwd"
          placeholder="请输入旧密码"
          type="password"
          tabindex="2"
        ></el-input>
      </el-form-item>
      <!-- 新密码 -->
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          id="loginPwd"
          show-password
          v-model="adminInfo.loginPwd"
          placeholder="请输入新密码"
          type="password"
          tabindex="3"
        ></el-input>
      </el-form-item>
      <!-- 新密码确认 -->
      <el-form-item label="新密码确认" prop="loginPwdConfirm">
        <el-input
          id="loginPwdConfirm"
          show-password
          v-model="adminInfo.loginPwdConfirm"
          placeholder="请确认新密码"
          type="password"
          tabindex="4"
        ></el-input>
      </el-form-item>

      <!-- 返回和修改 -->
      <el-button type="primary" style="margin-top: 15px" @click="handleClick">
        修改</el-button
      >
      <el-button type="danger" style="margin-top: 15px" @click="handleBack"
        >返回</el-button
      >
    </el-form>
  </div>
</template>

<script>
import * as adminApi from "@/api/user";
export default {
  data() {
    let validateloginPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.adminInfo.loginPwd) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      key: "",
      adminInfo: {
        id: "", // 用户id
        name: "", // 用户名
        loginId: "", // 登录账号
        oldLoginPwd: "", // 旧密码
        loginPwd: "", // 新密码
        loginPwdConfirm: "", // 新密码确认
      },
      // 表单验证规则
      setRules: {
        oldLoginPwd: [
          { required: true, trigger: "blur", message: "请输入旧密码" },
        ],
        loginPwd: [
          { required: true, trigger: "blur", message: "请输入新密码" },
        ],
        loginPwdConfirm: [
          { required: true, trigger: "blur", message: "请确认新密码" },
          { validator: validateloginPwd, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.fetchAdminInfo();
  },
  methods: {
    async fetchAdminInfo() {
      const { data } = await adminApi.getInfoApi();
      this.adminInfo = data;
    },
    async handleClick() {
      if (
        this.adminInfo.name &&
        this.adminInfo.oldLoginPwd &&
        this.adminInfo.loginPwd
      ) {
        if (this.key === "LYW123456") {
          const resp = await adminApi.updateInfoApi(this.adminInfo);
          if (typeof resp === "string") {
            const { msg } = JSON.parse(resp);
            this.$message.error(msg);
          } else {
            this.$message.success("修改成功");
            // 12345678
            this.$store.dispatch("user/logout").then(() => {
              this.$router.push(`/login?redirect=${this.$route.fullPath}`);
            });
          }
        } else {
          this.$message.error("Key值错误或Key值为空!!");
        }
      } else {
        this.$message.error("请填写完整信息!!");
      }
    },
    handleBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 60%;
}
</style>