<template>
  <div class="app-container">
    <!-- 项目名称 -->
    <span class="block">项目名称</span>
    <div>
      <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
    </div>

    <!-- 项目描述(每一项描述以英文逗号分隔) -->
    <span class="block">项目描述(每一项描述以英文逗号分隔)</span>
    <div>
      <el-input
        type="textarea"
        :rows="5"
        v-model="description"
        placeholder="请输入项目描述信息"
      ></el-input>
    </div>

    <!-- 项目链接 -->
    <span class="block">项目链接</span>
    <div>
      <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
    </div>

    <!-- github 地址 -->
    <span class="block">GitHub 地址</span>
    <div>
      <el-input
        v-model="form.github"
        placeholder="请输入GitHub 地址"
      ></el-input>
    </div>

    <!-- 项目预览图地址 -->
    <Upload v-model="form.thumb" uploadTitle="项目预览图地址" />

    <!-- 项目等级 -->
    <span class="block">项目等级</span>
    <el-select v-model="form.order" placeholder="请选择项目等级">
      <el-option label="1" value="1"></el-option>
      <el-option label="2" value="2"></el-option>
      <el-option label="3" value="3"></el-option>
      <el-option label="4" value="4"></el-option>
      <el-option label="5" value="5"></el-option>
    </el-select>

    <!-- 发布项目 -->
    <div style="margin-top: 15px">
      <el-button type="primary" @click="addProjectClickHandle"
        >发布此项目</el-button
      >
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import { addProject } from "@/api/project";
import { BaseUrl } from "@/urlConfig";
export default {
  data() {
    return {
      description: "",
      form: {
        name: "",
        description: [],
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  components: {
    Upload,
  },
  methods: {
    async addProjectClickHandle() {
      if (
        this.form.name &&
        this.description &&
        this.form.url &&
        this.form.thumb
      ) {
        this.form.order = parseInt(this.form.order);
        this.form.description = this.form.description.split(",");
        this.form.thumb = this.form.thumb.replace(BaseUrl, "");
        await addProject(this.form);
        this.$router.push("/project/projectList");
        this.$message.success("修改成功");
      } else {
        this.$message.error("请填写完所有内容!");
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
</style>