<template>
  <div class="app-container">
    <span class="block">关于我</span>
    <div>
      <el-input
        placeholder="请输入Url地址"
        v-model="url"
        :disabled="disabled"
      ></el-input>
    </div>
    <el-button
      style="margin-top: 20px"
      type="primary"
      :class="{ Disabled: !disabled }"
      @click="setAboutUrlHandler"
    >
      {{ disabled ? "编辑" : "完成" }}
    </el-button>
  </div>
</template>

<script>
import * as aboutApi from "@/api/about";
export default {
  data() {
    return {
      url: "",
      disabled: true,
    };
  },
  created() {
    this.fetchUrl();
  },
  methods: {
    async fetchUrl() {
      const { data } = await aboutApi.getAbout();
      this.url = data;
    },
    async setAboutUrlHandler() {
      if (this.disabled) {
        this.disabled = false;
      } else {
        if (this.url) {
          this.disabled = true;
          await aboutApi.setAbout({ url: this.url });
          this.fetchUrl();
          this.$message.success("修改成功!");
        } else {
          this.$message.error("请输入Url地址!");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  display: block;
  font-weight: bold;
  font-size: 20px;
}
.Disabled {
  background-color: #67c23a;
  border-color: #67c23a;
}
</style>