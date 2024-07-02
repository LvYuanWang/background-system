<template>
  <div class="app-container">
    <!-- 项目表格 -->
    <el-table
      :v-loading="listLoading"
      :data="projectList"
      style="width: 100%"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="data" label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- 项目名称 -->
      <el-table-column prop="name" label="项目名称" width="180" align="center">
        <template slot-scope="scope">
          <a
            class="projectDemo"
            :href="scope.row.url"
            target="_blank"
            slot="reference"
            >{{ scope.row.name }}</a
          >
        </template>
      </el-table-column>

      <!-- 项目描述 -->
      <el-table-column prop="description" label="项目描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}
        </template>
      </el-table-column>

      <!-- 预览图 -->
      <el-table-column prop="thumb" label="预览图" width="200" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 170px"
            :src="scope.row.thumb"
            fit="contain"
            :preview-src-list="previewList"
          ></el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column prop="data" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="GetHub"
            placement="left"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="iconfont icon-github"
              circle
              size="mini"
              class="github"
              @click="openGetHubHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              style="
                background-color: rgb(169 60 230);
                border-color: rgb(169 60 230);
              "
              size="mini"
              @click="editProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑项目 -->
    <el-dialog
      title="请编辑该项目信息"
      fullscreen
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <!-- 项目名称 -->
        <el-form-item label="项目名称">
          <el-input v-model="form.name" placeholder="请填写项目名称"></el-input>
        </el-form-item>

        <!-- 项目描述 -->
        <el-form-item label="项目描述(每一项描述以英文逗号分隔)">
          <el-input
            type="textarea"
            v-model="form.description"
            :rows="5"
            placeholder="请输项目描述信息"
          ></el-input>
        </el-form-item>

        <!-- 项目链接 -->
        <el-form-item label="项目链接">
          <el-input v-model="form.url" placeholder="Url地址"></el-input>
        </el-form-item>

        <!-- GetHub地址 -->
        <el-form-item label="GetHub 地址">
          <el-input v-model="form.github" placeholder="GetHub地址"></el-input>
        </el-form-item>

        <!-- 预览图 -->
        <el-form-item label="预览图">
          <Upload v-model="form.thumb" />
        </el-form-item>

        <!-- 排序等级 -->
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="请选择活动区域">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelProjectClickHandle">取 消</el-button>
        <el-button type="primary" @click="confirmProjectClickHandle"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as projectApi from "@/api/project";
import { BaseUrl } from "@/urlConfig";
import Upload from "@/components/Upload";
export default {
  data() {
    return {
      projectList: [],
      listLoading: false,
      previewList: [],
      dialogFormVisible: false,
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
      },
    };
  },
  created() {
    this.fetchProjectData();
  },
  components: {
    Upload,
  },
  methods: {
    async fetchProjectData() {
      this.listLoading = true;
      const { data } = await projectApi.getProjects();
      this.projectList = data;
      this.projectList.forEach((item) => {
        item.thumb = BaseUrl + item.thumb;
        this.previewList.push(item.thumb);
      });
      this.listLoading = false;
    },
    openGetHubHandle(projectInfo) {
      window.open(projectInfo.github);
    },
    editProjectHandle(projectInfo) {
      this.dialogFormVisible = true;
      projectInfo.thumb.replace(BaseUrl, "");
      projectInfo.description = projectInfo.description.toString();
      this.form = projectInfo;
    },
    deleteProjectHandle(projectInfo) {
      this.$confirm("此操作将永久删除该项目,是否继续?", "是否删除该项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          projectApi.deleteProject(projectInfo.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchProjectData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 取消编辑项目
    cancelProjectClickHandle() {
      this.dialogFormVisible = false;
      this.$message.info("已取消编辑");
    },
    // 确认编辑项目
    async confirmProjectClickHandle() {
      const obj = {
        description: this.form.description.split(","),
        name: this.form.name,
        url: this.form.url,
        github: this.form.github,
        thumb: this.form.thumb.replace(BaseUrl, ""),
        order: parseInt(this.form.order),
      };
      if (obj.name && obj.description && obj.url && obj.thumb) {
        await projectApi.updateProject({ id: this.form.id, data: obj });
        this.fetchProjectData();
        this.dialogFormVisible = false;
        this.$message.success("修改成功");
      } else {
        this.$message.error("请填写完所有内容!");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.projectDemo:hover {
  color: #409eff;
}
.github {
  background-color: rgb(163, 163, 163);
  border: 1px solid rgb(163, 163, 163);
}
</style>